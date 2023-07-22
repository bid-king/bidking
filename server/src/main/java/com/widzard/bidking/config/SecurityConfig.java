package com.widzard.bidking.config;

import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/*
로그인 인증이 필요 없는 경우
- 로그인, 회원가입, 로그아웃, 카테고리 리스트
- 경매 진행 예정, 경매 진행 중 리스트

로그인 인증이 필요함
- 나머지 모든 기능
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().configurationSource(corsConfigurationSource())
            .and()
            .csrf().disable()
            .httpBasic().disable() // 토큰 사용하므로 basic disable
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests()
            .antMatchers("/api/v1/members/login", "/api/v1/members/logout",
                "/api/v1/members/signup", "/api/v1/items/categories").permitAll()
            .antMatchers(HttpMethod.GET, "/api/v1/auctions").permitAll()
            .anyRequest().authenticated()
            .and()
            .formLogin()
            .loginPage("/api/v1/members/login")
            .and()
            .logout()
            .logoutRequestMatcher(new AntPathRequestMatcher("/api/v1/members/logout"));

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*"); //TODO System.getenv("CLIENT_URL")
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE"));
        configuration.addAllowedHeader("*");
        // Cross Origin 에 요청을 보낼 때 요청에 인증(credential) 정보를 담아서 보낼 수 있는지 결정하는 항목
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

}
