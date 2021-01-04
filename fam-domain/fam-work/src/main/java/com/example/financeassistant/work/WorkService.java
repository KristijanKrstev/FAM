package com.example.financeassistant.work;


import com.example.financeassistant.users.User;

import java.util.List;
import java.util.Optional;

public interface WorkService {
    Work createWork(String Name,String Address,Integer Number,String userName);

    List<Work> getAllWorks();

    Work updateWork(int id, String name, String address,Integer number,String userName);

    void deleteWork(int id,String userName);

    void updateWorkList(int workId, User user, String whatToDo);

    Optional<Work> findById(int id);
}
