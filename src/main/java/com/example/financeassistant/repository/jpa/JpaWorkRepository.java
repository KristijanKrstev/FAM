package com.example.financeassistant.repository.jpa;

import com.example.financeassistant.model.Work;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaWorkRepository extends JpaRepository<Work, Integer> {

}
