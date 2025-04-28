package com.banking.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "transactions")
@Data
public class Transactions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "from_account_id")
    private BankAccount fromAccount;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "to_account_id")
    private BankAccount toAccount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType type;

    @Column(nullable = false)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionStatus status;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public enum TransactionType {
        TRANSFER,
        WITHDRAWAL,
        DEPOSIT
    }

    public enum TransactionStatus {
        PENDING,
        COMPLETED,
        FAILED
    }
}
