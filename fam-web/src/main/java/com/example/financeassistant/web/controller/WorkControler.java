package com.example.financeassistant.web.controller;

import com.example.financeassistant.model.Work;
import com.example.financeassistant.model.exception.InvalidWork;
import com.example.financeassistant.service.MapValidationErrorService;
import com.example.financeassistant.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
@CrossOrigin
@RestController
@RequestMapping(path = "/works", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class WorkControler {

    @Autowired
    private WorkService workService;
    @Autowired
    private MapValidationErrorService mapValidationErrorService;


    @GetMapping
    public List<Work> getAllAccounts() {
        return workService.getAllWorks();
    }


    @PostMapping
    public Work createWork(@RequestParam("Name") String Name,
                           @RequestParam("Address") String address,
                           @RequestParam("Number") Integer number,
                           Principal principal) {
        return workService.createWork(Name, address, number, principal.getName());
    }

    @PostMapping("/{wId}")
    public Work updateAccount(@PathVariable int wId,
                              @RequestParam("workId") int workId,
                              @RequestParam("Name") String Name,
                              @RequestParam("Address") String address,
                              @RequestParam("Number") Integer number,
                              Principal principal) {
        return workService.updateWork(workId, Name, address, number, principal.getName());
    }

    @GetMapping("/{workId}")
    public Work getWork(@PathVariable int workId) {
        return workService.findById(workId).orElseThrow(InvalidWork::new);
    }

    @DeleteMapping("/{id}")
    public void deleteWork(@PathVariable int id, Principal principal) {
        workService.deleteWork(id, principal.getName());
    }

}
