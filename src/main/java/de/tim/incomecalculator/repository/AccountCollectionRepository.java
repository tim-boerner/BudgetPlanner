package de.tim.incomecalculator.repository;

import de.tim.incomecalculator.domain.AccountCollection;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AccountCollection entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountCollectionRepository extends JpaRepository<AccountCollection, Long> {

}
