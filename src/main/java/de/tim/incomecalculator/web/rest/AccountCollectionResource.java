package de.tim.incomecalculator.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.tim.incomecalculator.domain.AccountCollection;
import de.tim.incomecalculator.service.AccountCollectionService;
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

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AccountCollection.
 */
@RestController
@RequestMapping("/api")
public class AccountCollectionResource {

    private final Logger log = LoggerFactory.getLogger(AccountCollectionResource.class);

    private static final String ENTITY_NAME = "accountCollection";

    private final AccountCollectionService accountCollectionService;

    public AccountCollectionResource(AccountCollectionService accountCollectionService) {
        this.accountCollectionService = accountCollectionService;
    }

    /**
     * POST  /account-collections : Create a new accountCollection.
     *
     * @param accountCollection the accountCollection to create
     * @return the ResponseEntity with status 201 (Created) and with body the new accountCollection, or with status 400 (Bad Request) if the accountCollection has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/account-collections")
    @Timed
    public ResponseEntity<AccountCollection> createAccountCollection(@RequestBody AccountCollection accountCollection) throws URISyntaxException {
        log.debug("REST request to save AccountCollection : {}", accountCollection);
        if (accountCollection.getId() != null) {
            throw new BadRequestAlertException("A new accountCollection cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AccountCollection result = accountCollectionService.save(accountCollection);
        return ResponseEntity.created(new URI("/api/account-collections/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /account-collections : Updates an existing accountCollection.
     *
     * @param accountCollection the accountCollection to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated accountCollection,
     * or with status 400 (Bad Request) if the accountCollection is not valid,
     * or with status 500 (Internal Server Error) if the accountCollection couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/account-collections")
    @Timed
    public ResponseEntity<AccountCollection> updateAccountCollection(@RequestBody AccountCollection accountCollection) throws URISyntaxException {
        log.debug("REST request to update AccountCollection : {}", accountCollection);
        if (accountCollection.getId() == null) {
            return createAccountCollection(accountCollection);
        }
        AccountCollection result = accountCollectionService.save(accountCollection);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, accountCollection.getId().toString()))
            .body(result);
    }

    /**
     * GET  /account-collections : get all the accountCollections.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of accountCollections in body
     */
    @GetMapping("/account-collections")
    @Timed
    public ResponseEntity<List<AccountCollection>> getAllAccountCollections(Pageable pageable) {
        log.debug("REST request to get a page of AccountCollections");
        Page<AccountCollection> page = accountCollectionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/account-collections");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /account-collections/:id : get the "id" accountCollection.
     *
     * @param id the id of the accountCollection to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the accountCollection, or with status 404 (Not Found)
     */
    @GetMapping("/account-collections/{id}")
    @Timed
    public ResponseEntity<AccountCollection> getAccountCollection(@PathVariable Long id) {
        log.debug("REST request to get AccountCollection : {}", id);
        AccountCollection accountCollection = accountCollectionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(accountCollection));
    }

    /**
     * DELETE  /account-collections/:id : delete the "id" accountCollection.
     *
     * @param id the id of the accountCollection to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/account-collections/{id}")
    @Timed
    public ResponseEntity<Void> deleteAccountCollection(@PathVariable Long id) {
        log.debug("REST request to delete AccountCollection : {}", id);
        accountCollectionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
