package com.healthcare.service;

import com.healthcare.model.User;
import com.healthcare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(String username, String password, String role, String name, String email) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);

        if ("user".equals(role)) {
            if (name == null || name.isEmpty() || email == null || email.isEmpty()) {
                throw new IllegalArgumentException("Name and email are required for users.");
            }
            user.setName(name);  
            user.setEmail(email); 
        }

        return userRepository.save(user);
    }

    public Optional<User> login(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }
}




