package de.tim.incomecalculator.web.rest;

import de.tim.incomecalculator.IncomeCalculatorApp;

import de.tim.incomecalculator.domain.TransAccount;
import de.tim.incomecalculator.domain.User;
import de.tim.incomecalculator.repository.TransAccountRepository;
import de.tim.incomecalculator.service.TransAccountService;
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
 * Test class for the TransAccountResource REST controller.
 *
 * @see TransAccountResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = IncomeCalculatorApp.class)
public class TransAccountResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    @Autowired
    private TransAccountRepository transAccountRepository;

    @Autowired
    private TransAccountService transAccountService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTransAccountMockMvc;

    private TransAccount transAccount;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TransAccountResource transAccountResource = new TransAccountResource(transAccountService);
        this.restTransAccountMockMvc = MockMvcBuilders.standaloneSetup(transAccountResource)
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
    public static TransAccount createEntity(EntityManager em) {
        TransAccount transAccount = new TransAccount()
            .title(DEFAULT_TITLE);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        transAccount.setUser(user);
        return transAccount;
    }

    @Before
    public void initTest() {
        transAccount = createEntity(em);
    }

    @Test
    @Transactional
    public void createTransAccount() throws Exception {
        int databaseSizeBeforeCreate = transAccountRepository.findAll().size();

        // Create the TransAccount
        restTransAccountMockMvc.perform(post("/api/trans-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transAccount)))
            .andExpect(status().isCreated());

        // Validate the TransAccount in the database
        List<TransAccount> transAccountList = transAccountRepository.findAll();
        assertThat(transAccountList).hasSize(databaseSizeBeforeCreate + 1);
        TransAccount testTransAccount = transAccountList.get(transAccountList.size() - 1);
        assertThat(testTransAccount.getTitle()).isEqualTo(DEFAULT_TITLE);
    }

    @Test
    @Transactional
    public void createTransAccountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = transAccountRepository.findAll().size();

        // Create the TransAccount with an existing ID
        transAccount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTransAccountMockMvc.perform(post("/api/trans-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transAccount)))
            .andExpect(status().isBadRequest());

        // Validate the TransAccount in the database
        List<TransAccount> transAccountList = transAccountRepository.findAll();
        assertThat(transAccountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTransAccounts() throws Exception {
        // Initialize the database
        transAccountRepository.saveAndFlush(transAccount);

        // Get all the transAccountList
        restTransAccountMockMvc.perform(get("/api/trans-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(transAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())));
    }

    @Test
    @Transactional
    public void getTransAccount() throws Exception {
        // Initialize the database
        transAccountRepository.saveAndFlush(transAccount);

        // Get the transAccount
        restTransAccountMockMvc.perform(get("/api/trans-accounts/{id}", transAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(transAccount.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTransAccount() throws Exception {
        // Get the transAccount
        restTransAccountMockMvc.perform(get("/api/trans-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTransAccount() throws Exception {
        // Initialize the database
        transAccountService.save(transAccount);

        int databaseSizeBeforeUpdate = transAccountRepository.findAll().size();

        // Update the transAccount
        TransAccount updatedTransAccount = transAccountRepository.findOne(transAccount.getId());
        // Disconnect from session so that the updates on updatedTransAccount are not directly saved in db
        em.detach(updatedTransAccount);
        updatedTransAccount
            .title(UPDATED_TITLE);

        restTransAccountMockMvc.perform(put("/api/trans-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTransAccount)))
            .andExpect(status().isOk());

        // Validate the TransAccount in the database
        List<TransAccount> transAccountList = transAccountRepository.findAll();
        assertThat(transAccountList).hasSize(databaseSizeBeforeUpdate);
        TransAccount testTransAccount = transAccountList.get(transAccountList.size() - 1);
        assertThat(testTransAccount.getTitle()).isEqualTo(UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void updateNonExistingTransAccount() throws Exception {
        int databaseSizeBeforeUpdate = transAccountRepository.findAll().size();

        // Create the TransAccount

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTransAccountMockMvc.perform(put("/api/trans-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(transAccount)))
            .andExpect(status().isCreated());

        // Validate the TransAccount in the database
        List<TransAccount> transAccountList = transAccountRepository.findAll();
        assertThat(transAccountList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTransAccount() throws Exception {
        // Initialize the database
        transAccountService.save(transAccount);

        int databaseSizeBeforeDelete = transAccountRepository.findAll().size();

        // Get the transAccount
        restTransAccountMockMvc.perform(delete("/api/trans-accounts/{id}", transAccount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TransAccount> transAccountList = transAccountRepository.findAll();
        assertThat(transAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TransAccount.class);
        TransAccount transAccount1 = new TransAccount();
        transAccount1.setId(1L);
        TransAccount transAccount2 = new TransAccount();
        transAccount2.setId(transAccount1.getId());
        assertThat(transAccount1).isEqualTo(transAccount2);
        transAccount2.setId(2L);
        assertThat(transAccount1).isNotEqualTo(transAccount2);
        transAccount1.setId(null);
        assertThat(transAccount1).isNotEqualTo(transAccount2);
    }
}
