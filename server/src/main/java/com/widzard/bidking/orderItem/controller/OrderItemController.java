package com.widzard.bidking.orderItem.controller;

import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.orderItem.dto.response.SuccessItemResponse;
import com.widzard.bidking.order.service.OrderService;
import com.widzard.bidking.orderItem.entity.OrderItem;
import com.widzard.bidking.orderItem.service.OrderItemService;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/orderItems")
public class OrderItemController {

    private final OrderItemService orderItemService;

    @GetMapping
    public ResponseEntity<List<SuccessItemResponse>> readSuccessItemList(
        @AuthenticationPrincipal Member member
    ) {
        List<Optional<OrderItem>> orderItemList = orderItemService.readOrderItemByMember(member);
        List<SuccessItemResponse> successItemResponseList = new ArrayList<>();
        for (Optional<OrderItem> orderItem : orderItemList
        ) {
            if (orderItem.isPresent()) {
                successItemResponseList.add(SuccessItemResponse.from(orderItem.get(), member));
            }
        }
        return new ResponseEntity<>(successItemResponseList, HttpStatus.OK);
    }
}
