package com.widzard.bidking.order;

import com.widzard.bidking.member.entity.Member;
import com.widzard.bidking.order.entity.Order;
import com.widzard.bidking.order.entity.OrderState;
import com.widzard.bidking.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
public class testController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> create(
        @AuthenticationPrincipal Member member,
        @RequestBody testDto testDto
    ) {
        return new ResponseEntity<>(orderService.createOrder(testDto.getAuctionRoomId(),
            testDto.getOrdererId(),
            OrderState.PAYMENT_WAITING, testDto.getItemId(), testDto.getPrice()), HttpStatus.OK);
    }
}
