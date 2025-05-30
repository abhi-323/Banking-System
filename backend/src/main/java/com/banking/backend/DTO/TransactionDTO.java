package com.banking.backend.DTO;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class TransactionDTO {
    private String fromAccount;
    private String toAccount;
    private BigDecimal amount;
}