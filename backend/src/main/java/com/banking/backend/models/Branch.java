package com.banking.backend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "branches")
@Data
public class Branch {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "branch_name", nullable = false)
    private String branchName;

    @Column(name = "ifsc_code", nullable = false, length = 11)
    private String ifscCode;

    @OneToMany(mappedBy = "branch")
    private List<BankAccount> bankAccounts;
}
