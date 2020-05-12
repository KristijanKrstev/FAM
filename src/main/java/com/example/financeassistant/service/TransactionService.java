package com.example.financeassistant.service;

import com.example.financeassistant.model.Account;
import com.example.financeassistant.model.Transaction;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface TransactionService {
    Transaction createTransaction(LocalDate date, int amount, String desc, String tr, Account account, String userName);

    List<Transaction> getAllTransactions(String userName);

    List<Transaction> searchTransaction(String term);

    Transaction updateTransaction(int id, LocalDate date, int amount, String desc, String tr, Account account);

    void deleteTransaction(int id,String userName);

    Optional<Transaction> findById(int id,String userName);
}
