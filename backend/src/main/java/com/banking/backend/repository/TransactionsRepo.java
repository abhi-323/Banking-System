package com.banking.backend.repository;

import com.banking.backend.models.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TransactionsRepo extends JpaRepository<Transactions, UUID> {

}
