package com.banking.backend.service;

import com.banking.backend.DTO.TransactionDTO;
import com.banking.backend.models.BankAccount;
import com.banking.backend.models.Transactions;
import com.banking.backend.repository.BankAccountRepo;
import com.banking.backend.repository.TransactionsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionsRepo transactionsRepo;

    @Autowired
    private BankAccountRepo bankAccountRepo;

    public ResponseEntity<?> makeTransactionRequest(TransactionDTO request) {
        BankAccount sender = bankAccountRepo.findBankAccountByAccountNumber(request.getFromAccount());
        BankAccount receiver = bankAccountRepo.findBankAccountByAccountNumber(request.getToAccount());
        System.out.println(sender.getAccountNumber());
        if (receiver == null) {
            return ResponseEntity.badRequest().body("Invalid sender or receiver account number.");
        }

        if (sender.getBalance().compareTo(request.getAmount()) < 0) {
            return ResponseEntity.badRequest().body("Insufficient balance.");
        }

        sender.setBalance(sender.getBalance().subtract(request.getAmount()));
        receiver.setBalance(receiver.getBalance().add(request.getAmount()));

        bankAccountRepo.save(sender);
        bankAccountRepo.save(receiver);

        Transactions txn = new Transactions();
        txn.setFromAccount(sender);
        txn.setToAccount(receiver);
        txn.setAmount(request.getAmount());
        txn.setType(Transactions.TransactionType.TRANSFER);
        txn.setStatus(Transactions.TransactionStatus.COMPLETED);
        txn.setCreatedAt(LocalDateTime.now());
        transactionsRepo.save(txn);
        return ResponseEntity.ok("Transaction completed successfully.");
    }

    public List<Transactions> getAllTransactions() {
        return transactionsRepo.findAll();
    }
}
