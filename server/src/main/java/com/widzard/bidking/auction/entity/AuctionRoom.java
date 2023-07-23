package com.widzard.bidking.auction.entity;


import com.widzard.bidking.global.entity.BaseEntity;
import com.widzard.bidking.image.entity.Image;
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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Getter
@Entity
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "auction_room")
public class AuctionRoom extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auction_room_id")
    private Long id;

    //TODO member 추가 후 주석 해제
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "member_id")
//    private Member seller; //

    private String name; //(방이름)

    @Enumerated(EnumType.STRING)
    private AuctionRoomLiveState auctionRoomLiveState; // (라이브 상태)

    @Enumerated(EnumType.STRING)
    private AuctionRoomTradeState auctionRoomTradeState; //(거래 상태)

    @Enumerated(EnumType.STRING)
    private AuctionRoomType auctionRoomType; // (경매방식)

    private LocalDateTime startedAt; //경매방 시작시간

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id")
    private Image image; // (썸네일)


    @Builder
    //TODO member 추가 후 주석 해제
//    public AuctionRoom(Member seller, String name, AuctionRoomLiveState auctionRoomLiveState,
    public AuctionRoom(String name, AuctionRoomLiveState auctionRoomLiveState,
        AuctionRoomTradeState auctionRoomTradeState, AuctionRoomType auctionRoomType,
        LocalDateTime startedAt) {
//        this.seller = seller;//TODO member 추가 후 주석 해제
        this.name = name;
        this.auctionRoomLiveState = auctionRoomLiveState;
        this.auctionRoomTradeState = auctionRoomTradeState;
        this.auctionRoomType = auctionRoomType;
        this.startedAt = startedAt;
    }

}
