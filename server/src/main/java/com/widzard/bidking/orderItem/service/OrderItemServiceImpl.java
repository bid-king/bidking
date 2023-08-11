package com.widzard.bidking.orderItem.service;

import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.orderItem.entity.OrderItem;
import com.widzard.bidking.orderItem.repository.OrderItemRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemRepository orderItemRepository;

    @Override
    public List<Optional<OrderItem>> readOrderItemByMember(Member member) {
        return orderItemRepository.findByOrderItemByMemberId(member);
    }
}
