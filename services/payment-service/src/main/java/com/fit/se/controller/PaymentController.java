package com.fit.se.controller;

import com.fit.se.dto.*;
import com.fit.se.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<ApiResponse<PaymentResponse>> pay(@Valid @RequestBody PaymentRequest request) {
        PaymentResponse response = paymentService.pay(request);
        return ResponseEntity.ok(ApiResponse.<PaymentResponse>builder()
                .success(true)
                .message("Thanh toan thanh cong")
                .data(response)
                .build());
    }
}