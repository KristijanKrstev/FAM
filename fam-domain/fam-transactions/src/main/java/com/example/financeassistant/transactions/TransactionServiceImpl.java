package com.example.financeassistant.transactions;

import com.example.financeassistant.model.Account;
import com.example.financeassistant.model.Transaction;
import com.example.financeassistant.model.exception.InvalidAccount;
import com.example.financeassistant.model.exception.InvalidTransaction;
import com.example.financeassistant.repository.jpa.JpaTransactionRepository;
import com.example.financeassistant.accounts.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private final JpaTransactionRepository repository;
    @Autowired
    private final AccountService accountService;

    public TransactionServiceImpl(JpaTransactionRepository repository, AccountService accountService) {
        this.repository = repository;
        this.accountService = accountService;
    }

    @Override
    public Transaction createTransaction(LocalDate date, int amount, String desc, String tr, Account account, String userName) {
        //Just checking if that account is on that user
        Account account1 = accountService.findbyId(account.getId(),userName).orElseThrow(InvalidAccount::new);

        if(tr.equals("Withdrawal"))
        {
            int suma = account.getInitialBalance();
            suma-=amount;
            account.setInitialBalance(suma);
        }
        else if(tr.equals("Deposit"))
        {
            int suma = account.getInitialBalance();
            suma+=amount;
            account.setInitialBalance(suma);
        }
        accountService.updateAccount(account.getId(),account.getName(),account.getType(),account.getCurrency(),account.getInitialBalance(),account.getTransactions());
        Transaction transaction = new Transaction(date,amount,desc,tr,account);
        return this.repository.save(transaction);
    }

    @Override
    public List<Transaction> getAllTransactions(String userName) {
        return this.repository.findByAccount(userName);
    }

    @Override
    public List<Transaction> searchTransaction(String term) {
        return this.repository.findAll(term);
    }

    @Override
    public Transaction updateTransaction(int id,LocalDate date, int amount, String desc, String tr, Account account) {
        Transaction transaction = this.repository.findById(id).orElseThrow(InvalidTransaction::new);
        transaction.setDate(date);
        transaction.setAmount(amount);
        transaction.setDescription(desc);
        transaction.setTr_transaction(tr);
        transaction.setAccount(account);
        return this.repository.save(transaction);
    }

    @Override
    public void deleteTransaction(int id,String userName) {
        Transaction transaction = this.findById(id,userName).orElseThrow(InvalidTransaction::new);
        Account account = transaction.getAccount();
        if(transaction.getTr_transaction().equals("Withdrawal"))
        {
            int suma = account.getInitialBalance();
            suma+=transaction.getAmount();
            account.setInitialBalance(suma);
        }
        else if(transaction.getTr_transaction().equals("Deposit"))
        {
            int suma = account.getInitialBalance();
            suma-=transaction.getAmount();
            account.setInitialBalance(suma);
        }
        accountService.updateAccount(account.getId(),account.getName(),account.getType(),account.getCurrency(),account.getInitialBalance(),account.getTransactions());
        this.repository.deleteById(transaction.getId());
    }

    @Override
    public Optional<Transaction> findById(int id,String userName) {
        return this.repository.findById(id);
    }
}
