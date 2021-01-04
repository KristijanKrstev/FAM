package com.example.financeassistant.accounts;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;


import javax.persistence.*;
import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Transaction {

    @Id
    @GeneratedValue
    private int Id;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate Date;
    private int Amount;
    private String Description;
    private String Tr_transaction;
    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.PERSIST)
    @JsonIgnore
    private Account account;

    public Transaction(LocalDate date, int amount, String desc, String tr, Account account)
    {
        this.Date=date;
        this.Amount=amount;
        this.Description=desc;
        this.Tr_transaction=tr;
        this.account=account;
    }
}
