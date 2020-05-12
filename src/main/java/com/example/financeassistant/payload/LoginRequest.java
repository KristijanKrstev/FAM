package com.example.financeassistant.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginRequest  {

    @NotBlank(message = "Email cannot be blank")
    private String Email; //need to be the same from User.class
    @NotBlank(message = "Password cannot be blank")
    private String password;

}
