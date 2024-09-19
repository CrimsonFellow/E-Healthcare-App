package com.healthcare.dto;

import lombok.Data;

@Data
public class CartRequest {
    private Long userId;
    private Long medicineId; 
    private int quantity;
}
