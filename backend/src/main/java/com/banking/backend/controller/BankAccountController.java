package com.banking.backend.controller;

import com.banking.backend.DTO.BankAccountDTO;
import com.banking.backend.models.BankAccount;
import com.banking.backend.DTO.IdRequest;
import com.banking.backend.service.BankAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/bankAccount")
public class BankAccountController {

    @Autowired
    private BankAccountService bankAccountService;


    @PostMapping("/create-approve")
    public ResponseEntity<?> createBankAccount(@RequestBody IdRequest request) {
        UUID id = request.getId();
        BankAccountDTO createdAccount = bankAccountService.approveCreateBankAccount(id);
        return ResponseEntity.ok(createdAccount);
    }

    @GetMapping("/getAccountDetail")
    public ResponseEntity<?> getBankAccountById() {
        try {
            BankAccount account = bankAccountService.getBankAccountDetail();
            return ResponseEntity.ok(account);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body("Bank account not found: " + ex.getMessage());
        }
    }
}
