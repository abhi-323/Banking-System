package com.banking.backend.controller;

import com.banking.backend.models.AccountRequest;
import com.banking.backend.service.AccountRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/accountRequest")
public class AccountRequestController {
    @Autowired
    AccountRequestService accountRequestService;

    @PostMapping("/apply")
    ResponseEntity<?> applyAccount(@RequestBody AccountRequest accountRequest) {
        accountRequestService.applyAccountRequest(accountRequest);
        return ResponseEntity.ok().build();
    }

}
