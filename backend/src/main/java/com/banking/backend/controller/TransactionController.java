package com.banking.backend.controller;

import com.banking.backend.models.Transactions;
import com.banking.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/user/transaction")
public class TransactionController {
    @Autowired
    TransactionService transactionService;

    @PostMapping("/pay")
    public ResponseEntity<?> addTransaction(@RequestBody Transactions transaction) {
        return transactionService.makeTransactionRequest(transaction);
    }
}
