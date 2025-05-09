package com.banking.backend.controller;

import com.banking.backend.models.AccountRequest;
import com.banking.backend.service.AccountRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accountRequest")
public class AccountRequestController {

    @Autowired
    AccountRequestService accountRequestService;

    @PostMapping("/apply")
    public AccountRequest applyAccount(@RequestBody AccountRequest accountRequest) {
        return accountRequestService.applyAccountRequest(accountRequest);
    }

    // ✅ New method to get all account requests
    @GetMapping("/getAll")
    public ResponseEntity<List<AccountRequest>> getAllAccountRequests() {
        List<AccountRequest> requests = accountRequestService.getAllAccountRequests();
        return ResponseEntity.ok(requests);
    }
}
