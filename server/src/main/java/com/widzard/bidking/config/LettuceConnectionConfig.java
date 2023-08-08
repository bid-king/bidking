package com.widzard.bidking.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.widzard.bidking.alarm.dto.response.AlarmResponse;
import javax.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;

@Configuration
@RequiredArgsConstructor
public class LettuceConnectionConfig {

    @Value("${spring.redis.host}")
    private String host;
    @Value("${spring.redis.port}")
    private int port;
    private final EntityManagerFactory entityManagerFactory;

// 만약 PlatformTransactionManager 등록이 안되어 있다면 해야함, 되어있다면 할 필요 없음
//    @Bean
//    public PlatformTransactionManager transactionManager() throws SQLException {
//        // JPA 사용하고 있다면 아래처럼 사용하고 있음
//        return new JpaTransactionManager(entityManagerFactory);
//    }

    //Class <=> Json간 변환을 담당한다.
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        mapper.registerModules(new JavaTimeModule(), new Jdk8Module());
        return mapper;
    }

    //redis 연결
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory(host, port);
    }

    @Bean
    public RedisOperations<String, AlarmResponse> eventRedisOperations(
        RedisConnectionFactory redisConnectionFactory, ObjectMapper objectMapper) {
        final Jackson2JsonRedisSerializer<AlarmResponse> jsonRedisSerializer = new Jackson2JsonRedisSerializer<>(
            AlarmResponse.class);
        jsonRedisSerializer.setObjectMapper(objectMapper);
        final RedisTemplate<String, AlarmResponse> eventRedisTemplate = new RedisTemplate<>();
        eventRedisTemplate.setConnectionFactory(redisConnectionFactory);
        eventRedisTemplate.setKeySerializer(RedisSerializer.string());
        eventRedisTemplate.setValueSerializer(jsonRedisSerializer);
        eventRedisTemplate.setHashKeySerializer(RedisSerializer.string());
        eventRedisTemplate.setHashValueSerializer(jsonRedisSerializer);
        return eventRedisTemplate;
    }

    @Bean
    public RedisMessageListenerContainer redisMessageListenerContainer(RedisConnectionFactory redisConnectionFactory) {
        final RedisMessageListenerContainer redisMessageListenerContainer = new RedisMessageListenerContainer();
        redisMessageListenerContainer.setConnectionFactory(redisConnectionFactory);
        return redisMessageListenerContainer;
    }
}
