package com.widzard.bidking.alarm.entity;



import com.widzard.bidking.common.entity.BaseEntity;
import com.widzard.bidking.member.entity.Member;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "alarm")
public class Alarm extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "alarm_id")
    private Long id; // ( 알람 코드 )

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member; // ( 수신 고객 )

    private String content; // ( 내용 )

    private Boolean isSend; // ( 전송 성공 여부 )

    private Boolean isRead; // ( 사용자 읽음 여부 )

    private String mediaType; // ( 알림 매체 타입 ) //TODO

    private String alarmType; // ( 알림 메시지 타입 ) //TODO
}
