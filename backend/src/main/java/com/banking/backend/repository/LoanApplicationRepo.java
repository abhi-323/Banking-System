package com.banking.backend.repository;

import com.banking.backend.models.LoanAccount;
import com.banking.backend.models.LoanApplication;
import com.banking.backend.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LoanApplicationRepo extends JpaRepository<LoanApplication, UUID> {
    List<LoanApplication> findByUser(Users user);
}