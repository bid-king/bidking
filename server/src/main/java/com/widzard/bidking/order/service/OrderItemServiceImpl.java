package com.widzard.bidking.order.service;

import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.order.entity.OrderItem;
import com.widzard.bidking.order.repository.OrderItemRepository;
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
    public List<OrderItem> readOrderItemByMember(Member member) {
        return orderItemRepository.findAllByOrder_Orderer(member);
    }
}
