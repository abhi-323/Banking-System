package com.banking.backend.controller;

import com.banking.backend.DTO.IdRequest;
import com.banking.backend.models.LoanAccount;
import com.banking.backend.service.LoanAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loanAccount")
public class LoanAccountController {

    @Autowired
    private LoanAccountService loanAccountService;

    @PostMapping("/approve")
    public ResponseEntity<?> approveLoanAccount(@RequestBody IdRequest request) {
        try {
            LoanAccount loanAccount = loanAccountService.approveLoanApplication(request.getId());
            return ResponseEntity.ok(loanAccount);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body("Loan approval failed: " + ex.getMessage());
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllLoanAccountsForUser() {
        try {
            List<LoanAccount> loanAccounts = loanAccountService.getLoanAccountsForCurrentUser();
            return ResponseEntity.ok(loanAccounts);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body("No loan accounts found: " + ex.getMessage());
        }
    }
}
