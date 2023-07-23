package com.widzard.bidking.member.service;

import java.util.HashMap;

public interface MemberService {

    HashMap<String, Integer> getUserDashboard(Long userId);

    HashMap<String, Integer> getSellerDashboard(Long userId);

}
