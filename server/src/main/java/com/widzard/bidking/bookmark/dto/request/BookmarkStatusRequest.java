package com.widzard.bidking.bookmark.dto.request;

import javax.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class BookmarkStatusRequest {

    @NotBlank(message = "북마크할 경매방을 선택하세요")
    private String auctionRoomId;

}
