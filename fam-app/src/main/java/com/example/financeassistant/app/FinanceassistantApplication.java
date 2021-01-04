package com.example.financeassistant.app;

import com.example.financeassistant.infrastructure.FamInfrastructureComponentsMarker;
import com.example.financeassistant.web.FamWebComponentsMarker;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@ComponentScan(basePackageClasses = {FamWebComponentsMarker.class, FamInfrastructureComponentsMarker.class})
public class FinanceassistantApplication {

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    public static void main(String[] args) {
        SpringApplication.run(FinanceassistantApplication.class, args);
    }

}
