package com.banking.backend.service;

import com.banking.backend.DTO.TransactionDTO;
import com.banking.backend.models.BankAccount;
import com.banking.backend.models.Transactions;
import com.banking.backend.models.Users;
import com.banking.backend.repository.BankAccountRepo;
import com.banking.backend.repository.TransactionsRepo;
import com.banking.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionsRepo transactionsRepo;

    @Autowired
    private BankAccountRepo bankAccountRepo;

    @Autowired
    UserRepository userRepository;

    public ResponseEntity<?> makeTransactionRequest(TransactionDTO request) {
        BankAccount sender = bankAccountRepo.findBankAccountByAccountNumber(request.getFromAccount());
        BankAccount receiver = bankAccountRepo.findBankAccountByAccountNumber(request.getToAccount());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Users user = userRepository.findByEmail(username);

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
        txn.setUser(user);
        txn.setFromAccount(sender);
        txn.setToAccount(receiver);
        txn.setAmount(request.getAmount());
        txn.setType(Transactions.TransactionType.TRANSFER);
        txn.setStatus(Transactions.TransactionStatus.COMPLETED);
        txn.setCreatedAt(LocalDateTime.now());
        transactionsRepo.save(txn);

        return ResponseEntity.ok("Transaction completed successfully.");
    }

    public ResponseEntity<List<TransactionDTO>> getAllTransactions() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Users user = userRepository.findByEmail(username);

        List<Transactions> transactions = transactionsRepo.findAllByUser(user);

        List<TransactionDTO> dtoList = transactions.stream()
                .map(this::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }

    public TransactionDTO toDto(Transactions tx) {
        TransactionDTO dto = new TransactionDTO();
        dto.setId(tx.getId());
        dto.setType(tx.getType().toString()); // assuming `type` is an enum
        dto.setAmount(tx.getAmount());
        dto.setCreatedAt(tx.getCreatedAt());

        // Assuming your Transactions entity has these relationships:
        dto.setFromAccount(tx.getFromAccount() != null ? tx.getFromAccount().getAccountNumber() : null);
        dto.setToAccount(tx.getToAccount() != null ? tx.getToAccount().getAccountNumber() : null);

        return dto;
    }
}
