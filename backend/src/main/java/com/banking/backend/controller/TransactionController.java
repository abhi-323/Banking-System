package com.banking.backend.controller;

import com.banking.backend.DTO.TransactionDTO;
import com.banking.backend.models.Transactions;
import com.banking.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/user/transaction")
public class TransactionController {
    @Autowired
    TransactionService transactionService;

    @PostMapping("/pay")
    public ResponseEntity<?> addTransaction(@RequestBody TransactionDTO transaction) {
        return  ResponseEntity.ok(transactionService.makeTransactionRequest(transaction));
    }

    @GetMapping("history")
    public ResponseEntity<List<Transactions>> getAllTransactions() {
        List<Transactions> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }
}
