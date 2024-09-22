package com.healthcare.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import static org.springframework.security.config.Customizer.withDefaults;


import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Disable CSRF for APIs
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Enable CORS with custom config
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // Stateless session
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()  // Permit preflight requests
                .requestMatchers("/api/auth/register", "/api/auth/login", "/login", "/resources/**", "/static/**","/", "/index.html", "/static/**", "/**").permitAll()
                .requestMatchers("/api/brands/**", "/api/prescriptions/**").hasRole("ADMIN")
                .requestMatchers("/api/medicines/**").hasAnyRole("USER", "ADMIN")
                .requestMatchers("/api/cart/**", "/api/orders/**").hasRole("USER")
                .anyRequest().authenticated()
                
            
        )
        .formLogin(form -> form
            .loginPage("/login")  // Set the custom login page URL
            .defaultSuccessUrl("/home", true)  // Set default URL after successful login
            .permitAll()
        )
            .httpBasic(withDefaults());  // Enable HTTP Basic authentication
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:4200")); // Updated origin
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type", "X-Requested-With"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}

















