package de.tim.incomecalculator.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TransAccount.
 */
@Entity
@Table(name = "trans_account")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TransAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "transAccount")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Transaction> transactions = new HashSet<>();

    @ManyToOne
    private AccountCollection accountCollection;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public TransAccount title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public User getUser() {
        return user;
    }

    public TransAccount user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Transaction> getTransactions() {
        return transactions;
    }

    public TransAccount transactions(Set<Transaction> transactions) {
        this.transactions = transactions;
        return this;
    }

    public TransAccount addTransaction(Transaction transaction) {
        this.transactions.add(transaction);
        transaction.setTransAccount(this);
        return this;
    }

    public TransAccount removeTransaction(Transaction transaction) {
        this.transactions.remove(transaction);
        transaction.setTransAccount(null);
        return this;
    }

    public void setTransactions(Set<Transaction> transactions) {
        this.transactions = transactions;
    }

    public AccountCollection getAccountCollection() {
        return accountCollection;
    }

    public TransAccount accountCollection(AccountCollection accountCollection) {
        this.accountCollection = accountCollection;
        return this;
    }

    public void setAccountCollection(AccountCollection accountCollection) {
        this.accountCollection = accountCollection;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TransAccount transAccount = (TransAccount) o;
        if (transAccount.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transAccount.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransAccount{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
