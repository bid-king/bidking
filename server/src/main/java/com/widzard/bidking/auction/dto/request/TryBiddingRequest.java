package com.widzard.bidking.auction.dto.request;

import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TryBiddingRequest {

    @NotNull(message = "입찰가를 입력하세요")
    private long price;
}
