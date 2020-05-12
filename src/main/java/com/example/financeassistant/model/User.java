package com.example.financeassistant.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    @NotBlank(message = "Name is required")
    @Column(unique = true)
    private String Name;
    private LocalDate dateOfBirth;
    @Email(message = "Enter your email")
    @NotBlank(message = "Email is required")
    @Column(unique = true)
    private String Email;
    @NotBlank(message = "Password field is required")
    private String password;
    @Transient
    private String confirmPassword;
    @JsonIgnore
    @JsonBackReference
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Account> accounts;
    @ManyToMany(mappedBy = "Users")
    @JsonIgnore
    @NotFound(action = NotFoundAction.IGNORE)
    private Set<Work> works;
   
    public User(String name,LocalDate dateOfBirth, String em,String password,String confirmPassword)
    {
        this.Name=name;
        this.dateOfBirth=dateOfBirth;
        this.Email=em;
        this.password=password;
        this.confirmPassword=confirmPassword;
        this.accounts=new ArrayList<>();
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return Name;
    }


    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
