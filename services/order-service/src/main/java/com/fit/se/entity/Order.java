package com.fit.se.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "orders")
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String customerName;
    private String email;
    private String phone;

    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private LocalDateTime createdAt;

    @Builder.Default
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();
}