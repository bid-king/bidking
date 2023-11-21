package com.widzard.bidking.global.security;

import com.widzard.bidking.member.exception.MemberNotFoundException;
import com.widzard.bidking.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("loadUserByUsername **** userId: "+ username);
        return memberRepository.findByUserIdAndAvailableTrue(username).orElseThrow(MemberNotFoundException::new);
    }
}
