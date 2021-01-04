package com.example.financeassistant.accounts;


import java.util.Currency;
import java.util.List;
import java.util.Optional;

public interface AccountService {
    Account createAccount(String Name, String type, Currency currency, int inBalance, String userName);

    List<Account> getAllAccounts(String userName);

    List<Account> searchAccount(String term);

    Account updateAccount(int id, String Name, String type, Currency currency, int inBalance, List<Transaction> transactions);

    void deleteAccount(int id,String userName);

    void updateTransactionList(int id, Transaction transaction);

    Optional<Account> findbyId(int id,String userName);
}
