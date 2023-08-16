package com.widzard.bidking.auction.entity;

public enum AuctionRoomTradeState {
    BEFORE_PROGRESS,
    IN_PROGRESS, // 라이브 종료 후 거래가 하나라도 진행중일 때
    ALL_COMPLETED // 모든 거래가 종
}
