package com.widzard.bidking.auction.service.facade;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisListService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public void saveObjectToList(String key, Object object) {
        ListOperations<String, Object> listOperations = redisTemplate.opsForList();
        listOperations.leftPush(key, object);
    }

    public List<Object> getObjectList(String key) {
        ListOperations<String, Object> listOperations = redisTemplate.opsForList();
        return listOperations.range(key, 0, -1);
    }


}

