package de.tim.incomecalculator.service;

import de.tim.incomecalculator.domain.AccountCollection;
import de.tim.incomecalculator.repository.AccountCollectionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing AccountCollection.
 */
@Service
@Transactional
public class AccountCollectionService {

    private final Logger log = LoggerFactory.getLogger(AccountCollectionService.class);

    private final AccountCollectionRepository accountCollectionRepository;

    public AccountCollectionService(AccountCollectionRepository accountCollectionRepository) {
        this.accountCollectionRepository = accountCollectionRepository;
    }

    /**
     * Save a accountCollection.
     *
     * @param accountCollection the entity to save
     * @return the persisted entity
     */
    public AccountCollection save(AccountCollection accountCollection) {
        log.debug("Request to save AccountCollection : {}", accountCollection);
        return accountCollectionRepository.save(accountCollection);
    }

    /**
     * Get all the accountCollections.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<AccountCollection> findAll(Pageable pageable) {
        log.debug("Request to get all AccountCollections");

        Page<AccountCollection> all = accountCollectionRepository.findAll(pageable);
        return all;
    }

    /**
     * Get one accountCollection by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public AccountCollection findOne(Long id) {
        log.debug("Request to get AccountCollection : {}", id);
        return accountCollectionRepository.findOne(id);
    }

    /**
     * Delete the accountCollection by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete AccountCollection : {}", id);
        accountCollectionRepository.delete(id);
    }
}
