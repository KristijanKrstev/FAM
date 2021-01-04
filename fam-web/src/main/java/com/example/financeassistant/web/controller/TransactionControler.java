package com.example.financeassistant.web.controller;

import com.example.financeassistant.model.Account;
import com.example.financeassistant.model.Transaction;
import com.example.financeassistant.model.User;
import com.example.financeassistant.model.exception.InvalidTransaction;
import com.example.financeassistant.repository.jpa.JpaAccountRepository;
import com.example.financeassistant.repository.jpa.JpaUserRepository;
import com.example.financeassistant.service.TransactionService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/transactions", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class TransactionControler {
    private final TransactionService transactionService;
    private final JpaAccountRepository accountRepository;
    private final JpaUserRepository userRepository;

    public TransactionControler(TransactionService transactionService, JpaAccountRepository accountRepository, JpaUserRepository userRepository) {
        this.transactionService = transactionService;
        this.accountRepository = accountRepository;

        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Transaction> getAllTransactions(Principal principal) {
        return transactionService.getAllTransactions(principal.getName());

    }

    @GetMapping(params = "term")
    public List<Transaction> searchAccounts(@RequestParam String term) {
        return transactionService.searchTransaction(term);
    }

    @GetMapping("/{transactionId}")
    public Transaction getTransaction(@PathVariable int transactionId, Principal principal) {
        return transactionService.findById(transactionId, principal.getName()).orElseThrow(InvalidTransaction::new);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Transaction createTransaction(@RequestParam("Date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                                         @RequestParam("Amount") int amount,
                                         @RequestParam("Description") String description,
                                         @RequestParam("Tr_transaction") String Tr_transaction,
                                         @RequestParam("Account") String account,
                                         Principal principal
    ) {
        User user = this.userRepository.findAll(principal.getName()).get(0);
        Account account1 = this.accountRepository.findAllByUser(user).get(0);
        return transactionService.createTransaction(date, amount, description, Tr_transaction, account1, principal.getName());
    }

    @PostMapping("/{tId}")
    public Transaction updateTransaction(@PathVariable int tId,
                                         @RequestParam("transactionId") int transactionId,
                                         @RequestParam("Date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                                         @RequestParam("Amount") int amount,
                                         @RequestParam("Description") String description,
                                         @RequestParam("Tr_transaction") String tr_transaction,
                                         Principal principal
    ) {
        Transaction transaction = this.getTransaction(transactionId, principal);
        return transactionService.updateTransaction(transactionId, date, amount, description, tr_transaction, transaction.getAccount());
    }

    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable int id, Principal principal) {
        //    Transaction transaction = this.transactionService.findById(id).orElseThrow(InvalidTransaction::new);
        //    this.accountService.updateTransactionList(3,transaction);
        this.transactionService.deleteTransaction(id, principal.getName());
    }
}
