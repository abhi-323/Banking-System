package com.banking.backend.service;

import com.banking.backend.models.BankAccount;
import com.banking.backend.models.Branch;
import com.banking.backend.models.Users;
import com.banking.backend.repository.BankAccountRepo;
import com.banking.backend.repository.BranchRepo;
import com.banking.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;


@Service
public class BranchService {
    @Autowired
    BranchRepo branchRepo;
    @Autowired
    UserRepository userRepository;

    @Autowired
    BankAccountRepo bankAccountRepo;

    public ResponseEntity<?> branchDetail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Users user = userRepository.findByEmail(username);

        Optional<Branch> branch = branchRepo.findByManager(user);
        if (branch.isEmpty()) {
            return ResponseEntity.badRequest().body("Branch not found for this manager.");
        }

        String code = branch.get().getIfscCode();
        BigDecimal totalBalance = bankAccountRepo.getTotalBalanceByIfscCode(code);

        Map<String, Object> response = new HashMap<>();
        response.put("branch", branch.get());
        response.put("totalBalance", totalBalance);

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> getAllBranch() {
        List<Branch> branches = branchRepo.findAll();
        if (branches.isEmpty()) {
            return ResponseEntity.badRequest().body("No branches found.");
        }
        return ResponseEntity.ok(branches);
    }


}
