package de.tim.incomecalculator.repository;

import de.tim.incomecalculator.domain.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.LocalDate;
import java.util.List;


/**
 * Spring Data JPA repository for the Transaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Page<Transaction> findByTransAccount_Id(Pageable pageable, Long id);
}
