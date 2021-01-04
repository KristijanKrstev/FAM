package com.example.financeassistant.accounts;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Currency;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Account{

    @Id
    @GeneratedValue
    private int Id;
    @Column(name = "account_Name")
    private String Name;
    private String type;
    private Currency currency;
    private int InitialBalance;
    @JsonIgnore
    @JsonBackReference
    @OneToMany(mappedBy = "account",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Transaction> transactions;
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    @JsonIgnore
    private User user;

    public Account(String name,String type,Currency currency,int IntBal,User user)
    {
        this.Name=name;
        this.type=type;
        this.currency=currency;
        this.InitialBalance=IntBal;
        this.transactions=new ArrayList<>();
        this.user=user;
    }

}
