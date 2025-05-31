package com.banking.backend.service;

import com.banking.backend.models.LoanAccount;
import com.banking.backend.models.LoanApplication;
import com.banking.backend.models.Users;
import com.banking.backend.repository.LoanAccountRepo;
import com.banking.backend.repository.LoanApplicationRepo;
import com.banking.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LoanAccountService {

    @Autowired
    private LoanAccountRepo loanAccountRepo;

    @Autowired
    private LoanApplicationRepo loanApplicationRepo;

    @Autowired
    private UserRepository userRepository;

    /**
     * Approves a loan application and creates a loan account.
     */
    public LoanAccount approveLoanApplication(UUID applicationId) {
        Optional<LoanApplication> optionalApplication = loanApplicationRepo.findById(applicationId);

        if (optionalApplication.isEmpty()) {
            throw new IllegalArgumentException("Loan application not found with ID: " + applicationId);
        }

        LoanApplication application = optionalApplication.get();

        if (application.getStatus() != LoanApplication.ApplicationStatus.PENDING) {
            throw new IllegalStateException("Loan application is not in a PENDING state.");
        }

        application.setStatus(LoanApplication.ApplicationStatus.APPROVED);
        loanApplicationRepo.save(application);

        LoanAccount loanAccount = new LoanAccount();
        loanAccount.setUser(application.getUser());
        loanAccount.setSanctionedAmount(application.getRequestedAmount());
        loanAccount.setInterestRate(application.getInterestRate());

        BigDecimal emi = calculateEMI(application.getRequestedAmount(), application.getInterestRate(), application.getTenureInMonths());
        loanAccount.setEmiAmount(emi);

        LocalDate startDate = LocalDate.now();
        loanAccount.setStartDate(startDate);
        loanAccount.setEndDate(startDate.plusMonths(application.getTenureInMonths()));

        loanAccount.setOutstandingAmount(application.getRequestedAmount());
        loanAccount.setStatus(LoanAccount.LoanStatus.ACTIVE);
        loanAccount.setPan(application.getPan());

        // Optional: generate a unique loan account number
        // loanAccount.setLoanAccountNumber(generateLoanAccountNumber());

        return loanAccountRepo.save(loanAccount);
    }

    /**
     * Generate a unique loan account number.
     */
    private String generateLoanAccountNumber() {
        return "LN" + (1000000000L + (long)(Math.random() * 8999999999L));
    }

    /**
     * Calculate EMI using the formula:
     * EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
     */
    private BigDecimal calculateEMI(BigDecimal principal, BigDecimal annualRate, int tenureMonths) {
        BigDecimal monthlyRate = annualRate.divide(BigDecimal.valueOf(12 * 100), 10, BigDecimal.ROUND_HALF_EVEN);

        if (monthlyRate.compareTo(BigDecimal.ZERO) == 0) {
            return principal.divide(BigDecimal.valueOf(tenureMonths), 2, BigDecimal.ROUND_HALF_EVEN);
        }

        BigDecimal onePlusRPowerN = monthlyRate.add(BigDecimal.ONE).pow(tenureMonths);
        BigDecimal numerator = principal.multiply(monthlyRate).multiply(onePlusRPowerN);
        BigDecimal denominator = onePlusRPowerN.subtract(BigDecimal.ONE);

        return numerator.divide(denominator, 2, BigDecimal.ROUND_HALF_EVEN);
    }

    /**
     * Get all loan accounts of the currently authenticated user.
     */
    public List<LoanAccount> getLoanAccountsForCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Users user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("Authenticated user not found.");
        }

        return loanAccountRepo.findByUser(user);
    }

    /**
     * Get a specific loan account by ID.
     */
    public LoanAccount getLoanAccountById(UUID id) {
        return loanAccountRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Loan account not found with ID: " + id));
    }

    /**
     * Close a loan account (e.g., after full repayment).
     */
    public void closeLoanAccount(UUID loanAccountId) {
        LoanAccount loanAccount = getLoanAccountById(loanAccountId);
        loanAccount.setStatus(LoanAccount.LoanStatus.CLOSED);
        loanAccount.setOutstandingAmount(BigDecimal.ZERO);
        loanAccountRepo.save(loanAccount);
    }
}
