package com.banking.backend.service;

import com.banking.backend.models.Branch;
import com.banking.backend.models.Users;
import com.banking.backend.repository.BranchRepo;
import com.banking.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class BranchService {
    @Autowired
    BranchRepo branchRepo;
    @Autowired
    UserRepository userRepository;

    public ResponseEntity<?> branchDetail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Users user = userRepository.findByEmail(username);
        Optional<Branch> branch = branchRepo.findByManager(user);
        return ResponseEntity.ok(branch);
    }


}
