//package com.example.financeassistant.dataholder;
//
//import com.example.financeassistant.model.*;
//import com.example.financeassistant.repository.jpa.*;
//import lombok.Getter;
//import org.springframework.stereotype.Component;
//
//import javax.annotation.PostConstruct;
//import java.text.ParseException;
//import java.text.SimpleDateFormat;
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.Currency;
//import java.util.Date;
//import java.util.List;
//
//@Component
//@Getter
//public class dataholder {
//    public final JpaUserRepository userRepository;
//    public final JpaAccountRepository accountRepository;
//    public final JpaTransactionRepository transactionRepository;
//    public final JpaSavingsRepository savingsRepository;
//    public final JpaWorkRepository workRepository;
//    public List<User> users = new ArrayList<>();
//    public List<Account> accounts = new ArrayList<>();
//    public List<Transaction> transactions=new ArrayList<>();
//
//    public dataholder(JpaUserRepository userRepository, JpaAccountRepository accountRepository, JpaTransactionRepository transactionRepository, JpaSavingsRepository savingsRepository, JpaWorkRepository workRepository) {
//        this.userRepository = userRepository;
//        this.accountRepository = accountRepository;
//        this.transactionRepository = transactionRepository;
//        this.savingsRepository = savingsRepository;
//        this.workRepository = workRepository;
//    }
//
//
//    @PostConstruct
//    public void init() throws ParseException {
//        String pattern = "MM-dd-yyyy";
//        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
//        Date date = simpleDateFormat.parse("03-10-1997");
//        LocalDate date2 = LocalDate.ofEpochDay(03-10-1997);
//        User user = new User("kkk",date2,"kris@yahoo.com","passsss","passsss");
//        User user1 = new User("ss",date2,"ss@yahoo.com","passsss","passsss");
//        this.userRepository.save(user1);
//
//
//        Account account= new Account("Account1","CreditCard", Currency.getInstance("EUR"),50,user);
//        accounts.add(account);
//        user.setAccounts(accounts);
// //       this.accountRepository.save(account);
//
//        Transaction transaction = new Transaction(date2,40,"Opis za tr","Deposit",account);
//        transactions.add(transaction);
//
//        Savings savings = new Savings(user, date2,20);
//        this.savingsRepository.save(savings);
//
//
//
//        account.setTransactions(transactions);
//    //    this.transactionRepository.save(transaction);
//        this.userRepository.save(user);
//
//        Work work = new Work("adsas","asda",123,user);
//        this.workRepository.save(work);
//
//
//
//
//
//
//
//
//
//
//
//
//    }
//
//}
