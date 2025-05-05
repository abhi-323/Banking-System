package com.banking.backend.service;

import com.banking.backend.models.BankAccount;
import com.banking.backend.models.Branch;
import com.banking.backend.models.Users;
import com.banking.backend.repository.BankAccountRepo;
import com.banking.backend.repository.BranchRepo;
import com.banking.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

@Service
public class BankAccountService {

    @Autowired
    private BankAccountRepo bankAccountRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BranchRepo branchRepository;

    public BankAccount createBankAccount(BankAccount bankAccount) {
        // Load and validate User
        UUID userId = bankAccount.getUser().getId();
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Load and validate Branch
        UUID branchId = bankAccount.getBranch().getId();
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new RuntimeException("Branch not found"));

        // Set resolved objects
        bankAccount.setUser(user);
        bankAccount.setBranch(branch);

        // Set defaults
        if (bankAccount.getBalance() == null)
            bankAccount.setBalance(BigDecimal.ZERO);

        if (bankAccount.getAccountNumber() == null || bankAccount.getAccountNumber().isEmpty())
            bankAccount.setAccountNumber(generateAccountNumber());

        // Force approval to false initially
        bankAccount.setApproval(false);

        return bankAccountRepo.save(bankAccount);
    }

    private String generateAccountNumber() {
        // Simple unique format: 12-digit random number
        return String.valueOf(100000000000L + (long) (Math.random() * 899999999999L));
    }

    public BankAccount getBankAccountById(String id) {
        UUID uuid = UUID.fromString(id);
        return bankAccountRepo.findById(uuid)
                .orElseThrow(() -> new RuntimeException("No bank account with ID: " + id));
    }

}
