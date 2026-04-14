package com.fit.se.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "foods")
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private Double price;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FoodCategory category;

    @Column(nullable = false)
    private Boolean available;
}