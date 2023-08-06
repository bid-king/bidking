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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Content content; // ( 내용 )

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

    public static Alarm create(Member member, Content content, AlarmType alarmType) {
        return Alarm.builder()
            .member(member)
            .content(content)
            .isSend(true)
            .isRead(false)
            .alarmType(alarmType)
            .build();
    }
}
