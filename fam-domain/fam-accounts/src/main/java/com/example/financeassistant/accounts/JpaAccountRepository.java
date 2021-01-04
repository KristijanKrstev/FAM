package com.example.financeassistant.accounts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaAccountRepository extends JpaRepository<Account,Integer> {

    @Query("select a from Account a where a.Name like :term")
    List<Account> findAll(String term);


    List<Account> findAllByUser(User user);
}
