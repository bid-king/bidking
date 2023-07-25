package com.widzard.bidking.member.service;

import com.widzard.bidking.auction.entity.AuctionRoomLiveState;
import com.widzard.bidking.auction.entity.AuctionRoomTradeState;
import com.widzard.bidking.auction.exception.SendingMessageFailureException;
import com.widzard.bidking.global.jwt.service.TokenProvider;
import com.widzard.bidking.member.dto.request.MemberFormRequest;
import com.widzard.bidking.member.dto.request.MemberLoginRequest;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.exception.MemberDuplicatedException;
import com.widzard.bidking.member.exception.MemberNotFoundException;
import com.widzard.bidking.member.repository.MemberRepository;
import com.widzard.bidking.order.entity.OrderState;
import com.widzard.bidking.order.repository.OrderRepository;
import java.util.HashMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private static final List<AuctionRoomLiveState> LIVE_STATE = List.of(
        AuctionRoomLiveState.OFF_LIVE);
    private static final List<AuctionRoomTradeState> TRADE_STATE = List.of(
        AuctionRoomTradeState.IN_PROGRESS,
        AuctionRoomTradeState.ALL_COMPLETED);
    private static final List<OrderState> ORDER_STATE = List.of(OrderState.PAYMENT_WAITING,
        OrderState.DELIVERY_WAITING);

    private static final String PENALTY = "penalty";

    private static final String MSG_TYPE = "SMS";
    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;
    private final AuthenticationManagerBuilder managerBuilder;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;
    @Value("${coolsms.api_key}")
    private String API_KEY;
    @Value("${coolsms.api_secret}")
    private String API_SECRET;
    @Value("${coolsms.from}")
    private String FROM;

    /*
     * 회원 가입
     */
    @Transactional
    @Override
    public Member signup(MemberFormRequest request) {
        validateDuplicatedMember(request);
        String encodedPassword = passwordEncoder.encode(request.getPassword());
        Member member = Member.createMember(request, encodedPassword);
        return memberRepository.save(member);
    }

    /*
     * 아이디 중복 검사
     */
    @Override
    public boolean checkUserId(String userId) {
        return memberRepository.existsByUserId(userId);
    }

    /*
     * 닉네임 중복 검사
     */
    @Override
    public boolean checkNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    @Override
    public boolean checkPhoneNumber(String phoneNumber) {
        return memberRepository.existsByPhoneNumber(phoneNumber);
    }

    @Override
    public String login(MemberLoginRequest request) {
        Member member = memberRepository.findByUserId(request.getUserId())
            .orElseThrow(MemberNotFoundException::new);
        if (!passwordEncoder.matches(request.getPassword(), member.getPassword())) {
            throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
        }
        return tokenProvider.generateAccessToken(member);
    }


    /*
     * 기존 회원 정보 확인
     * 유저 아이디 및 닉네임을 unique한 값으로 지정하였기 때문에 존재 여부로 이미 존재하는 회원인지를 판단하는 메서드
     * 회원가입 전에 유저 아이디, 유저 닉네임 검증 메서드가 있지만 최종 회원가입 시 한 번 더 검증해야 합니다.
     */
    private void validateDuplicatedMember(MemberFormRequest request) {
        if (checkUserId(request.getUserId()) || checkNickname(request.getNickname())) {
            throw new MemberDuplicatedException();
        }
    }

    @Override
    public void certifiedPhoneNumber(String phoneNumber, String cerNum) {
        Message coolsms = new Message(API_KEY, API_SECRET);

        // 4 params(to, from, type, text) are mandatory. must be filled
        HashMap<String, String> params = new HashMap<>();
        params.put("to", phoneNumber);
        params.put("from", FROM);
        params.put("type", MSG_TYPE);
        params.put("text", "[입찰왕] 인증번호는 [" + cerNum + "] 입니다.");

        try {
            JSONObject sendObj = coolsms.send(params);
            log.info(sendObj.toString());
        } catch (CoolsmsException e) {
            log.error(e.getMessage());
            log.error(String.valueOf(e.getCode()));
            throw new SendingMessageFailureException();
        }
    }

    @Override
    public Member getUserDetail(Long userId) {
        return memberRepository.findById(userId).orElseThrow(MemberNotFoundException::new);
    }

    @Override
    public HashMap<String, Integer> getUserDashboard(Long userId) {
        Member member = memberRepository.findById(userId)
            .orElseThrow(() -> new MemberNotFoundException());

        HashMap<String, Integer> dashboardResult = new HashMap<>();

        int paymentWaiting = orderRepository.countByOrdererAndOrderState(member,
            OrderState.PAYMENT_WAITING);
        dashboardResult.put(OrderState.PAYMENT_WAITING.toString(), paymentWaiting);

        int deliveryWaiting = orderRepository.countByOrdererAndOrderState(member,
            OrderState.DELIVERY_WAITING);
        dashboardResult.put(OrderState.DELIVERY_WAITING.toString(), deliveryWaiting);

        dashboardResult.put(PENALTY, member.getPenalty());

        return dashboardResult;
    }

    @Override
    public HashMap<String, Integer> getSellerDashboard(Long userId) {
        Member member = memberRepository.findById(userId)
            .orElseThrow(() -> new MemberNotFoundException());

        HashMap<String, Integer> dashboardResult = new HashMap<>();

        List<Object[]> dashboard = orderRepository.countOrdersByState(member, LIVE_STATE,
            TRADE_STATE,
            ORDER_STATE);

        for (Object[] obj : dashboard) {
            dashboardResult.put(obj[0].toString(), Integer.valueOf(obj[1].toString()));
        }
        dashboardResult.put(PENALTY, member.getPenalty());

        return dashboardResult;
    }
}
