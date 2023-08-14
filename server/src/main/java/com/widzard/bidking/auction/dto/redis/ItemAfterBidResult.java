package com.widzard.bidking.auction.dto.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash(value = "itemAfterBidResult", timeToLive = 86400)
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ItemAfterBidResult {

    private String type;

    private String userId;

    private String nickname;

    private String price;

    private String time;

    @Builder
    public ItemAfterBidResult(String type, Long userId, String nickname, Long price,
        String time) {
        this.type = type;
        this.userId = String.valueOf(userId);
        this.nickname = nickname;
        this.price = String.valueOf(price);
        this.time = time;
    }
}
