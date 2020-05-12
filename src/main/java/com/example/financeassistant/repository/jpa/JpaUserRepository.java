package com.example.financeassistant.repository.jpa;

import com.example.financeassistant.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface JpaUserRepository extends JpaRepository<User, Integer> {

    @Query("select u from User u where u.Name like :term or u.Email like :term")
    List<User> findAll(String term);

    @Query("select u from User u where u.Email like :username")
    User findByUsername(String username);

}
