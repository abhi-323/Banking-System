package com.banking.backend.repository;

import com.banking.backend.models.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface LoanApplicationRepo extends JpaRepository<LoanApplication, UUID> {
    // Add custom query methods if needed
}