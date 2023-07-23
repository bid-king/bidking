package com.widzard.bidking.member.controller;

import com.widzard.bidking.member.dto.response.DashboardResponse;
import com.widzard.bidking.member.service.MemberService;
import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // TODO: 로그인 된 유저 필요
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> getUserDashboard(Long memberId) {
        HashMap<String, Integer> dashboard = memberService.getUserDashboard(memberId);
        DashboardResponse dashboardResponse = DashboardResponse.createDashboard(dashboard);
        return new ResponseEntity<>(dashboardResponse, HttpStatus.OK);
    }

    // TODO: 로그인 된 유저 필요
    @GetMapping("/dashboard/seller")
    public ResponseEntity<DashboardResponse> getSellerDashboard(Long memberId) {
        HashMap<String, Integer> dashboard = memberService.getSellerDashboard(memberId);
        DashboardResponse dashboardResponse = DashboardResponse.createDashboard(dashboard);
        return new ResponseEntity<>(dashboardResponse, HttpStatus.OK);
    }
}
