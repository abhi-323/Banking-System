package com.banking.backend.repository;

import com.banking.backend.models.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BankAccountRepo extends JpaRepository<BankAccount, UUID> {

}
