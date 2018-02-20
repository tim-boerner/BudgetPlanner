package de.tim.incomecalculator.web.rest;

import de.tim.incomecalculator.IncomeCalculatorApp;

import de.tim.incomecalculator.domain.AccountCollection;
import de.tim.incomecalculator.repository.AccountCollectionRepository;
import de.tim.incomecalculator.service.AccountCollectionService;
import de.tim.incomecalculator.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static de.tim.incomecalculator.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AccountCollectionResource REST controller.
 *
 * @see AccountCollectionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = IncomeCalculatorApp.class)
public class AccountCollectionResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    @Autowired
    private AccountCollectionRepository accountCollectionRepository;

    @Autowired
    private AccountCollectionService accountCollectionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAccountCollectionMockMvc;

    private AccountCollection accountCollection;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AccountCollectionResource accountCollectionResource = new AccountCollectionResource(accountCollectionService);
        this.restAccountCollectionMockMvc = MockMvcBuilders.standaloneSetup(accountCollectionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountCollection createEntity(EntityManager em) {
        AccountCollection accountCollection = new AccountCollection()
            .title(DEFAULT_TITLE);
        return accountCollection;
    }

    @Before
    public void initTest() {
        accountCollection = createEntity(em);
    }

    @Test
    @Transactional
    public void createAccountCollection() throws Exception {
        int databaseSizeBeforeCreate = accountCollectionRepository.findAll().size();

        // Create the AccountCollection
        restAccountCollectionMockMvc.perform(post("/api/account-collections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountCollection)))
            .andExpect(status().isCreated());

        // Validate the AccountCollection in the database
        List<AccountCollection> accountCollectionList = accountCollectionRepository.findAll();
        assertThat(accountCollectionList).hasSize(databaseSizeBeforeCreate + 1);
        AccountCollection testAccountCollection = accountCollectionList.get(accountCollectionList.size() - 1);
        assertThat(testAccountCollection.getTitle()).isEqualTo(DEFAULT_TITLE);
    }

    @Test
    @Transactional
    public void createAccountCollectionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = accountCollectionRepository.findAll().size();

        // Create the AccountCollection with an existing ID
        accountCollection.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountCollectionMockMvc.perform(post("/api/account-collections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountCollection)))
            .andExpect(status().isBadRequest());

        // Validate the AccountCollection in the database
        List<AccountCollection> accountCollectionList = accountCollectionRepository.findAll();
        assertThat(accountCollectionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAccountCollections() throws Exception {
        // Initialize the database
        accountCollectionRepository.saveAndFlush(accountCollection);

        // Get all the accountCollectionList
        restAccountCollectionMockMvc.perform(get("/api/account-collections?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accountCollection.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())));
    }

    @Test
    @Transactional
    public void getAccountCollection() throws Exception {
        // Initialize the database
        accountCollectionRepository.saveAndFlush(accountCollection);

        // Get the accountCollection
        restAccountCollectionMockMvc.perform(get("/api/account-collections/{id}", accountCollection.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(accountCollection.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAccountCollection() throws Exception {
        // Get the accountCollection
        restAccountCollectionMockMvc.perform(get("/api/account-collections/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAccountCollection() throws Exception {
        // Initialize the database
        accountCollectionService.save(accountCollection);

        int databaseSizeBeforeUpdate = accountCollectionRepository.findAll().size();

        // Update the accountCollection
        AccountCollection updatedAccountCollection = accountCollectionRepository.findOne(accountCollection.getId());
        // Disconnect from session so that the updates on updatedAccountCollection are not directly saved in db
        em.detach(updatedAccountCollection);
        updatedAccountCollection
            .title(UPDATED_TITLE);

        restAccountCollectionMockMvc.perform(put("/api/account-collections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAccountCollection)))
            .andExpect(status().isOk());

        // Validate the AccountCollection in the database
        List<AccountCollection> accountCollectionList = accountCollectionRepository.findAll();
        assertThat(accountCollectionList).hasSize(databaseSizeBeforeUpdate);
        AccountCollection testAccountCollection = accountCollectionList.get(accountCollectionList.size() - 1);
        assertThat(testAccountCollection.getTitle()).isEqualTo(UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void updateNonExistingAccountCollection() throws Exception {
        int databaseSizeBeforeUpdate = accountCollectionRepository.findAll().size();

        // Create the AccountCollection

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAccountCollectionMockMvc.perform(put("/api/account-collections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountCollection)))
            .andExpect(status().isCreated());

        // Validate the AccountCollection in the database
        List<AccountCollection> accountCollectionList = accountCollectionRepository.findAll();
        assertThat(accountCollectionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAccountCollection() throws Exception {
        // Initialize the database
        accountCollectionService.save(accountCollection);

        int databaseSizeBeforeDelete = accountCollectionRepository.findAll().size();

        // Get the accountCollection
        restAccountCollectionMockMvc.perform(delete("/api/account-collections/{id}", accountCollection.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AccountCollection> accountCollectionList = accountCollectionRepository.findAll();
        assertThat(accountCollectionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccountCollection.class);
        AccountCollection accountCollection1 = new AccountCollection();
        accountCollection1.setId(1L);
        AccountCollection accountCollection2 = new AccountCollection();
        accountCollection2.setId(accountCollection1.getId());
        assertThat(accountCollection1).isEqualTo(accountCollection2);
        accountCollection2.setId(2L);
        assertThat(accountCollection1).isNotEqualTo(accountCollection2);
        accountCollection1.setId(null);
        assertThat(accountCollection1).isNotEqualTo(accountCollection2);
    }
}
