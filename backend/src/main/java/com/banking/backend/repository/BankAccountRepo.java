package com.banking.backend.repository;

import com.banking.backend.models.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.UUID;

public interface BankAccountRepo extends JpaRepository<BankAccount, UUID> {
       BankAccount findBankAccountByAccountNumber(String accountNumber);
       @Query("SELECT SUM(b.balance) FROM BankAccount b WHERE b.branch.ifscCode = :ifscCode")
       BigDecimal getTotalBalanceByIfscCode(@Param("ifscCode") String ifscCode);

}
