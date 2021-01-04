package com.example.financeassistant.accounts;

import com.example.financeassistant.common.exception.InvalidAccount;
import com.example.financeassistant.transactions.Transaction;
import com.example.financeassistant.users.JpaUserRepository;
import com.example.financeassistant.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Currency;
import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private final JpaAccountRepository repository;
    @Autowired
    private final JpaUserRepository userRepository;

    public AccountServiceImpl(JpaAccountRepository repository, JpaUserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @Override
    public Account createAccount(String Name, String type, Currency currency, int inBalance, String userName) {
        User user = userRepository.findAll(userName).get(0);
        Account account = new Account(Name,type,currency,inBalance,user);
        return this.repository.save(account);
    }

    @Override
    public List<Account> getAllAccounts(String userName) {
        User user = this.userRepository.findAll(userName).get(0);
        return this.repository.findAllByUser(user);
    }

    @Override
    public List<Account> searchAccount(String term) {
        return this.repository.findAll(term);
    }

    @Override
    public Account updateAccount(int id, String Name, String type, Currency currency, int inBalance, List<Transaction> transactions) {
        Account account = this.repository.findById(id).orElseThrow(InvalidAccount::new);
        account.setName(Name);
        account.setType(type);
        account.setCurrency(currency);
        account.setInitialBalance(inBalance);
        account.setTransactions(transactions);

        return this.repository.save(account);
    }

    @Override
    public void deleteAccount(int id,String userName) {
        this.repository.deleteById(findbyId(id,userName).orElseThrow(InvalidAccount::new).getId());
    }

    @Override
    public Optional<Account> findbyId(int id,String userName) {

        User user = userRepository.findAll(userName).get(0);
        Account account = this.repository.findById(id).orElseThrow(InvalidAccount::new);
        if(!account.getUser().equals(user)){
            throw new InvalidAccount("This account is not in your list");
        }
        return Optional.of(account);
    }

    @Override
    public void updateTransactionList(int id,Transaction transaction)
    {
        Account account = repository.findById(id).orElseThrow(InvalidAccount::new);
        account.getTransactions().remove(transaction);
        this.repository.save(account);
    }

}
