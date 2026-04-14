package com.fit.se.service;

import com.fit.se.dto.FoodRequest;
import com.fit.se.dto.FoodResponse;
import com.fit.se.entity.Food;
import com.fit.se.entity.FoodCategory;
import com.fit.se.exception.ResourceNotFoundException;
import com.fit.se.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodRepository foodRepository;

    public Page<FoodResponse> getFoods(String keyword, FoodCategory category, Boolean available, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        Page<Food> result;

        boolean hasKeyword = keyword != null && !keyword.trim().isEmpty();
        boolean hasCategory = category != null;
        boolean hasAvailable = available != null;

        if (hasKeyword && hasCategory && hasAvailable) {
            result = foodRepository.findByNameContainingIgnoreCaseAndCategoryAndAvailable(
                    keyword.trim(), category, available, pageable
            );
        } else if (hasKeyword && hasCategory) {
            result = foodRepository.findByNameContainingIgnoreCaseAndCategory(
                    keyword.trim(), category, pageable
            );
        } else if (hasKeyword && hasAvailable) {
            result = foodRepository.findByNameContainingIgnoreCaseAndAvailable(
                    keyword.trim(), available, pageable
            );
        } else if (hasCategory && hasAvailable) {
            result = foodRepository.findByCategoryAndAvailable(category, available, pageable);
        } else if (hasKeyword) {
            result = foodRepository.findByNameContainingIgnoreCase(keyword.trim(), pageable);
        } else if (hasCategory) {
            result = foodRepository.findByCategory(category, pageable);
        } else if (hasAvailable) {
            result = foodRepository.findByAvailable(available, pageable);
        } else {
            result = foodRepository.findAll(pageable);
        }

        return result.map(this::toResponse);
    }

    public FoodResponse getFoodById(Long id) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay mon an voi id = " + id));
        return toResponse(food);
    }

    public FoodResponse createFood(FoodRequest request) {
        Food food = Food.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(request.getCategory())
                .available(request.getAvailable())
                .build();

        return toResponse(foodRepository.save(food));
    }

    public FoodResponse updateFood(Long id, FoodRequest request) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay mon an voi id = " + id));

        food.setName(request.getName());
        food.setDescription(request.getDescription());
        food.setPrice(request.getPrice());
        food.setCategory(request.getCategory());
        food.setAvailable(request.getAvailable());

        return toResponse(foodRepository.save(food));
    }

    public void deleteFood(Long id) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay mon an voi id = " + id));
        foodRepository.delete(food);
    }

    private FoodResponse toResponse(Food food) {
        return FoodResponse.builder()
                .id(food.getId())
                .name(food.getName())
                .description(food.getDescription())
                .price(food.getPrice())
                .category(food.getCategory())
                .available(food.getAvailable())
                .build();
    }
}