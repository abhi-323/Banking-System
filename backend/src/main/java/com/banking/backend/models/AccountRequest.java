package com.banking.backend.models;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
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

    @Enumerated(EnumType.STRING)
    private Status status; // PENDING, APPROVED, REJECTED

    public enum Status{
        PENDING,
        APPROVED,
        REJECTED
    }
}
