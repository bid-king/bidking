package com.widzard.bidking.alarm.properties;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;

@Getter
public class RedisProperties {

    @Value("${spring.redis.host}")
    private String host;
    @Value("${spring.redis.port}")
    private int port;
    @Value("${spring.redis.timeout}")
    private int timeout;

}
