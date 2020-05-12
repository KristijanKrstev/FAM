package com.example.financeassistant.repository.jpa;

import com.example.financeassistant.model.Savings;
import com.example.financeassistant.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaSavingsRepository extends JpaRepository<Savings,Integer> {

    List<Savings> findAllByUser(User user);
}
