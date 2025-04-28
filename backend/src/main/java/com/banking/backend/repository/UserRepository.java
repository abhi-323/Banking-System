package com.banking.backend.repository;

import com.banking.backend.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface UserRepository extends JpaRepository<Users, UUID> {
    Users findByEmail(String email);
}
