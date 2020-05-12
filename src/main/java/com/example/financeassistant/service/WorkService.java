package com.example.financeassistant.service;

import com.example.financeassistant.model.Account;
import com.example.financeassistant.model.User;
import com.example.financeassistant.model.Work;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface WorkService {
    Work createWork(String Name,String Address,Integer Number,String userName);

    List<Work> getAllWorks();

    Work updateWork(int id, String name, String address,Integer number,String userName);

    void deleteWork(int id,String userName);

    void updateWorkList(int workId, User user,String whatToDo);

    Optional<Work> findById(int id);
}
