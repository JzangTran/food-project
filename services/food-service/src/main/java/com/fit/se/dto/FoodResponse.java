package com.fit.se.dto;

import com.fit.se.entity.FoodCategory;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodResponse {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private FoodCategory category;
    private Boolean available;
}