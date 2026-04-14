package com.fit.se.service;

import com.fit.se.dto.ApiResponse;
import com.fit.se.dto.PaymentRequest;
import com.fit.se.dto.PaymentResponse;
import com.fit.se.dto.external.OrderResponse;
import com.fit.se.entity.Payment;
import com.fit.se.entity.PaymentStatus;
import com.fit.se.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final RestTemplate restTemplate;

    @Value("${service.order-url}")
    private String orderUrl;

    public PaymentResponse pay(PaymentRequest request) {
        ApiResponse<OrderResponse> orderApi = restTemplate.getForObject(
                orderUrl + "/" + request.getOrderId(),
                ApiResponse.class
        );

        if (orderApi == null || orderApi.getData() == null) {
            throw new RuntimeException("Khong tim thay don hang");
        }

        OrderResponse order = convertOrder(orderApi.getData());

        Payment payment = Payment.builder()
                .orderId(request.getOrderId())
                .method(request.getMethod())
                .status(PaymentStatus.SUCCESS)
                .paidAt(LocalDateTime.now())
                .build();

        Payment saved = paymentRepository.save(payment);

        System.out.println(order.getCustomerName() + " da dat don #" + order.getId() + " thanh cong");

        return PaymentResponse.builder()
                .id(saved.getId())
                .orderId(saved.getOrderId())
                .method(saved.getMethod())
                .status(saved.getStatus())
                .paidAt(saved.getPaidAt())
                .build();
    }

    @SuppressWarnings("unchecked")
    private OrderResponse convertOrder(Object raw) {
        var map = (java.util.Map<String, Object>) raw;
        return new OrderResponse(
                Long.valueOf(map.get("id").toString()),
                Long.valueOf(map.get("userId").toString()),
                String.valueOf(map.get("customerName")),
                String.valueOf(map.get("email")),
                String.valueOf(map.get("phone")),
                Double.valueOf(map.get("totalAmount").toString()),
                String.valueOf(map.get("status"))
        );
    }
}