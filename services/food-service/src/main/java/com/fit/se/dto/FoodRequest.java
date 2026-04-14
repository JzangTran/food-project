package com.fit.se.dto;

import com.fit.se.entity.FoodCategory;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FoodRequest {

    @NotBlank
    private String name;

    private String description;

    @NotNull
    @Min(0)
    private Double price;

    @NotNull
    private FoodCategory category;

    @NotNull
    private Boolean available;
}