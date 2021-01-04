package com.example.financeassistant.web.config;

import com.example.financeassistant.accounts.AccountsComponentsMarkerInterface;
import com.example.financeassistant.infrastructure.FamInfrastructureComponentsMarker;
import com.example.financeassistant.savings.SavingsComponentsMarkerInterface;
import com.example.financeassistant.work.WorkComponentsMarkerInterface;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackageClasses = {
    AccountsComponentsMarkerInterface.class,
    SavingsComponentsMarkerInterface.class,
    WorkComponentsMarkerInterface.class,
    FamInfrastructureComponentsMarker.class})
public class WebModuleConfiguration {
}
