package com.widzard.bidking.order.service;

import com.widzard.bidking.auction.entity.AuctionRoom;
import com.widzard.bidking.auction.exception.AuctionRoomNotFoundException;
import com.widzard.bidking.auction.repository.AuctionRoomRepository;
import com.widzard.bidking.item.entity.Item;
import com.widzard.bidking.item.exception.ItemNotFoundException;
import com.widzard.bidking.item.repository.ItemRepository;
import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.member.exception.MemberNotFoundException;
import com.widzard.bidking.member.repository.MemberRepository;
import com.widzard.bidking.order.entity.Order;
import com.widzard.bidking.order.entity.OrderState;
import com.widzard.bidking.order.repository.OrderRepository;
import com.widzard.bidking.orderItem.entity.OrderItem;
import com.widzard.bidking.orderItem.repository.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final AuctionRoomRepository auctionRoomRepository;
    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    public Order createOrder(Long auctionRoomId, Long ordererId, OrderState orderState, Long itemId,
        Long price) {
        AuctionRoom auctionRoom = auctionRoomRepository.findById(auctionRoomId).orElseThrow(
            AuctionRoomNotFoundException::new);
        Member orderer = memberRepository.findById(ordererId)
            .orElseThrow(MemberNotFoundException::new);
        Item item = itemRepository.findById(itemId).orElseThrow(ItemNotFoundException::new);

        //order 저장
        Order order = Order.create(auctionRoom, orderer, orderState);
        orderRepository.save(order);

        //orderItem 저장
        OrderItem orderItem = OrderItem.create(price, item, order);
        orderItemRepository.save(orderItem);
        return order;
    }
}
