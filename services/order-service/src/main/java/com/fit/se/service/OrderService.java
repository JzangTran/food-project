package com.fit.se.service;

import com.fit.se.dto.*;
import com.fit.se.dto.external.FoodResponse;
import com.fit.se.dto.external.UserResponse;
import com.fit.se.entity.Order;
import com.fit.se.entity.OrderItem;
import com.fit.se.entity.OrderStatus;
import com.fit.se.exception.ResourceNotFoundException;
import com.fit.se.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final RestTemplate restTemplate;
    private final SimpMessagingTemplate messagingTemplate;

    @Value("${service.user-url}")
    private String userUrl;

    @Value("${service.food-url}")
    private String foodUrl;

    public OrderResponse createOrder(CreateOrderRequest request) {
        ApiResponse<UserResponse> userApi = restTemplate.getForObject(
                userUrl + "/" + request.getUserId(),
                ApiResponse.class
        );

        if (userApi == null || userApi.getData() == null) {
            throw new RuntimeException("Khong tim thay user");
        }

        UserResponse user = convertUser(userApi.getData());

        Order order = Order.builder()
                .userId(user.getId())
                .customerName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .status(OrderStatus.CHO_XAC_NHAN)
                .createdAt(LocalDateTime.now())
                .build();

        double total = 0;

        for (CreateOrderItemRequest itemReq : request.getItems()) {
            ApiResponse<FoodResponse> foodApi = restTemplate.getForObject(
                    foodUrl + "/" + itemReq.getFoodId(),
                    ApiResponse.class
            );

            if (foodApi == null || foodApi.getData() == null) {
                throw new RuntimeException("Khong tim thay mon an id = " + itemReq.getFoodId());
            }

            FoodResponse food = convertFood(foodApi.getData());

            if (!Boolean.TRUE.equals(food.getAvailable())) {
                throw new RuntimeException("Mon an " + food.getName() + " hien khong duoc ban");
            }

            OrderItem orderItem = OrderItem.builder()
                    .foodId(food.getId())
                    .foodName(food.getName())
                    .quantity(itemReq.getQuantity())
                    .price(food.getPrice())
                    .order(order)
                    .build();

            order.getItems().add(orderItem);
            total += food.getPrice() * itemReq.getQuantity();
        }

        order.setTotalAmount(total);

        Order saved = orderRepository.save(order);
        OrderResponse response = mapToResponse(saved);

        OrderSocketEvent event = OrderSocketEvent.builder()
                .type("ORDER_CREATED")
                .orderId(saved.getId())
                .userId(saved.getUserId())
                .customerName(saved.getCustomerName())
                .status(saved.getStatus())
                .totalAmount(saved.getTotalAmount())
                .message("Don hang moi da duoc tao")
                .build();

        messagingTemplate.convertAndSend("/topic/admin/orders", event);
        messagingTemplate.convertAndSend("/topic/user/orders/" + saved.getUserId(), event);

        return response;
    }

    public List<OrderResponse> getOrders() {
        return orderRepository.findAll().stream().map(this::mapToResponse).toList();
    }

    public OrderResponse getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay don hang id = " + id));
        return mapToResponse(order);
    }

    public OrderResponse updateStatus(Long id, UpdateOrderStatusRequest request) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay don hang id = " + id));

        order.setStatus(request.getStatus());
        Order saved = orderRepository.save(order);
        OrderResponse response = mapToResponse(saved);

        OrderSocketEvent event = OrderSocketEvent.builder()
                .type("ORDER_STATUS_UPDATED")
                .orderId(saved.getId())
                .userId(saved.getUserId())
                .customerName(saved.getCustomerName())
                .status(saved.getStatus())
                .totalAmount(saved.getTotalAmount())
                .message("Trang thai don hang da duoc cap nhat")
                .build();

        messagingTemplate.convertAndSend("/topic/admin/orders", event);
        messagingTemplate.convertAndSend("/topic/user/orders/" + saved.getUserId(), event);

        return response;
    }

    private OrderResponse mapToResponse(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .customerName(order.getCustomerName())
                .email(order.getEmail())
                .phone(order.getPhone())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .items(order.getItems().stream().map(item -> OrderItemResponse.builder()
                        .id(item.getId())
                        .foodId(item.getFoodId())
                        .foodName(item.getFoodName())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .build()).toList())
                .build();
    }

    @SuppressWarnings("unchecked")
    private UserResponse convertUser(Object raw) {
        var map = (java.util.Map<String, Object>) raw;
        return new UserResponse(
                Long.valueOf(map.get("id").toString()),
                String.valueOf(map.get("fullName")),
                String.valueOf(map.get("email")),
                String.valueOf(map.get("phone")),
                String.valueOf(map.get("role"))
        );
    }

    @SuppressWarnings("unchecked")
    private FoodResponse convertFood(Object raw) {
        var map = (java.util.Map<String, Object>) raw;
        return new FoodResponse(
                Long.valueOf(map.get("id").toString()),
                String.valueOf(map.get("name")),
                String.valueOf(map.get("description")),
                Double.valueOf(map.get("price").toString()),
                String.valueOf(map.get("category")),
                Boolean.valueOf(map.get("available").toString())
        );
    }
}