package com.banking.backend.repository;

import com.banking.backend.models.LoanAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LoanAccountRepo extends JpaRepository<LoanAccount, UUID> {
}
