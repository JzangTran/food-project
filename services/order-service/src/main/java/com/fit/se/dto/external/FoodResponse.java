package com.fit.se.dto.external;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FoodResponse {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private String category;
    private Boolean available;
}