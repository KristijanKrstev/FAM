package com.example.financeassistant.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.Entity;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Work {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    @Column(unique = true)
    private String Name;
    private String Address;
    private Integer Number;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<User> Users;

    public Work(String Name, String Address, Integer Number, User user){
        this.Name=Name;
        this.Address=Address;
        this.Number=Number;
        this.Users = new ArrayList<>();
        this.getUsers().add(user);
    }

}
