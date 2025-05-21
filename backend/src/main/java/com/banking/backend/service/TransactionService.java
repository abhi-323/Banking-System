package com.banking.backend.service;

import com.banking.backend.models.BankAccount;
import com.banking.backend.models.Transactions;
import com.banking.backend.repository.BankAccountRepo;
import com.banking.backend.repository.TransactionsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {
      @Autowired
      TransactionsRepo transactionsRepo;
      @Autowired
      BankAccountRepo bankAccountRepo;

      public ResponseEntity<?> makeTransactionRequest(Transactions paymentRequest){
            BankAccount sendersAcc=bankAccountRepo.findBankAccountByAccountNumber(String.valueOf(paymentRequest.getFromAccount()));
            BankAccount receiverAcc=bankAccountRepo.findBankAccountByAccountNumber(String.valueOf(paymentRequest.getToAccount()));

            if (sendersAcc == null || receiverAcc == null) {
                  return ResponseEntity.badRequest().body("Invalid sender or receiver account");
            }

            if (sendersAcc.getBalance().compareTo(paymentRequest.getAmount()) >= 0) {
                  sendersAcc.setBalance(sendersAcc.getBalance().subtract(paymentRequest.getAmount()));
                  receiverAcc.setBalance(receiverAcc.getBalance().add(paymentRequest.getAmount()));

                  bankAccountRepo.save(sendersAcc);
                  bankAccountRepo.save(receiverAcc);
                  transactionsRepo.save(paymentRequest);

                  return ResponseEntity.ok("Transaction Successfully Done");
            }

            return ResponseEntity.ok("Insufficient Balance");
      }
}
