package com.banking.backend.service;

import com.banking.backend.models.*;
import com.banking.backend.DTO.BankAccountDTO;
import com.banking.backend.repository.AccountRequestRepo;
import com.banking.backend.repository.BankAccountRepo;
import com.banking.backend.repository.BranchRepo;
import com.banking.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @Autowired
    AccountRequestRepo accountRequestRepo;

    public BankAccountDTO approveCreateBankAccount(UUID id) {
        Optional<AccountRequest> optionalRequest = accountRequestRepo.findById(id);

        if (optionalRequest.isEmpty()) {
            throw new IllegalArgumentException("Account request with ID " + id + " not found.");
        }

        AccountRequest request = optionalRequest.get();

        request.setStatus(AccountRequest.Status.APPROVED);
        accountRequestRepo.save(request);

        BankAccount newAccount = new BankAccount();
        newAccount.setUser(request.getUser());
        newAccount.setAccountNumber(generateAccountNumber());
        newAccount.setBalance(BigDecimal.ZERO);
        newAccount.setAccountType(request.getRequestedType());
        newAccount.setApproval(true);
        newAccount.setPan(request.getPan());
        newAccount.setIfscCode(request.getIfscCode());

        Branch branch = branchRepository.findByBranchName(request.getBranch())
                .orElseThrow(() -> new IllegalArgumentException("Branch not found: " + request.getBranch()));
        newAccount.setBranch(branch);
        bankAccountRepo.save(newAccount);
        return convertBankAccountDTO(newAccount);
    }

    private String generateAccountNumber() {
        return String.valueOf(100000000000L + (long) (Math.random() * 899999999999L));
    }

    public BankAccountDTO getBankAccountDetail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Users user = userRepository.findByEmail(username);
        if (user == null) {
            throw new RuntimeException("User not found with email: " + username);
        }

        BankAccount bankAccount = bankAccountRepo.findByUser(user);
        if (bankAccount == null) {
            throw new RuntimeException("No bank account found for user: " + user.getId());
        }

        if (bankAccount.getUser().getId().equals(user.getId())) {
            return convertBankAccountDTO(bankAccount);
        } else {
            throw new RuntimeException("Bank account does not belong to the authenticated user");
        }
    }


    public BankAccountDTO convertBankAccountDTO(BankAccount account) {
        return new BankAccountDTO(
                account.getId(),
                account.getAccountNumber(),
                account.getAccountType().name(),
                account.getBalance(),
                account.isApproval(),
                account.getIfscCode(),
                account.getPan(),
                account.getBranch().getBranchName(),
                account.getUser().getId(),
                account.getUser().getName(),
                account.getUser().getEmail(),
                account.getUser().getStatus()
        );
    }

}
