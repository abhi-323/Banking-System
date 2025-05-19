package com.banking.backend.service;

import com.banking.backend.models.LoanApplication;
import com.banking.backend.models.Users;
import com.banking.backend.repository.LoanApplicationRepo;
import com.banking.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;
import java.util.UUID;

@Service
public class LoanApplicationService {
    @Autowired
    LoanApplicationRepo loanApplicationRepo;
    @Autowired
    UserRepository userRepository;

    public void saveLoanApplication(LoanApplication loanApplication) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Users user=userRepository.findByEmail(username);
        loanApplication.setUser(user);
        loanApplicationRepo.save(loanApplication);
    }

    public LoanApplication getLoanApplicationById(UUID id) {
        LoanApplication loanApplication = loanApplicationRepo.findById(id).orElseThrow(() -> new RuntimeException("Loan application not found"));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Users user=userRepository.findByEmail(username);
        System.out.println("------------> Loan Applicaiton -----------> " + loanApplication);
        if (loanApplication.getUser().getId() == user.getId()) {
            return loanApplication;
        } else {
            throw new RuntimeException("You are not authorized to view this loan application");
        }
    }
}
