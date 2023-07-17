package com.widzard.bidking.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/members")
public class MemberController {

    @GetMapping("/mem")
    public ResponseEntity<String> memtest() {
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }


}
