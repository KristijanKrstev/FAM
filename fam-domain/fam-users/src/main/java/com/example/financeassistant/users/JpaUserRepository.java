package com.example.financeassistant.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaUserRepository extends JpaRepository<User, Integer> {

    @Query("select u from User u where u.Name like :term or u.Email like :term")
    List<User> findAll(String term);

    @Query("select u from User u where u.Email like :username")
    User findByUsername(String username);

}
