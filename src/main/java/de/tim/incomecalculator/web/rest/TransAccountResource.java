package de.tim.incomecalculator.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.tim.incomecalculator.domain.TransAccount;
import de.tim.incomecalculator.service.TransAccountService;
import de.tim.incomecalculator.web.rest.errors.BadRequestAlertException;
import de.tim.incomecalculator.web.rest.util.HeaderUtil;
import de.tim.incomecalculator.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TransAccount.
 */
@RestController
@RequestMapping("/api")
public class TransAccountResource {

    private final Logger log = LoggerFactory.getLogger(TransAccountResource.class);

    private static final String ENTITY_NAME = "transAccount";

    private final TransAccountService transAccountService;

    public TransAccountResource(TransAccountService transAccountService) {
        this.transAccountService = transAccountService;
    }

    /**
     * POST  /trans-accounts : Create a new transAccount.
     *
     * @param transAccount the transAccount to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transAccount, or with status 400 (Bad Request) if the transAccount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/trans-accounts")
    @Timed
    public ResponseEntity<TransAccount> createTransAccount(@Valid @RequestBody TransAccount transAccount) throws URISyntaxException {
        log.debug("REST request to save TransAccount : {}", transAccount);
        if (transAccount.getId() != null) {
            throw new BadRequestAlertException("A new transAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransAccount result = transAccountService.save(transAccount);
        return ResponseEntity.created(new URI("/api/trans-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /trans-accounts : Updates an existing transAccount.
     *
     * @param transAccount the transAccount to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transAccount,
     * or with status 400 (Bad Request) if the transAccount is not valid,
     * or with status 500 (Internal Server Error) if the transAccount couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/trans-accounts")
    @Timed
    public ResponseEntity<TransAccount> updateTransAccount(@Valid @RequestBody TransAccount transAccount) throws URISyntaxException {
        log.debug("REST request to update TransAccount : {}", transAccount);
        if (transAccount.getId() == null) {
            return createTransAccount(transAccount);
        }
        TransAccount result = transAccountService.save(transAccount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transAccount.getId().toString()))
            .body(result);
    }

    /**
     * GET  /trans-accounts : get all the transAccounts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of transAccounts in body
     */
    @GetMapping("/trans-accounts")
    @Timed
    public ResponseEntity<List<TransAccount>> getAllTransAccounts(Pageable pageable) {
        log.debug("REST request to get a page of TransAccounts");
        Page<TransAccount> page = transAccountService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/trans-accounts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /trans-accounts/:id : get the "id" transAccount.
     *
     * @param id the id of the transAccount to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transAccount, or with status 404 (Not Found)
     */
    @GetMapping("/trans-accounts/{id}")
    @Timed
    public ResponseEntity<TransAccount> getTransAccount(@PathVariable Long id) {
        log.debug("REST request to get TransAccount : {}", id);
        TransAccount transAccount = transAccountService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(transAccount));
    }

    /**
     * GET  /trans-accounts/:id : get the "id" transAccount.
     *
     * @param id the id of the accountCollection to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transAccount, or with status 404 (Not Found)
     */
    @GetMapping("/trans-accounts/byAccColl/{id}")
    @Timed
    public ResponseEntity<List<TransAccount>> getTransAccountsByAccountCollection(@PathVariable Long id) {
        log.debug("REST request to get TransAccount by AccountCollection: {}", id);
        List<TransAccount> transAccounts = transAccountService.findByAccountCollection(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(transAccounts));
    }

    /**
     * DELETE  /trans-accounts/:id : delete the "id" transAccount.
     *
     * @param id the id of the transAccount to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/trans-accounts/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransAccount(@PathVariable Long id) {
        log.debug("REST request to delete TransAccount : {}", id);
        transAccountService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
