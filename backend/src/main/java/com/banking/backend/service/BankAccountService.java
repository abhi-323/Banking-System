package com.banking.backend.service;

import com.banking.backend.models.AccountRequest;
import com.banking.backend.models.BankAccount;
import com.banking.backend.DTO.BankAccountDTO;
import com.banking.backend.models.Branch;
import com.banking.backend.repository.AccountRequestRepo;
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

    @Autowired
    AccountRequestRepo accountRequestRepo;

    public BankAccountDTO approveCreateBankAccount(UUID id) {
        Optional<AccountRequest> optionalRequest = accountRequestRepo.findById(id);

        if (optionalRequest.isEmpty()) {
            throw new IllegalArgumentException("Account request with ID " + id + " not found.");
        }
        AccountRequest request = optionalRequest.get();
        BankAccount newAccount = new BankAccount();
        newAccount.setUser(request.getUser());
        newAccount.setAccountNumber(generateAccountNumber());
        newAccount.setBalance(BigDecimal.ZERO);
        newAccount.setAccountType(request.getRequestedType());
        newAccount.setApproval(true);
        newAccount.setPAN(request.getPAN());
        newAccount.setIfscCode(request.getIfscCode());

        Branch branch = branchRepository.findByBranchName(request.getBranch())
                .orElseThrow(() -> new IllegalArgumentException("Branch not found: " + request.getBranch()));
        newAccount.setBranch(branch);
        bankAccountRepo.save(newAccount);
        return convetBankAccountDTO(newAccount);
    }

    private String generateAccountNumber() {
        return String.valueOf(100000000000L + (long) (Math.random() * 899999999999L));
    }

    public BankAccount getBankAccountById(String id) {
        UUID uuid = UUID.fromString(id);
        return bankAccountRepo.findById(uuid)
                .orElseThrow(() -> new RuntimeException("No bank account with ID: " + id));
    }

    public BankAccountDTO convetBankAccountDTO(BankAccount account) {
        return new BankAccountDTO(
                account.getId(),
                account.getAccountNumber(),
                account.getAccountType().name(),
                account.getBalance(),
                account.isApproval(),
                account.getIfscCode(),
                account.getPAN(),
                account.getBranch().getBranchName(),
                account.getUser().getId()
        );
    }

}
