package com.widzard.bidking.bookmark.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BookmarkStatusResponse {
    private Long auctionRoomId;

    public static BookmarkStatusResponse from(Long auctionRoomId){
        return BookmarkStatusResponse.builder()
            .auctionRoomId(auctionRoomId)
            .build();
    }
}
