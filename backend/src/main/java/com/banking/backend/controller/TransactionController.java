package com.banking.backend.controller;

import com.banking.backend.models.Transactions;
import com.banking.backend.repository.TransactionsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/user/transaction")
public class TransactionController {
    @Autowired
    TransactionsRepo transactionsRepo;

    @PostMapping
    public String addTransaction(@RequestBody Transactions transaction) {
        return "hello";
    }
}
