package com.fit.se.controller;

import com.fit.se.dto.*;
import com.fit.se.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        OrderResponse response = orderService.createOrder(request);
        return ResponseEntity.ok(ApiResponse.<OrderResponse>builder()
                .success(true)
                .message("Tao don hang thanh cong")
                .data(response)
                .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getOrders() {
        List<OrderResponse> response = orderService.getOrders();
        return ResponseEntity.ok(ApiResponse.<List<OrderResponse>>builder()
                .success(true)
                .message("Lay danh sach don hang thanh cong")
                .data(response)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderById(@PathVariable Long id) {
        OrderResponse response = orderService.getOrderById(id);
        return ResponseEntity.ok(ApiResponse.<OrderResponse>builder()
                .success(true)
                .message("Lay chi tiet don hang thanh cong")
                .data(response)
                .build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<OrderResponse>> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateOrderStatusRequest request
    ) {
        OrderResponse response = orderService.updateStatus(id, request);
        return ResponseEntity.ok(ApiResponse.<OrderResponse>builder()
                .success(true)
                .message("Cap nhat trang thai don hang thanh cong")
                .data(response)
                .build());
    }
}