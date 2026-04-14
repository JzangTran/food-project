package com.fit.se.repository;

import com.fit.se.entity.Food;
import com.fit.se.entity.FoodCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {

    Page<Food> findByNameContainingIgnoreCase(String keyword, Pageable pageable);

    Page<Food> findByCategory(FoodCategory category, Pageable pageable);

    Page<Food> findByAvailable(Boolean available, Pageable pageable);

    Page<Food> findByNameContainingIgnoreCaseAndCategory(String keyword, FoodCategory category, Pageable pageable);

    Page<Food> findByNameContainingIgnoreCaseAndAvailable(String keyword, Boolean available, Pageable pageable);

    Page<Food> findByCategoryAndAvailable(FoodCategory category, Boolean available, Pageable pageable);

    Page<Food> findByNameContainingIgnoreCaseAndCategoryAndAvailable(
            String keyword,
            FoodCategory category,
            Boolean available,
            Pageable pageable
    );
}