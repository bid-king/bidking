package com.widzard.bidking.member.repository;

import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.exception.MemberNotFoundException;
import com.widzard.bidking.member.service.MemberService;
import com.widzard.bidking.order.entity.OrderState;
import com.widzard.bidking.order.repository.OrderRepository;
import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;

    @Override
    public HashMap<String, Integer> getUserDashboard(Long userId) {
        Member member = memberRepository.findById(userId)
            .orElseThrow(() -> new MemberNotFoundException());

        HashMap<String, Integer> dashboardResult = new HashMap<>();

        int paymentWaiting = orderRepository.countByOrdererAndOrderState(member,
            OrderState.PAYMENT_WAITING);
        dashboardResult.put(OrderState.PAYMENT_WAITING.toString(), paymentWaiting);

        int deliveryWaiting = orderRepository.countByOrdererAndOrderState(member,
            OrderState.DELIVERY_WAITING);
        dashboardResult.put(OrderState.DELIVERY_WAITING.toString(), deliveryWaiting);

        int orderCanceled = orderRepository.countByOrdererAndOrderState(member,
            OrderState.ORDER_CANCELED);
        dashboardResult.put(OrderState.ORDER_CANCELED.toString(), orderCanceled);

        return dashboardResult;
    }
}
