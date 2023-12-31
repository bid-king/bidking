package com.widzard.bidking.member.service;

import com.widzard.bidking.auction.exception.SendingMessageFailureException;
import com.widzard.bidking.global.jwt.service.TokenProvider;
import com.widzard.bidking.image.entity.Image;
import com.widzard.bidking.image.exception.ImageOperationFailException;
import com.widzard.bidking.image.service.ImageService;
import com.widzard.bidking.member.dto.request.MemberFormRequest;
import com.widzard.bidking.member.dto.request.MemberLoginRequest;
import com.widzard.bidking.member.dto.request.MemberUpdateRequest;
import com.widzard.bidking.member.dto.response.AuthInfo;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.exception.LoginFailureException;
import com.widzard.bidking.member.exception.MemberDuplicatedException;
import com.widzard.bidking.member.exception.MemberNotFoundException;
import com.widzard.bidking.member.repository.MemberRepository;
import com.widzard.bidking.order.entity.OrderState;
import com.widzard.bidking.order.repository.OrderRepository;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private static final String PENALTY = "penalty";
    private static final String MSG_TYPE = "SMS";

    private final ImageService imageService;

    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;

    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;
    SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

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
    public AuthInfo login(MemberLoginRequest request) {
        Member member = memberRepository.findByUserId(request.getUserId())
            .orElseThrow(LoginFailureException::new);
        if (!passwordEncoder.matches(request.getPassword(), member.getPassword())) {
            throw new LoginFailureException();
        }
        String loginToken = tokenProvider.generateAccessToken(member);
        return new AuthInfo(member.getId(), member.getNickname(), loginToken);
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

        List<Object[]> dashboard = orderRepository.countOrdersByState(member);

        for (Object[] obj : dashboard) {
            dashboardResult.put(obj[0].toString(), Integer.valueOf(obj[1].toString()));
        }
        dashboardResult.put(PENALTY, member.getPenalty());

        return dashboardResult;
    }

    @Override
    @Transactional
    public void updateMember(Long memberId, MemberUpdateRequest request, MultipartFile image)
        throws IOException {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberNotFoundException());
        if (!passwordEncoder.matches(request.getOldPassword(), member.getPassword())) {
            throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
        }

        String newPassword = request.getNewPassword();
        if (newPassword.isBlank()) {
            newPassword = request.getOldPassword();
        }

        Image savedImage = null;
        //변경요청이 존재하는 경우
        if (image != null) {
            //기존 프사 있는 경우
            if (member.getImage() != null) {
                savedImage = imageService.modifyImage(image, memberId);
            } else {//기존 프사 없는 경우
                savedImage = imageService.uploadImage(image);
            }
            //변경요청이 있는데 변경된 이미지가 없음
            if (savedImage == null) {
                throw new ImageOperationFailException();
            }
        }
        member.updateItem(request, passwordEncoder.encode(newPassword), savedImage);
    }

    @Override
    public void deleteMember(Long userId) {
        Member member = memberRepository.findById(userId)
            .orElseThrow(MemberNotFoundException::new);
        member.changeToUnavailable();
        memberRepository.save(member);
    }

    @Override
    public void logout(
        Authentication authentication,
        HttpServletRequest request,
        HttpServletResponse response
    ) {
        logoutHandler.logout(request, response, authentication);
    }
}
