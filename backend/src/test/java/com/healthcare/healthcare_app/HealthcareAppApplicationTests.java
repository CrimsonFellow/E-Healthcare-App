package com.healthcare.healthcare_app;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")  // This tells Spring to load application-test.properties
public class HealthcareAppApplicationTests {

    @Test
    public void contextLoads() {
        // Your test logic here
    }
}

