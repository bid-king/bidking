package com.widzard.bidking.alarm.repository;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Repository
@RequiredArgsConstructor
public class EmitterRepository {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final Map<String, Object> eventCache = new ConcurrentHashMap<>();

    public SseEmitter save(String id, SseEmitter emitter) {
        emitters.put(id, emitter);
        return emitter;
    }

    // 이벤트를 캐시하는 메서드
    public void saveEventCache(String id, Object event) {
        eventCache.put(id, event);
    }

    // id로 시작하는 모든 SseEmitter 객체들을 가져오는 메서드
    public Map<String, SseEmitter> findAllStartById(String startId) {
        Map<String, SseEmitter> result = new ConcurrentHashMap<>();
        for (Map.Entry<String, SseEmitter> entry : emitters.entrySet()) {
            String id = entry.getKey();
            SseEmitter emitter = entry.getValue();
            if (id.startsWith(startId)) {
                result.put(id, emitter);
            }
        }
        return result;

    }

    public void deleteAllStartWithId(String id) {
        emitters.forEach((key, emitter) -> {
            if (key.startsWith(id)) emitters.remove(key);
        });
    }

    //Id로 시작하는 이벤트를 가져오는 메서드
    public Map<String, Object> findAllEventCacheStartWithId(String startId) {
        Map<String, Object> result = new ConcurrentHashMap<>();
        for (Map.Entry<String, Object> entry : eventCache.entrySet()) {
            String id = entry.getKey();
            Object event = entry.getValue();
            if (id.startsWith(startId)) {
                result.put(id, event);
            }
        }
        return result;
    }
}
