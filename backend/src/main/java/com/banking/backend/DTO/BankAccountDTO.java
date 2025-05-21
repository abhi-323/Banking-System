package com.banking.backend.DTO;

import com.banking.backend.models.Users;
import jakarta.transaction.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;


@Data
@AllArgsConstructor
public class BankAccountDTO {
    private UUID id;
    private String accountNumber;
    private String accountType;
    private BigDecimal balance;
    private boolean approval;
    private String ifscCode;
    private String pan;
    private String branchName;
    private UUID userId;
    private String userName;
    private String userEmail;
    private Users.Status userStatus;
}
