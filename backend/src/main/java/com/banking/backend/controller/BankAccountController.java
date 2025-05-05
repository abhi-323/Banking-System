package com.banking.backend.controller;

import com.banking.backend.models.BankAccount;
import com.banking.backend.service.BankAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bankAccount")
public class BankAccountController {
    @Autowired
    private BankAccountService bankAccountService;

    @PostMapping("/create")
    public ResponseEntity<?> createBankAccount(@RequestBody BankAccount bankAccount) {
        try {
            BankAccount createdAccount = bankAccountService.createBankAccount(bankAccount);
            return ResponseEntity.ok(createdAccount);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBankAccountById(@PathVariable("id") String id) {
        try {
            BankAccount account = bankAccountService.getBankAccountById(id);
            return ResponseEntity.ok(account);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body("Bank account not found: " + ex.getMessage());
        }
    }

}
