package com.example.financeassistant.savings;

import com.example.financeassistant.accounts.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JpaSavingsRepository extends JpaRepository<Savings,Integer> {

    List<Savings> findAllByUser(User user);
}
