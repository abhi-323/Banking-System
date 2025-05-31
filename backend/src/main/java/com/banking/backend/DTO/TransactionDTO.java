package com.banking.backend.DTO;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class TransactionDTO {
    private UUID id;
    private String type;
    private BigDecimal amount;
    private LocalDateTime createdAt;
    private String fromAccount;
    private String toAccount;
}
