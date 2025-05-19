package com.banking.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "loan_applications")
@Data
public class LoanApplication {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(nullable = false)
    private BigDecimal requestedAmount;

    @Column(nullable = false)
    private BigDecimal interestRate; // Proposed interest rate

    @Column(nullable = false)
    private int tenureInMonths; // How many months to repay

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    @Column
    private LocalDate applicationDate;

    @Column(nullable = false)
    private String pan;

    public enum ApplicationStatus {
        PENDING,
        APPROVED,
        REJECTED
    }
}
