package com.example.financeassistant.accounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl  implements UserService {
    @Autowired
    private final JpaUserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(JpaUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {
        user.setConfirmPassword("");
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return this.userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers(String userName) {
        return this.userRepository.findAll(userName);
    }

    @Override
    public List<User> searchUser(String term) {
        return this.userRepository.findAll(term);
    }

    @Override
    public User updateUser(int id, String name, LocalDate date, String email) {
        User user = this.userRepository.findById(id).orElseThrow(InvalidUserException::new);

        user.setName(name);
        user.setEmail(email);
        user.setDateOfBirth(date);
        return this.userRepository.save(user);
    }

    @Override
    public void updateAccountsList(int userId, Account account)
    {
        User user = this.userRepository.findById(userId).orElseThrow(InvalidUserException::new);

        user.getAccounts().remove(account);
        this.userRepository.save(user);
    }

    @Override
    public void deleteUser(int id,String userName) {
        this.userRepository.deleteById(this.findById(id,userName).orElseThrow(InvalidUserException::new).getId());
    }

    @Override
    public Optional<User> findById(int id,String userName) {
        User user = this.userRepository.findById(id).orElseThrow(InvalidUserException::new);
        if(!user.getName().equals(userName)) throw new InvalidUserException();
        return this.userRepository.findById(id);
    }
}
