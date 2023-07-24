package com.widzard.bidking.member.service;

import com.widzard.bidking.auction.exception.SendingMessageFailureException;
import java.util.HashMap;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MemberServiceImpl implements MemberService {

    private static final String MSG_TYPE = "SMS";

    @Value("${coolsms.api_key}")
    private String API_KEY;

    @Value("${coolsms.api_secret}")
    private String API_SECRET;

    @Value("${coolsms.from}")
    private String FROM;

    @Override
    public void certifiedPhoneNumber(String phoneNumber, String cerNum) {
        Message coolsms = new Message(API_KEY, API_SECRET);

        // 4 params(to, from, type, text) are mandatory. must be filled
        HashMap<String, String> params = new HashMap<>();
        params.put("to", phoneNumber);
        params.put("from", FROM);
        params.put("type", MSG_TYPE);
        params.put("text", "[입찰왕] 인증번호는 [" + cerNum + "] 입니다.");

        try {
            JSONObject sendObj = coolsms.send(params);
            log.info(sendObj.toString());
        } catch (CoolsmsException e) {
            log.error(e.getMessage());
            log.error(String.valueOf(e.getCode()));
            throw new SendingMessageFailureException();
        }
    }
}
