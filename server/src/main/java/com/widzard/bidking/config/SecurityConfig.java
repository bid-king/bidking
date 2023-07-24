package com.widzard.bidking.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /*
    로그인 인증이 필요 없는 경우
    - 로그인, 회원가입, 카테고리 리스트
    - 경매 진행 예정, 경매 진행 중 리스트

    로그인 인증이 필요함
    - 나머지 기능

    auth 이상의 권한이 필요한 경우
    - 경매방 생성
    - 경매방 참여
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.authorizeRequests()
            .antMatchers("/api/v1/oauth/**", "/api/v1/items/categories").permitAll()
            .antMatchers(HttpMethod.GET, "/api/v1/auctions").permitAll()
            .antMatchers("/api/v1/bookmarks/**", "/api/v1/members/**").authenticated()
            .anyRequest().hasRole("USER")
            .and()
            .formLogin()
            .loginPage("/api/v1/oauth/login")
//                .loginProcessingUrl("/loginProc")
//                .defaultSuccessUrl("/")
            .and()
            .oauth2Login()
            .loginPage("/api/v1/oauth/login");
//                .userInfoEndpoint();

        return http.build();
    }
//
//    @Bean//개발용 임시 security config
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.csrf().disable();
//        http.authorizeRequests()
//            .anyRequest().permitAll()
//            .and()
//            .formLogin()
//            .loginPage("/api/v1/oauth/login")
//            .and()
//            .oauth2Login()
//            .loginPage("/api/v1/oauth/login");
//
//        return http.build();
//    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
