package de.tim.incomecalculator.service;

import de.tim.incomecalculator.IncomeCalculatorApp;
import de.tim.incomecalculator.domain.TransAccount;
import de.tim.incomecalculator.domain.Transaction;
import de.tim.incomecalculator.domain.User;
import de.tim.incomecalculator.domain.enumeration.TransactionType;
import de.tim.incomecalculator.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Created by timbo on 25.02.2018.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = IncomeCalculatorApp.class)
@Transactional
public class TransactionServiceIntTest {

    @Autowired
    private TransAccountService transAccountService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionService transactionService;

    public static Transaction generateTransactionByTransAccountAndType(TransAccount account, TransactionType type) {
        LocalDate date = LocalDate.of(2016, 5, 5);

        Transaction transaction = new Transaction();
        transaction.setDate(date);
        transaction.setValue(5.0);
        transaction.setTransAccount(account);
        transaction.setType(type);

        return transaction;
    }

    public static Transaction generateTransactionByTransAccountAndTypeAndLocalDate(TransAccount account, TransactionType type, LocalDate date) {
        Transaction transaction = new Transaction();
        transaction.setDate(date);
        transaction.setValue(5.0);
        transaction.setTransAccount(account);
        transaction.setType(type);

        return transaction;
    }

    public static Transaction generateTransactionByTransAccountAndLocalDate(TransAccount account, LocalDate date) {
        Transaction transaction = new Transaction();
        transaction.setDate(date);
        transaction.setValue(5.0);
        transaction.setTransAccount(account);
        transaction.setType(TransactionType.DAILY);

        return transaction;
    }

    @Test
    public void testFindTransactionsByType() {
        User user = UserServiceIntTest.generateUser();
        userRepository.saveAndFlush(user);

        TransAccount transAccount = new TransAccount();
        transAccount.setUser(user);
        transAccountService.save(transAccount);

        Transaction transaction = generateTransactionByTransAccountAndType(transAccount,TransactionType.DAILY);
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndType(transAccount,TransactionType.DAILY);
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndType(transAccount,TransactionType.MONTHLY);
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndType(transAccount,TransactionType.ONCE);
        transactionService.save(transaction);

        List<Transaction> transactions = transactionService.findByTransAccountAndType(transAccount.getId(), TransactionType.DAILY);
        assertThat(transactions.size()).isEqualTo(2);

        transactions = transactionService.findByTransAccountAndType(transAccount.getId(), TransactionType.MONTHLY);
        assertThat(transactions.size()).isEqualTo(1);

        transactions = transactionService.findByTransAccountAndType(transAccount.getId(), TransactionType.ONCE);
        assertThat(transactions.size()).isEqualTo(1);

        transactions = transactionService.findByTransAccountAndType(transAccount.getId(), TransactionType.YEARLY);
        assertThat(transactions.size()).isEqualTo(0);
    }

    @Test
    public void testFindTransactionsByTypeIsNot() {
        User user = UserServiceIntTest.generateUser();
        userRepository.saveAndFlush(user);

        TransAccount transAccount = new TransAccount();
        transAccount.setUser(user);
        transAccountService.save(transAccount);

        Transaction transaction = generateTransactionByTransAccountAndType(transAccount,TransactionType.DAILY);
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndType(transAccount,TransactionType.DAILY);
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndType(transAccount,TransactionType.MONTHLY);
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndType(transAccount,TransactionType.ONCE);
        transactionService.save(transaction);

        List<Transaction> transactions = transactionService.findByTransAccountAndTypeIsNot(transAccount.getId(), TransactionType.DAILY);
        assertThat(transactions.size()).isEqualTo(2);

        transactions = transactionService.findByTransAccountAndTypeIsNot(transAccount.getId(), TransactionType.MONTHLY);
        assertThat(transactions.size()).isEqualTo(3);

        transactions = transactionService.findByTransAccountAndTypeIsNot(transAccount.getId(), TransactionType.ONCE);
        assertThat(transactions.size()).isEqualTo(3);

        transactions = transactionService.findByTransAccountAndTypeIsNot(transAccount.getId(), TransactionType.YEARLY);
        assertThat(transactions.size()).isEqualTo(4);
    }

    @Test
    public void testFindTransactionsByYear() {
        User user = UserServiceIntTest.generateUser();
        userRepository.saveAndFlush(user);

        TransAccount transAccount = new TransAccount();
        transAccount.setUser(user);
        transAccountService.save(transAccount);

        Transaction transaction = generateTransactionByTransAccountAndLocalDate(transAccount,LocalDate.of(2016,5,10));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndLocalDate(transAccount,LocalDate.of(2015,8,31));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndLocalDate(transAccount,LocalDate.of(2016,12,31));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndLocalDate(transAccount,LocalDate.of(2016,8,31));
        transactionService.save(transaction);

        List<Transaction> transactions = transactionService.findByTransAccountAndYear(transAccount.getId(), 2016);
        assertThat(transactions.size()).isEqualTo(3);

        transactions = transactionService.findByTransAccountAndYear(transAccount.getId(), 2015);
        assertThat(transactions.size()).isEqualTo(1);

        transactions = transactionService.findByTransAccountAndYear(transAccount.getId(), 2018);
        assertThat(transactions.size()).isEqualTo(0);
    }

    @Test
    public void testFindTransactionsByYearAndMonth() {
        User user = UserServiceIntTest.generateUser();
        userRepository.saveAndFlush(user);

        TransAccount transAccount = new TransAccount();
        transAccount.setUser(user);
        transAccountService.save(transAccount);

        Transaction transaction = generateTransactionByTransAccountAndLocalDate(transAccount,LocalDate.of(2016,5,10));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndLocalDate(transAccount,LocalDate.of(2015,8,31));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndLocalDate(transAccount,LocalDate.of(2016,5,31));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndLocalDate(transAccount,LocalDate.of(2016,8,31));
        transactionService.save(transaction);

        List<Transaction> transactions = transactionService.findByTransAccountAndYearAndMonth(transAccount.getId(), 2016,5);
        assertThat(transactions.size()).isEqualTo(2);

        transactions = transactionService.findByTransAccountAndYearAndMonth(transAccount.getId(), 2015,8);
        assertThat(transactions.size()).isEqualTo(1);

        transactions = transactionService.findByTransAccountAndYearAndMonth(transAccount.getId(), 2018,9);
        assertThat(transactions.size()).isEqualTo(0);
    }

    @Test
    public void testFindTransactionsByYearAndMonthAndType() {
        User user = UserServiceIntTest.generateUser();
        userRepository.saveAndFlush(user);

        TransAccount transAccount = new TransAccount();
        transAccount.setUser(user);
        transAccountService.save(transAccount);

        Transaction transaction = generateTransactionByTransAccountAndTypeAndLocalDate(transAccount,TransactionType.ONCE,LocalDate.of(2016,5,10));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndTypeAndLocalDate(transAccount,TransactionType.MONTHLY,LocalDate.of(2016,5,10));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndTypeAndLocalDate(transAccount,TransactionType.ONCE,LocalDate.of(2016,5,5));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndTypeAndLocalDate(transAccount,TransactionType.YEARLY,LocalDate.of(2016,5,28));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndTypeAndLocalDate(transAccount,TransactionType.ONCE,LocalDate.of(2016,12,10));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndTypeAndLocalDate(transAccount,TransactionType.ONCE,LocalDate.of(2017,5,10));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndTypeAndLocalDate(transAccount,TransactionType.MONTHLY,LocalDate.of(2015,1,1));
        transactionService.save(transaction);

        List<Transaction> transactions = transactionService.findByTransAccountAndYearAndMonthAndType(transAccount.getId(), 2016,5,TransactionType.ONCE);
        assertThat(transactions.size()).isEqualTo(2);

        transactions = transactionService.findByTransAccountAndYearAndMonthAndType(transAccount.getId(), 2017,5,TransactionType.ONCE);
        assertThat(transactions.size()).isEqualTo(1);

        transactions = transactionService.findByTransAccountAndYearAndMonthAndType(transAccount.getId(), 2016,5,TransactionType.MONTHLY);
        assertThat(transactions.size()).isEqualTo(1);

        transactions = transactionService.findByTransAccountAndYearAndMonthAndType(transAccount.getId(), 2017,4,TransactionType.MONTHLY);
        assertThat(transactions.size()).isEqualTo(0);

        transactions = transactionService.findByTransAccountAndYearAndMonthAndType(transAccount.getId(), 2017,5,TransactionType.MONTHLY);
        assertThat(transactions.size()).isEqualTo(0);

        transactions = transactionService.findByTransAccountAndYearAndMonthAndTypeIsNot(transAccount.getId(), 2016,5,TransactionType.MONTHLY);
        assertThat(transactions.size()).isEqualTo(3);
    }

    @Test
    public void testGetCurrentBalanceOfAccount() {
        User user = UserServiceIntTest.generateUser();
        userRepository.saveAndFlush(user);

        TransAccount transAccount = new TransAccount();
        transAccount.setUser(user);
        transAccountService.save(transAccount);

        Transaction transaction = generateTransactionByTransAccountAndTypeAndLocalDate(transAccount,TransactionType.ONCE,LocalDate.of(2016,5,10));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndTypeAndLocalDate(transAccount,TransactionType.MONTHLY,LocalDate.of(2016,5,10));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndTypeAndLocalDate(transAccount,TransactionType.ONCE,LocalDate.of(2016,5,5));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndTypeAndLocalDate(transAccount,TransactionType.YEARLY,LocalDate.of(2016,5,28));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndTypeAndLocalDate(transAccount,TransactionType.ONCE,LocalDate.of(2016,12,10));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndTypeAndLocalDate(transAccount,TransactionType.ONCE,LocalDate.of(2017,5,10));
        transactionService.save(transaction);
        transaction = generateTransactionByTransAccountAndTypeAndLocalDate(transAccount,TransactionType.MONTHLY,LocalDate.of(2015,1,1));
        transactionService.save(transaction);

        double balance = transactionService.getBalanceOfYearAndMonthByTransAccount(transAccount.getId(),2016,5);
        assertThat(balance).isEqualTo(10.0);

    }
}
