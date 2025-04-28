package com.banking.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "loan_accounts")
@Data
public class LoanAccount {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(nullable = false)
    private BigDecimal sanctionedAmount;

    @Column(nullable = false)
    private BigDecimal interestRate; // example: 8.5 for 8.5%

    @Column(nullable = false)
    private BigDecimal emiAmount; // Monthly EMI amount

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private BigDecimal outstandingAmount; // Remaining balance to be paid

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoanStatus status;

    public enum LoanStatus {
        ACTIVE,
        CLOSED,
        DEFAULTED
    }
}
