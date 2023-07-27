package com.widzard.bidking.session;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.entity.AuctionRoomLiveState;
import com.widzard.bidking.auction.entity.AuctionRoomTradeState;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
import com.widzard.bidking.global.util.TimeUtility;
import com.widzard.bidking.member.entity.Member;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.TokenOptions;
import io.openvidu.java.client.TokenOptions.Builder;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/sessions")
public class SessionController {

    OpenVidu openVidu;

    @Autowired
    private AuctionRoomRepository auctionRoomRepository;

    private Map<Long, Session> lessonIdSession = new ConcurrentHashMap<>();
    private Map<String, Map<Long, String>> sessionIdUserIdToken = new ConcurrentHashMap<>();

    private String OPENVIDU_URL;
    private String SECRET;

    public SessionController(@Value("${openvidu.secret}") String secret,
        @Value("${openvidu.url}") String openviduUrl) {
        this.SECRET = secret;
        this.OPENVIDU_URL = openviduUrl;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
    }

    @PostMapping("/create-session/{auctionRoomId}")
    public ResponseEntity<?> createSession(
        @AuthenticationPrincipal Member member,
        @PathVariable Long auctionRoomId) {
        /*
         * if auction room not exist: throw exception
         *
         * create live session
         * < condition >
         * 1. auction room exists => already checked
         * 2. auction room seller == current user
         * 3. live not exist
         * 4. auction room live state == before
         * 5. auction room trade state == before
         * 6. start time - now <= 20min
         * save session id at auction room entity
         * change live state to on live
         *
         * find live room by auction id
         *
         * if exists: move
         * else: throw exception
         * */

        // 존재하는 경매방인지 확인
        AuctionRoom auctionRoom = auctionRoomRepository.findById(auctionRoomId).orElseThrow(() -> {
            throw new RuntimeException("Auction Room does not exist");
        });

        // 요청한 유저가 경매방의 판매자인지 확인
        if (!auctionRoom.getSeller().equals(member)) {
            throw new RuntimeException("Only seller can make new session");
        }

        // 경매방에 대한 세션이 존재하는지 확인
        if (auctionRoom.isSessionCreated()) {
            throw new RuntimeException("Session already created");
        }

        // AuctionRoomLiveState가 BEFORE_LIVE인지 확인
        if (auctionRoom.getAuctionRoomLiveState() != AuctionRoomLiveState.BEFORE_LIVE) {
            throw new RuntimeException("Live already started");
        }

        // AuctionRoomTradeState가 BEFORE_PROGRESS인지 확인
        if (auctionRoom.getAuctionRoomTradeState() != AuctionRoomTradeState.BEFORE_PROGRESS) {
            throw new RuntimeException("Trade already started");
        }

        // 세션 생성 가능한 시간인지 확인 : 시작 설정 시간 20분 전부터 세션 생성 가능
        LocalDateTime startTime = TimeUtility.toLocalDateTime(auctionRoom.getStartedAt());
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(now, startTime);
        if (duration.getSeconds() > 60 * 20) { // TODO: if start < now?
            throw new RuntimeException("Try later");
        }

        try {
            Session session = this.openVidu.createSession();

            // auctionRoom 상태 변경
            auctionRoom.changeLiveState(AuctionRoomLiveState.ON_LIVE);
            auctionRoom.changeIsSessionCreated(true);

            this.lessonIdSession.put(auctionRoomId, session);
            this.sessionIdUserIdToken.put(session.getSessionId(), new HashMap<>());

            showMap();

            SessionCreateResponse response = SessionCreateResponse.from(auctionRoom,
                session.getSessionId(), auctionRoom.getSeller());

            return new ResponseEntity<>(response, HttpStatus.CREATED);
//        } catch (OpenViduJavaClientException e) {
//            throw new RuntimeException(e);
//        } catch (OpenViduHttpException e) {
//            throw new RuntimeException(e);
        } catch (Exception e) {
            return getErrorResponse(e);
        }
    }

    @PostMapping("/generate-token/{auctionRoomId}")
    public ResponseEntity<JSONObject> generateToken(
        @AuthenticationPrincipal Member member,
        @PathVariable Long auctionRoomId) {
        // 존재하는 경매방인지 확인
        AuctionRoom auctionRoom = auctionRoomRepository.findById(auctionRoomId)
            .orElseThrow(() -> new RuntimeException("auction room not exist"));

        // 세션이 존재하는지 확인
        Session session = Optional.of(this.lessonIdSession.get(auctionRoomId))
            .orElseThrow(() -> new RuntimeException("Not opened yet"));

        // publisher, subscriber 설정
        OpenViduRole role = auctionRoom.getSeller().equals(member) ? OpenViduRole.PUBLISHER
            : OpenViduRole.SUBSCRIBER;

        // token 생성
        JSONObject responseJson = new JSONObject();
        TokenOptions tokenOptions = new Builder()
            .role(role)
            .data("SERVER=" + member.getUserId())
            .build();

        try {
            String token = this.lessonIdSession.get(auctionRoomId).generateToken(tokenOptions);

            // 서버에 token 저장
            this.sessionIdUserIdToken.get(session.getSessionId())
                .put(member.getId(), token);

            responseJson.put(0, token);

            showMap();

            return new ResponseEntity<>(responseJson, HttpStatus.OK);
        } catch (OpenViduJavaClientException e) {
            return getErrorResponse(e);
        } catch (OpenViduHttpException e) {
            if (e.getStatus() == HttpStatus.BAD_REQUEST.value()) {
                try {
                    // 세션 삭제 후 재생성
                    this.sessionIdUserIdToken.remove(session.getSessionId());

                    session = this.openVidu.createSession();

                    this.lessonIdSession.put(auctionRoomId, session);
                    this.sessionIdUserIdToken.put(session.getSessionId(), new HashMap<>());

                    String token = session.generateToken(tokenOptions);

                    this.sessionIdUserIdToken.get(session.getSessionId())
                        .put(member.getId(), token);

                    responseJson.put(0, token);

                    showMap();

                    return new ResponseEntity<>(responseJson, HttpStatus.OK);
                } catch (OpenViduJavaClientException | OpenViduHttpException ex) {
                    return getErrorResponse(ex);
                }
            } else {
                return getErrorResponse(e);
            }
        }
    }

    @PostMapping("/remove-user/{auctionRoomId}")
    public ResponseEntity<JSONObject> removeUser(
        @AuthenticationPrincipal Member member,
        @PathVariable Long auctionRoomId
    ) {
        // 존재하는 경매방인지 확인
        AuctionRoom auctionRoom = auctionRoomRepository.findById(auctionRoomId)
            .orElseThrow(() -> new RuntimeException("auction room not exist"));

        // 존재하는 세션인지 확인
        Session session = Optional.of(this.lessonIdSession.get(auctionRoomId))
            .orElseThrow(() -> new RuntimeException("session not exist"));

        String sessionId = session.getSessionId();

        if (this.sessionIdUserIdToken.get(sessionId).remove(member.getId()) != null) {
            // user 삭제

            // 판매자가 나갈 경우
            if (auctionRoom.getSeller().equals(member)) {
                // 전체 참여자 삭제
                this.lessonIdSession.remove(auctionRoomId);
//                this.sessionIdUserIdToken.get(sessionId).clear();
                this.sessionIdUserIdToken.remove(session);

                // 시작 전에 방이 폭파될 경우 다시 생성할 수 있도록 생성
                if (TimeUtility.toLocalDateTime(auctionRoom.getStartedAt())
                    .isAfter(LocalDateTime.now())) {
                    auctionRoom.changeLiveState(AuctionRoomLiveState.BEFORE_LIVE);
                    auctionRoom.changeIsSessionCreated(false);
                } else { // 시작 시간 이후 폭파할 경우 OFF로 변경
                    auctionRoom.changeLiveState(AuctionRoomLiveState.OFF_LIVE);
                }
            }

            // 마지막 유저가 나갈 경우 => 필요없을 수도
            if (this.sessionIdUserIdToken.get(sessionId).isEmpty()) {
                this.lessonIdSession.remove(auctionRoomId);
                this.sessionIdUserIdToken.remove(session);
            }

            showMap();

            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            log.error("Problems in the app server: the user didn't have a valid token");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void showMap() {
        log.debug("------------------------------");
        log.debug(this.lessonIdSession.toString());
        log.debug(this.sessionIdUserIdToken.toString());
        log.debug("------------------------------");
    }

    private ResponseEntity<JSONObject> getErrorResponse(Exception e) {
        JSONObject json = new JSONObject();
        json.put("cause", e.getCause());
        json.put("error", e.getMessage());
        json.put("exception", e.getClass());
        return new ResponseEntity<>(json, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
