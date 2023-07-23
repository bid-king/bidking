package com.widzard.bidking.member.controller;

import com.widzard.bidking.member.dto.response.MemberInfoResponse;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.exception.MemberNotFoundException;
import com.widzard.bidking.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/{memberId}")
    public ResponseEntity<MemberInfoResponse> getUserDetail(@PathVariable Long memberId) {
        Member member = memberService.getUserDetail(memberId)
            .orElseThrow(() -> new MemberNotFoundException());
        MemberInfoResponse response = MemberInfoResponse.createResponse(member);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
