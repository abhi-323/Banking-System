package com.banking.backend.DTO;

import com.banking.backend.models.LoanApplication.ApplicationStatus;
import com.banking.backend.models.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanApplicationDTO {
    private UUID id;
    private BigDecimal requestedAmount;
    private BigDecimal interestRate;
    private int tenureInMonths;
    private ApplicationStatus status;
    private LocalDate applicationDate;
    private String pan;
    private UUID userId;
    private String userName;
    private String userEmail;
    private Users.Status userStatus;
}
