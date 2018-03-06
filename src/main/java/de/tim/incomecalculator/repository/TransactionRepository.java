package de.tim.incomecalculator.repository;

import de.tim.incomecalculator.domain.Transaction;
import de.tim.incomecalculator.domain.enumeration.TransactionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


/**
 * Spring Data JPA repository for the Transaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Page<Transaction> findByTransAccount_Id(Pageable pageable, Long id);

    List<Transaction> findByTransAccount_IdAndType(Long id, TransactionType type);

    List<Transaction> findByTransAccount_IdAndTypeIsNot(Long id, TransactionType type);

    List<Transaction> findByTransAccount_IdAndDateBetween(Long id, LocalDate start, LocalDate end);

    List<Transaction> findByTransAccount_IdAndDateBetweenAndType(Long id, LocalDate start, LocalDate end, TransactionType type);

    List<Transaction> findByTransAccount_IdAndDateBetweenAndTypeIsNot(Long id, LocalDate start, LocalDate end, TransactionType type);

    Page<Transaction> findByTransAccount_IdAndType(Pageable pageable, Long id, TransactionType type);

    Page<Transaction> findByTransAccount_IdAndTypeIsNot(Pageable pageable, Long id, TransactionType type);

    Page<Transaction> findByTransAccount_IdAndDateBetween(Pageable pageable, Long id, LocalDate start, LocalDate end);

    Page<Transaction> findByTransAccount_IdAndDateBetweenAndType(Pageable pageable, Long id, LocalDate start, LocalDate end, TransactionType type);

    Page<Transaction> findByTransAccount_IdAndDateBetweenAndTypeIsNot(Pageable pageable, Long id, LocalDate start, LocalDate end, TransactionType type);
}
