package com.example.financeassistant.web.controller;

import com.example.financeassistant.model.Account;
import com.example.financeassistant.model.exception.InvalidAccount;
import com.example.financeassistant.accounts.AccountService;
import com.example.financeassistant.service.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Currency;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/accounts", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class AccountControler {
    private final AccountService accountService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    public AccountControler(AccountService accountService) {
        this.accountService = accountService;

    }

    @GetMapping
    public List<Account> getAllAccounts(Principal principal)
    {
        return accountService.getAllAccounts(principal.getName());
    }

    @GetMapping(params = "term")
    public List<Account> searchAccounts(@RequestParam String term)
    {
        return accountService.searchAccount(term);
    }

    @GetMapping("/{accountId}")
    public Account getAccount(@PathVariable int accountId,Principal principal)
    {
        return accountService.findbyId(accountId,principal.getName()).orElseThrow(InvalidAccount::new);
    }

    @PostMapping
    public ResponseEntity<?> createAccount(@Valid @RequestBody Account account, BindingResult result,Principal principal){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Account account1 = accountService.createAccount(account.getName(),account.getType(),account.getCurrency(),account.getInitialBalance(),principal.getName());
        return new ResponseEntity<Account>(account1,HttpStatus.CREATED);
    }

   /* @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Account createAccount(@RequestParam("Name") String Name,
                              @RequestParam("Type") String type,
                              @RequestParam("Currency") Currency currency,
                              @RequestParam("InitialBalance") int InitialBalance
                              )
    {
        Principal principal = (Principal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      //  User user = this.userRepository.findById(1).orElseThrow(InvalidUser::new);
        Account account = accountService.createAccount(Name,type,currency,InitialBalance,principal.getName());
        return account;
    }*/

    @PostMapping("/{aId}")
    public Account updateAccount(@PathVariable int aId,
                                 @RequestParam("accountId") int accountId,
                                 @RequestParam("Name") String Name,
                                 @RequestParam("Type") String type,
                                 @RequestParam("Currency") Currency currency,
                                 @RequestParam("InitialBalance") int InitialBalance,
                                 Principal principal)
    {
        Account account = this.accountService.findbyId(accountId,principal.getName()).orElseThrow(InvalidAccount::new);
        return accountService.updateAccount(accountId,Name,type,currency,InitialBalance,account.getTransactions());
    }

    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable int id,Principal principal)
    {
     //   Account account = this.accountService.findbyId(id).orElseThrow(InvalidAccount::new);
    //    this.userService.updateAccountsList(1,account);
        accountService.deleteAccount(id,principal.getName());
    }

}
