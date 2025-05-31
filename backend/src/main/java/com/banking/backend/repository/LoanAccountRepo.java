package com.banking.backend.repository;

import com.banking.backend.models.LoanAccount;
import com.banking.backend.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LoanAccountRepo extends JpaRepository<LoanAccount, UUID> {
    List<LoanAccount> findByUser(Users user);
}
