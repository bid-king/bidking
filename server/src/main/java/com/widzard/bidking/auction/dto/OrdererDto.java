package com.widzard.bidking.auction.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrdererDto {

    private Long ordererId;
    private String itemName;
}
