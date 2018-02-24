package de.tim.incomecalculator.repository;

import de.tim.incomecalculator.domain.AccountCollection;
import de.tim.incomecalculator.domain.TransAccount;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the AccountCollection entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountCollectionRepository extends JpaRepository<AccountCollection, Long> {

}
