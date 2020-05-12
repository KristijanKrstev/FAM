package com.example.financeassistant.model.exception;


import lombok.NoArgsConstructor;

@NoArgsConstructor
public class InvalidAccount extends RuntimeException {

    public InvalidAccount(String mess)
    {
        super(mess);
    }
}
