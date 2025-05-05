package com.banking.backend.service;

import com.banking.backend.models.AccountRequest;
import com.banking.backend.models.Users;
import com.banking.backend.repository.AccountRequestRepo;
import com.banking.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AccountRequestService {
    @Autowired
    AccountRequestRepo accountRequestRepo;
    @Autowired
    UserRepository userRepository;

    public void applyAccountRequest(AccountRequest accountRequest) {
        UUID userId = accountRequest.getUser().getId();
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        accountRequest.setUser(user);
        accountRequestRepo.save(accountRequest);
    }
}
