package com.fit.se.config;

import com.fit.se.entity.Food;
import com.fit.se.entity.FoodCategory;
import com.fit.se.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final FoodRepository foodRepository;

    @Override
    public void run(String... args) {
        if (foodRepository.count() > 0) {
            return;
        }

        foodRepository.save(Food.builder()
                .name("Com Ga")
                .description("Com ga nuong, rau cu")
                .price(35000.0)
                .category(FoodCategory.DO_AN)
                .available(true)
                .build());

        foodRepository.save(Food.builder()
                .name("Bun Bo")
                .description("Bun bo hue")
                .price(42000.0)
                .category(FoodCategory.DO_AN)
                .available(true)
                .build());

        foodRepository.save(Food.builder()
                .name("Tra Dao")
                .description("Tra dao mat lanh")
                .price(18000.0)
                .category(FoodCategory.NUOC_UONG)
                .available(true)
                .build());

        foodRepository.save(Food.builder()
                .name("Ca Phe Sua")
                .description("Ca phe sua da")
                .price(22000.0)
                .category(FoodCategory.NUOC_UONG)
                .available(true)
                .build());

        foodRepository.save(Food.builder()
                .name("Banh Ngot")
                .description("An nhe giua gio")
                .price(28000.0)
                .category(FoodCategory.KHAC)
                .available(false)
                .build());
    }
}