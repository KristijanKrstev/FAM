package com.example.financeassistant.service.impl;

import com.example.financeassistant.model.User;
import com.example.financeassistant.model.Work;
import com.example.financeassistant.model.exception.InvalidUser;
import com.example.financeassistant.model.exception.InvalidWork;
import com.example.financeassistant.repository.jpa.JpaUserRepository;
import com.example.financeassistant.repository.jpa.JpaWorkRepository;
import com.example.financeassistant.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkServiceImpl implements WorkService {

    @Autowired
    private JpaWorkRepository workRepository;
    @Autowired
    private JpaUserRepository userRepository;

    @Override
    public Work createWork(String Name,String Address,Integer Number,String userName) {
        User user = this.userRepository.findAll(userName).get(0);
        Work work = new Work(Name,Address,Number,user);
        return workRepository.save(work);
    }

    @Override
    public List<Work> getAllWorks() {
        return workRepository.findAll();
    }

    @Override
    public Work updateWork(int id, String name, String address, Integer number, String userName) {
        //This throw exp if you are not admin on that work
        User user = userRepository.findAll(userName).get(0);
        Work work = workRepository.findById(id).orElseThrow(InvalidWork::new);
        if(!work.getUsers().get(0).equals(user)) throw new InvalidUser();
        work.setName(name);
        work.setAddress(address);
        work.setNumber(number);
        return workRepository.save(work);
    }

    @Override
    public void deleteWork(int id,String userName) {
        Work work = this.findById(id).orElseThrow(InvalidWork::new);
        if(!work.getUsers().get(0).getName().equals(userName)) throw new InvalidWork();
        this.workRepository.deleteById(id);
    }

    @Override
    public void updateWorkList(int workId, User user,String whatToDo) {
        Work work = this.workRepository.findById(workId).orElseThrow(InvalidWork::new);
        if(whatToDo.equals("Delete")){
            work.getUsers().remove(user);
        }else if(whatToDo.equals("Add")){
            work.getUsers().add(user);
        }
        this.workRepository.save(work);
    }

    @Override
    public Optional<Work> findById(int id) {
        return this.workRepository.findById(id);
    }
}
