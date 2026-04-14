package com.fit.se.controller;

import com.fit.se.dto.ApiResponse;
import com.fit.se.dto.FoodRequest;
import com.fit.se.dto.FoodResponse;
import com.fit.se.entity.FoodCategory;
import com.fit.se.service.FoodService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/foods")
@RequiredArgsConstructor
public class FoodController {

    private final FoodService foodService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<FoodResponse>>> getFoods(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) FoodCategory category,
            @RequestParam(required = false) Boolean available,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<FoodResponse> foods = foodService.getFoods(keyword, category, available, page, size);
        return ResponseEntity.ok(ApiResponse.<Page<FoodResponse>>builder()
                .success(true)
                .message("Lay danh sach mon an thanh cong")
                .data(foods)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<FoodResponse>> getFoodById(@PathVariable Long id) {
        FoodResponse food = foodService.getFoodById(id);
        return ResponseEntity.ok(ApiResponse.<FoodResponse>builder()
                .success(true)
                .message("Lay chi tiet mon an thanh cong")
                .data(food)
                .build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<FoodResponse>> createFood(@Valid @RequestBody FoodRequest request) {
        FoodResponse food = foodService.createFood(request);
        return ResponseEntity.ok(ApiResponse.<FoodResponse>builder()
                .success(true)
                .message("Them mon an thanh cong")
                .data(food)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<FoodResponse>> updateFood(
            @PathVariable Long id,
            @Valid @RequestBody FoodRequest request
    ) {
        FoodResponse food = foodService.updateFood(id, request);
        return ResponseEntity.ok(ApiResponse.<FoodResponse>builder()
                .success(true)
                .message("Cap nhat mon an thanh cong")
                .data(food)
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .message("Xoa mon an thanh cong")
                .data(null)
                .build());
    }
}