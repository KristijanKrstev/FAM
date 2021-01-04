package com.example.financeassistant.web.controller;

import com.example.financeassistant.accounts.JpaUserRepository;
import com.example.financeassistant.accounts.User;
import com.example.financeassistant.savings.InvalidSavingsException;
import com.example.financeassistant.savings.Savings;
import com.example.financeassistant.savings.SavingsService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/savings", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class SavingsControler {

    private final SavingsService savingsService;
    private final JpaUserRepository userRepository;
    public SavingsControler(SavingsService savingsService, JpaUserRepository userRepository) {
        this.savingsService = savingsService;
        this.userRepository = userRepository;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Savings createSavings(@RequestParam("Date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                                 @RequestParam("Hope_savings") int hope_savings,
                                 Principal principal) {
        User user = this.userRepository.findAll(principal.getName()).get(0);
        return this.savingsService.save(user,date,hope_savings);

    }

    @GetMapping
    public List<Savings> getAllSavings(Principal principal){
        return this.savingsService.getAllSavings(principal.getName());
    }

    @PostMapping("/{sId}")
    public Savings updateSavings(@PathVariable int sId,
                                 @RequestParam("savingsId") int savingsId,
                                 @RequestParam("Saving") int saving,
                                 @RequestParam("Date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data,
                                 @RequestParam("Previosstate") int previos_state,
                                 @RequestParam("Hopesavings") int hope_savings,
                                 Principal principal)
    {
        Savings savings = this.savingsService.findById(savingsId,principal.getName()).orElseThrow(InvalidSavingsException::new);
        return this.savingsService.update(savingsId,saving,data,previos_state,hope_savings);
    }

    @GetMapping("/{sId}")
    public Savings getSavings(@PathVariable int sId,Principal principal){
        return this.savingsService.findById(sId,principal.getName()).orElseThrow(InvalidSavingsException::new);
    }

    @DeleteMapping("/{sId}")
    public void delete(@PathVariable int sId,Principal principal){
        Savings saving = this.savingsService.findById(sId,principal.getName()).orElseThrow(InvalidSavingsException::new);
        this.savingsService.delete(saving.getId());
    }

    @GetMapping("/initialBalance/{sId}")
    public void getInitialBalance(@PathVariable int sId,Principal principal){
        this.savingsService.checkInitialBalance(sId,principal.getName());
    }


}
