package com.banking.backend.service;

import com.banking.backend.models.AccountRequest;
import com.banking.backend.models.Users;
import com.banking.backend.repository.AccountRequestRepo;
import com.banking.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AccountRequestService {
    @Autowired
    AccountRequestRepo accountRequestRepo;
    @Autowired
    UserRepository userRepository;


    public AccountRequest applyAccountRequest(AccountRequest accountRequest) {
        System.out.println();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Users user=userRepository.findByEmail(username);
        accountRequest.setUser(user);
        return  accountRequestRepo.save(accountRequest);
    }

    public List<AccountRequest> getAllAccountRequests() {
        return accountRequestRepo.findAll();
    }
}
