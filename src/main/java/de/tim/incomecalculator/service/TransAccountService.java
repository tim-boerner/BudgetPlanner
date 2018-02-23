package de.tim.incomecalculator.service;

import de.tim.incomecalculator.domain.TransAccount;
import de.tim.incomecalculator.repository.TransAccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * Service Implementation for managing TransAccount.
 */
@Service
@Transactional
public class TransAccountService {

    private final Logger log = LoggerFactory.getLogger(TransAccountService.class);

    private final TransAccountRepository transAccountRepository;

    public TransAccountService(TransAccountRepository transAccountRepository) {
        this.transAccountRepository = transAccountRepository;
    }

    /**
     * Save a transAccount.
     *
     * @param transAccount the entity to save
     * @return the persisted entity
     */
    public TransAccount save(TransAccount transAccount) {
        log.debug("Request to save TransAccount : {}", transAccount);
        return transAccountRepository.save(transAccount);
    }

    /**
     * Get all the transAccounts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TransAccount> findAll(Pageable pageable) {
        log.debug("Request to get all TransAccounts");
        return transAccountRepository.findAll(pageable);
    }

    /**
     * Get one transAccount by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public TransAccount findOne(Long id) {
        log.debug("Request to get TransAccount : {}", id);
        return transAccountRepository.findOne(id);
    }

    /**
     * Delete the transAccount by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TransAccount : {}", id);
        transAccountRepository.delete(id);
    }

    public List<TransAccount> findByAccountCollection(Long id) {
        log.debug("Request to get TransAccounts of Account collection: {}", id);
        return transAccountRepository.findByAccountCollection_Id(id);
    }
}
