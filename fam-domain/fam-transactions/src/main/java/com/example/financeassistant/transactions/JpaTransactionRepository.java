package com.example.financeassistant.transactions;

import com.example.financeassistant.transactions.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaTransactionRepository extends JpaRepository<Transaction, Integer> {
    @Query("select t from Transaction t where t.Description like :term")
    List<Transaction> findAll(String term);


    @Query("select t from Transaction t join Account a on t.account.Id=a.Id join User u on a.user.Id=u.Id where u.Name like :term")
    List<Transaction> findByAccount(String term);
}
