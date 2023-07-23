package com.widzard.bidking.auth.controller;

import com.widzard.bidking.auth.dto.JwtToken;
import com.widzard.bidking.auth.service.AuthService;
import com.widzard.bidking.member.dto.request.MemberLoginRequest;
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
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;
    @GetMapping("/login")
    public ResponseEntity<JwtToken> login(@RequestBody @Valid MemberLoginRequest request) {
        JwtToken jwtToken = authService.login(request);
        return new ResponseEntity<>(jwtToken, HttpStatus.OK);
    }
    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        return new ResponseEntity<>("ok", HttpStatus.OK);
    }


}
