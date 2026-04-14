package com.fit.se.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemResponse {
    private Long id;
    private Long foodId;
    private String foodName;
    private Integer quantity;
    private Double price;
}