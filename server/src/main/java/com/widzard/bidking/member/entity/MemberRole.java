package com.widzard.bidking.member.entity;

public enum MemberRole {
    ADMIN("admin"), // 관리자
    USER("user"); // 본인인증 완료된 사용자

    private String name;

    MemberRole(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
