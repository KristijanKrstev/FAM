package com.example.financeassistant.service.impl;

import com.example.financeassistant.model.User;
import com.example.financeassistant.model.exception.InvalidUser;
import com.example.financeassistant.repository.jpa.JpaUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private JpaUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(s);

        if(user==null) new InvalidUser();
        return user;

    }

    @Transactional
    public User loadUserById(int id)
    {
        User user = userRepository.findById(id).orElseThrow(InvalidUser::new);
        return user;
    }
}
