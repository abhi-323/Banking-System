package com.banking.backend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
public class AccountRequest {
    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    private Users user;

    @Enumerated(EnumType.STRING)
    private BankAccount.AccountType requestedType;

    private String branch;

    private String ifscCode;

    @Column(nullable = false)
    private String PAN;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status{
        PENDING,
        APPROVED,
        REJECTED
    }
}
