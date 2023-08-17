package com.widzard.bidking.alarm.entity;


import com.widzard.bidking.global.entity.BaseEntity;
import com.widzard.bidking.member.entity.Member;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "alarm")
public class Alarm extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_id")
    private Long id; // ( 알람 코드 )

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member; // ( 수신 고객 )

    @Column(nullable = false, length = 150)
    private String content; // ( 내용 )

    @Column(nullable = false)
    private Boolean isSend; // ( 전송 성공 여부 )

    @Column(nullable = false)
    private Boolean isRead; // ( 사용자 읽음 여부 )

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 12)
    private MediaType mediaType; // ( 알림 매체 타입 )

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private AlarmType alarmType; // ( 알림 메시지 타입 )

    public static Alarm create(Member member, String content, AlarmType alarmType) {
        return Alarm.builder()
            .member(member)
            .content(content)
            .isSend(true)
            .isRead(false)
            .mediaType(MediaType.NOTIFICATION)
            .alarmType(alarmType)
            .build();
    }

    public static Alarm createSuccessItem(Member member, AlarmType alarmType, String itemName) {
        StringBuilder sb = new StringBuilder("[").append(itemName)
            .append("]이 낙찰되었습니다. 구매 내역에서 낙찰 목록을 확인하고 7일 이내로 결제해주세요.");
        return Alarm.builder()
            .member(member)
            .content(sb.toString())
            .isSend(true)
            .isRead(false)
            .mediaType(MediaType.NOTIFICATION)
            .alarmType(alarmType)
            .build();
    }

    public static Alarm closeAuction(Member member, AlarmType alarmType, String auctionRoomTitle,
        int orderSuccessCnt, int orderFailCnt) {
        StringBuilder sb = new StringBuilder("[").append(auctionRoomTitle)
            .append("] 경매방이 종료되었습니다. 최종낙찰 ").append(orderSuccessCnt).append("개 유찰 ")
            .append(orderFailCnt).append("개입니다.");
        return Alarm.builder()
            .member(member)
            .content(sb.toString())
            .isSend(true)
            .isRead(false)
            .mediaType(MediaType.NOTIFICATION)
            .alarmType(alarmType)
            .build();
    }

    public void read() {
        this.isRead = true;
    }
}
