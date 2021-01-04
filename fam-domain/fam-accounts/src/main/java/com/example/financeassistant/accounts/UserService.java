package com.example.financeassistant.accounts;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UserService {

    User createUser(User user);

    List<User> getAllUsers(String userName);

    List<User> searchUser(String term);

    User updateUser(int id, String name, LocalDate date, String email);

    void deleteUser(int id,String userName);

    void updateAccountsList(int userId, Account account);

    Optional<User> findById(int id,String userName);
}
