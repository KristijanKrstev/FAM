package com.example.financeassistant.service.impl;

import com.example.financeassistant.model.Account;
import com.example.financeassistant.model.Savings;
import com.example.financeassistant.model.User;
import com.example.financeassistant.model.exception.InvalidSavings;
import com.example.financeassistant.repository.jpa.JpaSavingsRepository;
import com.example.financeassistant.repository.jpa.JpaUserRepository;
import com.example.financeassistant.service.SavingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class SavingsServiceImpl implements SavingsService {

    @Autowired
    private final JpaSavingsRepository savingsRepository;
    @Autowired
    private final JpaUserRepository userRepository;

    public SavingsServiceImpl(JpaSavingsRepository savingsRepository, JpaUserRepository userRepository) {
        this.savingsRepository = savingsRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Savings save(User user, LocalDate date, int hope_savings) {
        if(this.getAllSavings(user.getName()).size()>0) throw new InvalidSavings();
        Savings savings = new Savings(user,date,hope_savings);
        return this.savingsRepository.save(savings);
    }

    @Override
    public Optional<Savings> findById(int id, String userName) {
        User user = this.userRepository.findAll(userName).get(0);
        return this.savingsRepository.findById(id);
    }

    @Override
    public List<Savings> getAllSavings(String userName) {
        User user = userRepository.findAll(userName).get(0);
        return this.savingsRepository.findAllByUser(user);
    }

    @Override
    public Savings update(int id, int saving, LocalDate date, int previos_state, int hope_savings) {
        Savings sav = this.savingsRepository.findById(id).orElseThrow(InvalidSavings::new);
        sav.setDate(date);
        sav.setHope_savings(hope_savings);
        sav.setPrevios_state(previos_state);
        sav.setSaving(saving);
        return this.savingsRepository.save(sav);
    }

    @Override
    public void delete(int id) {
            this.savingsRepository.deleteById(id);
    }

    @Override
    public void checkInitialBalance(int id, String userName) {
        Savings savings = this.findById(id,userName).orElseThrow(InvalidSavings::new);
        User user = this.userRepository.findAll(userName).get(0);
        int suma = 0;
        for(Account account : user.getAccounts()){
            suma+=account.getInitialBalance();
        }
        suma = suma - savings.getPrevios_state();
        savings.setSaving(suma);
        this.savingsRepository.save(savings);
    }
}
