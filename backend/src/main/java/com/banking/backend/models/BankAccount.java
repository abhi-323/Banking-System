package com.banking.backend.models;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "bank_accounts")
@Data
public class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(name = "account_number", nullable = false, unique = true)
    private String accountNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "account_type", nullable = false)
    private AccountType accountType;

    @Column(name = "balance", nullable = false)
    private BigDecimal balance;

    @Column(name = "approved", nullable = false)
    private boolean approved; // true if Manager has approved

    public enum AccountType {
        SAVINGS,
        CURRENT,
        FIXED_DEPOSIT,
        RECURRING_DEPOSIT
    }
}
