package de.tim.incomecalculator.repository;

import de.tim.incomecalculator.domain.TransAccount;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the TransAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransAccountRepository extends JpaRepository<TransAccount, Long> {
    List<TransAccount> findByAccountCollection_Id(Long id);

    TransAccount findByUser_Id(Long id);
}
