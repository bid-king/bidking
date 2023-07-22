package com.widzard.bidking.member.service;

import com.widzard.bidking.member.dto.request.MemberFormRequest;
import com.widzard.bidking.member.entity.Member;

public interface MemberService {

    Member signup(MemberFormRequest entity);
}
