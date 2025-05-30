package com.banking.backend.controller;

import com.banking.backend.DTO.IdRequest;
import com.banking.backend.DTO.LoanApplicationDTO;
import com.banking.backend.models.LoanApplication;
import com.banking.backend.service.LoanApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/loanApplication")
public class LoanApplicationController {
    @Autowired
    LoanApplicationService loanApplicationService;

    @PostMapping("/apply")
    public ResponseEntity<?> applyLoan(@RequestBody LoanApplication loanApplication) {
        try {
            loanApplicationService.saveLoanApplication(loanApplication);
            return ResponseEntity.ok("Successfully applied for loan");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error applying for loan: " + e.getMessage());
        }
    }

    @GetMapping("/getByUser")
    public ResponseEntity<?> getLoanApplication() {
        try {
            List<LoanApplicationDTO> loanApplication = loanApplicationService.getLoanApplicationById();
            return ResponseEntity.ok(loanApplication);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body("Loan application not found: " + ex.getMessage());
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<LoanApplicationDTO>> getAllLoanApplications() {
        List<LoanApplicationDTO> loanApplications = loanApplicationService.getAllLoanApplications();
        return ResponseEntity.ok(loanApplications);
    }
}
