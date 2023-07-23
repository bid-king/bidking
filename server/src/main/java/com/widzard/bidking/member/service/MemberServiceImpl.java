package com.widzard.bidking.member.service;

import com.widzard.bidking.auction.entity.AuctionRoomLiveState;
import com.widzard.bidking.auction.entity.AuctionRoomTradeState;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.exception.MemberNotFoundException;
import com.widzard.bidking.member.repository.MemberRepository;
import com.widzard.bidking.order.entity.OrderState;
import com.widzard.bidking.order.repository.OrderRepository;
import java.util.HashMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private static final List<AuctionRoomLiveState> LIVE_STATE = List.of(
        AuctionRoomLiveState.OFF_LIVE);
    private static final List<AuctionRoomTradeState> TRADE_STATE = List.of(
        AuctionRoomTradeState.IN_PROGRESS,
        AuctionRoomTradeState.ALL_COMPLETED);
    private static final List<OrderState> ORDER_STATE = List.of(OrderState.PAYMENT_WAITING,
        OrderState.DELIVERY_WAITING, OrderState.ORDER_CANCELED);


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

    @Override
    public HashMap<String, Integer> getSellerDashboard(Long userId) {
        Member member = memberRepository.findById(userId)
            .orElseThrow(() -> new MemberNotFoundException());

        HashMap<String, Integer> dashboardResult = new HashMap<>();

        List<Object[]> dashboard = orderRepository.countOrdersByState(member, LIVE_STATE,
            TRADE_STATE,
            ORDER_STATE);

        for (Object[] obj : dashboard) {
            dashboardResult.put(obj[0].toString(), Integer.valueOf(obj[1].toString()));
        }

        return dashboardResult;
    }
}
