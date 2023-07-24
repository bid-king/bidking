package com.widzard.bidking.member.controller;

import com.widzard.bidking.member.dto.response.MemberLoginResponse;
import com.widzard.bidking.member.dto.request.MemberFormRequest;
import com.widzard.bidking.member.dto.request.MemberLoginRequest;
import com.widzard.bidking.member.dto.request.UserIdRequest;
import com.widzard.bidking.member.dto.request.UserNicknameRequest;
import com.widzard.bidking.member.dto.response.MemberCheckResponse;
import com.widzard.bidking.member.dto.response.MemberCreateResponse;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.service.MemberService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<MemberCreateResponse> signup(@RequestBody @Valid MemberFormRequest request) {
        Member savedMember = memberService.signup(request);
        return new ResponseEntity<>(MemberCreateResponse.from(savedMember), HttpStatus.OK);
    }

    @PostMapping("/check/userId")
    public ResponseEntity<MemberCheckResponse> checkUserId(@RequestBody @Valid UserIdRequest request) {
        boolean isDuplicated = memberService.checkUserId(request.getUserId());
        return new ResponseEntity<>(MemberCheckResponse.from(isDuplicated), HttpStatus.OK);
    }

    @PostMapping("/check/nickname")
    public ResponseEntity<MemberCheckResponse> checkNickname(@RequestBody @Valid UserNicknameRequest request) {
        boolean isDuplicated = memberService.checkNickname(request.getNickname());
        return new ResponseEntity<>(MemberCheckResponse.from(isDuplicated), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<MemberLoginResponse> login(@RequestBody @Valid MemberLoginRequest request) {
        String token = memberService.login(request);
        return new ResponseEntity<>(MemberLoginResponse.from(token), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }

    // 로그인 한 사람만 들어가는 테스트
    @PostMapping("/test")
    public ResponseEntity<String> authTest() {
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }
    // admin만 들어갈 수 있는 테스트

}
