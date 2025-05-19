package com.banking.backend.controller;

import com.banking.backend.models.LoanApplication;
import com.banking.backend.service.LoanApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/loanApplication")
public class LoanApplicationController {
    @Autowired
    LoanApplicationService loanApplicationService;

    @PostMapping("/apply")
    public ResponseEntity<?> applyLoan(@RequestBody LoanApplication loanApplication) {
        loanApplicationService.saveLoanApplication(loanApplication);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLoanApplication(@PathVariable UUID id) {
        try {
            LoanApplication loanApplication = loanApplicationService.getLoanApplicationById(id);
            return ResponseEntity.ok(loanApplication);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body("Loan application not found: " + ex.getMessage());
        }
    }
}
