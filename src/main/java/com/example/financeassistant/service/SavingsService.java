package com.example.financeassistant.service;


import com.example.financeassistant.model.Account;
import com.example.financeassistant.model.Savings;
import com.example.financeassistant.model.User;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface SavingsService {

    Savings save(User user, LocalDate date, int hope_savings);

    Optional<Savings> findById(int id,String userName);

    List<Savings> getAllSavings(String userName);

    Savings update(int id, int saving, LocalDate date, int previos_state, int hope_savings);

    void delete(int id);

    void checkInitialBalance(int id, String userName);
}
