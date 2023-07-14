package com.widzard.bidking.member.entity;

public enum MemberRole {
    ADMIN, // 관리자
    GUEST, // 본인인증 하지 않은 사용자 (경매 참여, 등록 제한)
    USER; // 본인인증 완료된 사용자
}
