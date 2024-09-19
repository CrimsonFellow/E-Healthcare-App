package com.healthcare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;  

@SpringBootApplication
@EntityScan("com.healthcare.model")  
public class HealthcareAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(HealthcareAppApplication.class, args);
        SpringApplication.run(Application.class, args);
    }
}
