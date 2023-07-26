package com.widzard.bidking.member.controller;

import com.widzard.bidking.member.dto.request.MemberFormRequest;
import com.widzard.bidking.member.dto.request.MemberLoginRequest;
import com.widzard.bidking.member.dto.request.MemberPhoneVerificationRequest;
import com.widzard.bidking.member.dto.request.MemberUpdateRequest;
import com.widzard.bidking.member.dto.request.UserIdRequest;
import com.widzard.bidking.member.dto.request.UserNicknameRequest;
import com.widzard.bidking.member.dto.response.DashboardResponse;
import com.widzard.bidking.member.dto.response.MemberCheckResponse;
import com.widzard.bidking.member.dto.response.MemberCreateResponse;
import com.widzard.bidking.member.dto.response.MemberInfoResponse;
import com.widzard.bidking.member.dto.response.MemberLoginResponse;
import com.widzard.bidking.member.dto.response.MemberPhoneVerificationResponse;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.exception.PhoneNumberDuplicatedException;
import com.widzard.bidking.member.service.MemberService;
import java.io.IOException;
import java.util.HashMap;
import java.util.Random;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/check/phoneNumber")
    public ResponseEntity<MemberPhoneVerificationResponse> sendOne(
        @RequestBody MemberPhoneVerificationRequest request
    ) {
        if (memberService.checkPhoneNumber(request.getPhoneNumber())) {
            throw new PhoneNumberDuplicatedException();
        }

        String cerNum = makeRandomNumber();
        memberService.certifiedPhoneNumber(request.getPhoneNumber(), cerNum);
        return new ResponseEntity<>(
            MemberPhoneVerificationResponse.from(cerNum),
            HttpStatus.OK
        );
    }

    @PostMapping("/signup")
    public ResponseEntity<MemberCreateResponse> signup(
        @RequestBody @Valid MemberFormRequest request) {
        Member savedMember = memberService.signup(request);
        return new ResponseEntity<>(MemberCreateResponse.from(savedMember), HttpStatus.OK);
    }

    @PostMapping("/check/userId")
    public ResponseEntity<MemberCheckResponse> checkUserId(
        @RequestBody @Valid UserIdRequest request) {
        boolean isDuplicated = memberService.checkUserId(request.getUserId());
        return new ResponseEntity<>(MemberCheckResponse.from(isDuplicated), HttpStatus.OK);
    }

    @PostMapping("/check/nickname")
    public ResponseEntity<MemberCheckResponse> checkNickname(
        @RequestBody @Valid UserNicknameRequest request) {
        boolean isDuplicated = memberService.checkNickname(request.getNickname());
        return new ResponseEntity<>(MemberCheckResponse.from(isDuplicated), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<MemberLoginResponse> login(
        @RequestBody @Valid MemberLoginRequest request) {
        String token = memberService.login(request);
        return new ResponseEntity<>(MemberLoginResponse.from(token), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }


    @GetMapping("/{memberId}")
    public ResponseEntity<MemberInfoResponse> getUserDetail(@PathVariable Long memberId) {
        Member member = memberService.getUserDetail(memberId);
        return new ResponseEntity<>(MemberInfoResponse.from(member), HttpStatus.OK);
    }

    @GetMapping("/{memberId}/dashboard")
    public ResponseEntity<DashboardResponse> getUserDashboard(@PathVariable Long memberId) {
        HashMap<String, Integer> dashboard = memberService.getUserDashboard(memberId);
        return new ResponseEntity<>(DashboardResponse.from(dashboard), HttpStatus.OK);
    }

    @GetMapping("/{memberId}/dashboard/seller")
    public ResponseEntity<DashboardResponse> getSellerDashboard(@PathVariable Long memberId) {
        HashMap<String, Integer> dashboard = memberService.getSellerDashboard(memberId);
        return new ResponseEntity<>(DashboardResponse.from(dashboard), HttpStatus.OK);
    }

    @PutMapping(value = "/{memberId}", consumes = {MediaType.APPLICATION_JSON_VALUE,
        MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateMember(@PathVariable Long memberId,
        @RequestPart(name = "request") @Valid MemberUpdateRequest request,
        @RequestPart(name = "image", required = false) MultipartFile image) throws IOException {
        memberService.updateMember(memberId, request, image);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<?> deleteAccount(@PathVariable Long memberId) {
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private String makeRandomNumber() {
        Random rand = new Random();
        StringBuilder numStr = new StringBuilder();
        for (int i = 0; i < 4; i++) {
            String ran = Integer.toString(rand.nextInt(10));
            numStr.append(ran);
        }
        return numStr.toString();
    }
}
