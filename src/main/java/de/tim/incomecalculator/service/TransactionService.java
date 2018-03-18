package de.tim.incomecalculator.service;

import de.tim.incomecalculator.domain.TransAccount;
import de.tim.incomecalculator.domain.Transaction;
import de.tim.incomecalculator.domain.enumeration.TransactionType;
import de.tim.incomecalculator.repository.TransactionRepository;
import org.checkerframework.checker.units.qual.A;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;


/**
 * Service Implementation for managing Transaction.
 */
@Service
@Transactional
public class TransactionService {

    private final Logger log = LoggerFactory.getLogger(TransactionService.class);

    private final TransAccountService transAccountService;

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository, TransAccountService transAccountService) {
        this.transactionRepository = transactionRepository;
        this.transAccountService = transAccountService;
    }

    /**
     * Save a transaction.
     *
     * @param transaction the entity to save
     * @return the persisted entity
     */
    public Transaction save(Transaction transaction) {
        log.debug("Request to save Transaction : {}", transaction);
        return transactionRepository.save(transaction);
    }

    /**
     * Get all the transactions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Transaction> findAll(Pageable pageable) {
        log.debug("Request to get all Transactions");
        return transactionRepository.findAll(pageable);
    }

    /**
     * Get one transaction by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Transaction findOne(Long id) {
        log.debug("Request to get Transaction : {}", id);
        return transactionRepository.findOne(id);
    }

    /**
     * Delete the transaction by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Transaction : {}", id);
        transactionRepository.delete(id);
    }

    /**
     * Get all the transactions.
     *
     * @param pageable       the pagination information
     * @param transAccountId the transAccount id
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Transaction> findByTransAccount(Pageable pageable, Long transAccountId) {
        log.debug("Request to get all Transactions");
        return transactionRepository.findByTransAccount_Id(pageable, transAccountId);
    }

    /**
     * Get all the transactions of given type.
     *
     * @param transAccountId the transAccount id
     * @param type           the transaction type
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Transaction> findByTransAccountAndType(Long transAccountId, TransactionType type) {
        log.debug("Request to get all Transactions by type: {}", type);
        return transactionRepository.findByTransAccount_IdAndType(transAccountId, type);
    }

    /**
     * Get all the transactions which are not of given type.
     *
     * @param transAccountId the transAccount id
     * @param type           the transaction type
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Transaction> findByTransAccountAndTypeIsNot(Long transAccountId, TransactionType type) {
        log.debug("Request to get all Transactions by not type: {}", type);
        return transactionRepository.findByTransAccount_IdAndTypeIsNot(transAccountId, type);
    }

    /**
     * Get all the transactions of given year.
     *
     * @param transAccountId the transAccount id
     * @param year           the year
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Transaction> findByTransAccountAndYear(Long transAccountId, int year) {
        log.debug("Request to get all Transactions of year {}", year);

        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year, 12, 31);
        return transactionRepository.findByTransAccount_IdAndDateBetween(transAccountId, startDate, endDate);
    }

    /**
     * Get all the transactions of given year and month.
     *
     * @param transAccountId the transAccount id
     * @param year           the year
     * @param month          the month
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Transaction> findByTransAccountAndYearAndMonth(Long transAccountId, int year, int month) {
        log.debug("Request to get all Transactions of year {} and month {}", year, month);

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = LocalDate.of(year, month, startDate.lengthOfMonth());
        return transactionRepository.findByTransAccount_IdAndDateBetween(transAccountId, startDate, endDate);
    }

    /**
     * Get all the transactions of given year, month and type.
     *
     * @param transAccountId the transAccount id
     * @param year           the year
     * @param month          the month
     * @param type           the transaction type
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Transaction> findByTransAccountAndYearAndMonthAndType(Long transAccountId, int year, int month, TransactionType type) {
        log.debug("Request to get all Transactions of year {} and month {}", year, month);

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = LocalDate.of(year, month, startDate.lengthOfMonth());
        return transactionRepository.findByTransAccount_IdAndDateBetweenAndType(transAccountId, startDate, endDate, type);
    }

    /**
     * Get all the transactions of given year and month which are not of given type.
     *
     * @param transAccountId the transAccount id
     * @param year           the year
     * @param month          the month
     * @param type           the transaction type
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Transaction> findByTransAccountAndYearAndMonthAndTypeIsNot(Long transAccountId, int year, int month, TransactionType type) {
        log.debug("Request to get all Transactions of year {} and month {}", year, month);

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = LocalDate.of(year, month, startDate.lengthOfMonth());
        return transactionRepository.findByTransAccount_IdAndDateBetweenAndTypeIsNot(transAccountId, startDate, endDate, type);
    }

    /**
     * Get the balance of the current month for given trans account.
     *
     * @param transAccountId the transAccount id
     * @return the balance
     */
    @Transactional(readOnly = true)
    public double getBalanceOfYearAndMonthByTransAccount(Long transAccountId, int year, int month) {
        log.debug("Request to get balance of current month for transAccount {}", transAccountId);

        List<Transaction> transactions = findByTransAccountAndYearAndMonthAndType(transAccountId,year,month,TransactionType.ONCE);
        double balance = 0.0;

        for(Transaction transaction : transactions) {
            balance = balance + transaction.getValue();
        }
        return Math.round(balance * 100d)/100d;
    }

    public boolean generateTransactionsForAccount(Long transAccountId ,int year, int month){
        TransAccount transAccount = transAccountService.findOne(transAccountId);


        List<Transaction> yearlyTransactions = findByTransAccountAndType(transAccountId,TransactionType.YEARLY);
        for (Transaction transaction : yearlyTransactions) {
            Transaction generatedTransaction = new Transaction();
            generatedTransaction.setType(TransactionType.ONCE);
            generatedTransaction.setCategory(transaction.getCategory());
            generatedTransaction.setDescription(transaction.getDescription());
            generatedTransaction.setDate(LocalDate.of(year,month,1));
            generatedTransaction.setValue(transaction.getValue()/12.0);
            generatedTransaction.setTransAccount(transAccount);
            save(generatedTransaction);
        }


        List<Transaction> monthlyTransactions = findByTransAccountAndType(transAccountId,TransactionType.MONTHLY);
        for (Transaction transaction : monthlyTransactions) {
            Transaction generatedTransaction = new Transaction();
            generatedTransaction.setType(TransactionType.ONCE);
            generatedTransaction.setCategory(transaction.getCategory());
            generatedTransaction.setDescription(transaction.getDescription());
            generatedTransaction.setDate(LocalDate.of(year,month,1));
            generatedTransaction.setValue(transaction.getValue());
            generatedTransaction.setTransAccount(transAccount);
            save(generatedTransaction);
        }

        List<Transaction> dailyTransactions = findByTransAccountAndType(transAccountId,TransactionType.DAILY);

        LocalDate date = LocalDate.of(year, month, 1);
        for (Transaction transaction : dailyTransactions) {
            Transaction generatedTransaction = new Transaction();
            generatedTransaction.setType(TransactionType.ONCE);
            generatedTransaction.setCategory(transaction.getCategory());
            generatedTransaction.setDescription(transaction.getDescription());
            generatedTransaction.setDate(date);
            generatedTransaction.setValue(transaction.getValue()*date.lengthOfMonth());
            generatedTransaction.setTransAccount(transAccount);
            save(generatedTransaction);
        }

        return true;
    }
}
