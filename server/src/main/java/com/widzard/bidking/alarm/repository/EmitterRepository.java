package com.widzard.bidking.alarm.repository;

import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Repository
@RequiredArgsConstructor
public class EmitterRepository {

    private final Map<String, SseEmitter> emitters = new HashMap<>();
    private final Map<String, Object> eventCache  = new HashMap<>();

    public SseEmitter save(String id, SseEmitter emitter) {
        emitters.put(id, emitter);
        return emitter;
    }

    public void deleteById(String id) {
        emitters.remove(id);
    }

    public SseEmitter findByMemberId(String id) {
        return emitters.get(id);
    }

    //Id로 시작하는 이벤트를 가져오는 메서드
    public Map<String, Object> findAllEventCacheStartWithId(String startId) {
        Map<String, Object> result = new HashMap<>();
        for (Map.Entry<String, Object> entry : eventCache.entrySet()) {
            String id = entry.getKey();
            Object event = entry.getValue();
            if (id.startsWith(startId)) {
                result.put(id, event);
            }
        }
        return result;
    }

    // id로 시작하는 모든 SseEmitter 객체들을 가져오는 메서드
    public Map<String, SseEmitter> findAllStartWithById(String startId) {
        Map<String, SseEmitter> result = new HashMap<>();
        for (Map.Entry<String, SseEmitter> entry : emitters.entrySet()) {
            String id = entry.getKey();
            SseEmitter emitter = entry.getValue();
            if (id.startsWith(startId)) {
                result.put(id, emitter);
            }
        }
        return result;
    }

    // 이벤트를 캐시하는 메서드
    public void saveEventCache(String id, Object event) {
        eventCache.put(id, event);
    }
}
