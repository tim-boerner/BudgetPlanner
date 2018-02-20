package de.tim.incomecalculator.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A AccountCollection.
 */
@Entity
@Table(name = "account_collection")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AccountCollection implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @OneToMany(mappedBy = "accountCollection")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TransAccount> transAccounts = new HashSet<>();

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

    public AccountCollection title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<TransAccount> getTransAccounts() {
        return transAccounts;
    }

    public AccountCollection transAccounts(Set<TransAccount> transAccounts) {
        this.transAccounts = transAccounts;
        return this;
    }

    public AccountCollection addTransAccount(TransAccount transAccount) {
        this.transAccounts.add(transAccount);
        transAccount.setAccountCollection(this);
        return this;
    }

    public AccountCollection removeTransAccount(TransAccount transAccount) {
        this.transAccounts.remove(transAccount);
        transAccount.setAccountCollection(null);
        return this;
    }

    public void setTransAccounts(Set<TransAccount> transAccounts) {
        this.transAccounts = transAccounts;
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
        AccountCollection accountCollection = (AccountCollection) o;
        if (accountCollection.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accountCollection.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AccountCollection{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
