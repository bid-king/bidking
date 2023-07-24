package com.widzard.bidking.member.controller;

import com.widzard.bidking.member.dto.response.MemberPhoneVerificationResponse;
import com.widzard.bidking.member.service.MemberService;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/members")
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @ResponseBody
    @PostMapping("/check/phoneNumber")
    public ResponseEntity<MemberPhoneVerificationResponse> sendOne(String phoneNumber) {
        String cerNum = makeRandomNumber();
        memberService.certifiedPhoneNumber(phoneNumber, cerNum);
        MemberPhoneVerificationResponse response = MemberPhoneVerificationResponse.createResponse(
            cerNum);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private String makeRandomNumber() {
        Random rand = new Random();
        String numStr = "";
        for (int i = 0; i < 4; i++) {
            String ran = Integer.toString(rand.nextInt(10));
            numStr += ran;
        }
        return numStr;
    }
}
