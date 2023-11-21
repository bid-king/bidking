package com.widzard.bidking.order.controller;

import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.order.dto.response.SuccessItemResponse;
import com.widzard.bidking.order.entity.OrderItem;
import com.widzard.bidking.order.service.OrderItemService;
import java.util.ArrayList;
import java.util.List;
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
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderItemService orderItemService;

    @GetMapping
    public ResponseEntity<List<SuccessItemResponse>> readSuccessItemList(
        @AuthenticationPrincipal Member member
    ) {
        List<OrderItem> orderItemList = orderItemService.readOrderItemByMember(member);
        List<SuccessItemResponse> successItemResponseList = new ArrayList<>();
        for (OrderItem orderItem : orderItemList) {
            successItemResponseList.add(SuccessItemResponse.from(orderItem, member));
        }
        return new ResponseEntity<>(successItemResponseList, HttpStatus.OK);
    }
}
