package com.banking.backend.repository;

import com.banking.backend.models.AccountRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AccountRequestRepo extends JpaRepository<AccountRequest, UUID> {
    @Override
    Optional<AccountRequest> findById(UUID id);

}
