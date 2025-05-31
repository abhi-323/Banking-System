package com.banking.backend.controller;

import com.banking.backend.DTO.IdRequest;
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
    public ResponseEntity<?> applyAccount(@RequestBody AccountRequest accountRequest) {
        return ResponseEntity.ok(accountRequestService.applyAccountRequest(accountRequest));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<AccountRequest>> getAllAccountRequests() {
        List<AccountRequest> requests = accountRequestService.getAllAccountRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/getByUser")
    public ResponseEntity<?> getAccountRequestByUser() {
        try {
            List<AccountRequest> accountRequests = accountRequestService.getAccountRequestByUser();
            return ResponseEntity.ok(accountRequests);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body("Account request not found: " + ex.getMessage());
        }
    }

    @PostMapping("/reject")
    public ResponseEntity<?> rejectAccountRequest(@RequestBody IdRequest idRequest) {
        try {
            accountRequestService.rejectAccountRequest(idRequest.getId());
            return ResponseEntity.ok("Account Request rejected successfully");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body("Error rejecting account request: " + ex.getMessage());
        }
    }

}
