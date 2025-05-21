package com.banking.backend.repository;

import com.banking.backend.models.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface TransactionsRepo extends JpaRepository<Transactions, UUID> {

}
