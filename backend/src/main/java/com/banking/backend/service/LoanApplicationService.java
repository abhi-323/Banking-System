package com.banking.backend.service;

import com.banking.backend.DTO.BankAccountDTO;
import com.banking.backend.DTO.LoanApplicationDTO;
import com.banking.backend.models.BankAccount;
import com.banking.backend.models.LoanApplication;
import com.banking.backend.models.Users;
import com.banking.backend.repository.LoanApplicationRepo;
import com.banking.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;
import java.util.List;
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

    public List<LoanApplicationDTO> getLoanApplicationById() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Users user = userRepository.findByEmail(username);
        List<LoanApplication> loanApplication = loanApplicationRepo.findByUser(user);
        System.out.println("------------> Loan Applicaiton -----------> " + loanApplication);

        if (loanApplication.isEmpty()) {
            throw new RuntimeException("No loan applications found for this user");
        }

        return loanApplication.stream()
                .map(this::convertLoanApplicationDTO)
                .toList();

    }

    public List<LoanApplicationDTO> getAllLoanApplications() {
        List<LoanApplication> loanApplications = loanApplicationRepo.findAll();
        return loanApplications.stream()
                .map(this::convertLoanApplicationDTO)
                .toList();
    }

    public LoanApplicationDTO convertLoanApplicationDTO(LoanApplication application) {
        return new LoanApplicationDTO(
                application.getId(),
                application.getRequestedAmount(),
                application.getInterestRate(),
                application.getTenureInMonths(),
                application.getStatus(),
                application.getApplicationDate(),
                application.getPan(),
                application.getUser().getId(),
                application.getUser().getName(),
                application.getUser().getEmail(),
                application.getUser().getStatus()
        );
    }
}
