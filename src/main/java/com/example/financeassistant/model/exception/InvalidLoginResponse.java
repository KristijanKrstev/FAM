package com.example.financeassistant.model.exception;

import lombok.Data;

@Data
public class InvalidLoginResponse {
    private String Name;
    private String password;

    public InvalidLoginResponse() {
        this.Name = "Invalid name";
        this.password = "Invalid password";
    }


}
