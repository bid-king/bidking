package com.widzard.bidking.member.controller;

import com.widzard.bidking.member.dto.request.MemberFormRequest;
import com.widzard.bidking.member.dto.response.UserCreateResponse;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.service.MemberService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/signup")
    public ResponseEntity<UserCreateResponse> signup(@RequestBody @Valid MemberFormRequest request) {
        Member savedMember = memberService.signup(request);
        return new ResponseEntity<>(UserCreateResponse.from(savedMember), HttpStatus.OK);
    }

    @GetMapping("/login")
    public ResponseEntity<String> login() {
        return new ResponseEntity<>("login", HttpStatus.OK);
    }
    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }

    // 비밀 번호 찾기



}
