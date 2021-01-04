package com.example.financeassistant.savings;

import com.example.financeassistant.accounts.Account;
import com.example.financeassistant.accounts.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Savings {

    @Id
    @GeneratedValue
    private int id;
    @OneToOne(cascade = CascadeType.PERSIST)
    @JsonIgnore
    private User user;
    private int saving;
    private LocalDate date;
    private int previos_state;
    private int hope_savings;

    public Savings(User user, LocalDate date, int hope_savings)
    {
        this.user = user;
        this.saving=0;
        this.date=date;
        this.hope_savings=hope_savings;

        this.previos_state=0;
        for(Account a : user.getAccounts())
        {
            this.previos_state+=a.getInitialBalance();
        }
    }


}
