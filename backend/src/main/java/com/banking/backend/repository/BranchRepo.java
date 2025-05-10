package com.banking.backend.repository;

import com.banking.backend.models.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface BranchRepo extends JpaRepository<Branch, UUID> {
    Optional<Branch> findByBranchName(String branchName);
}
