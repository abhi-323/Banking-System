package com.banking.backend.repository;

import com.banking.backend.models.AccountRequest;
import com.banking.backend.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AccountRequestRepo extends JpaRepository<AccountRequest, UUID> {
    @Override
    Optional<AccountRequest> findById(UUID id);
    List<AccountRequest> findByUser(Users user);

}
