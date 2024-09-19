package com.healthcare.service.impl;

import com.healthcare.model.User;
import com.healthcare.repository.UserRepository;
import com.healthcare.service.UserService;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public Optional<User> findByUsername(String username) { // Implemented method
        return userRepository.findByUsername(username);
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    // Implement loadUserByUsername to work with Spring Security
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Get user from the database
        User user = getUserByUsername(username);

        // Build UserDetails object with username, password, and roles
        return org.springframework.security.core.userdetails.User.withUsername(user.getUsername())
                .password(user.getPassword())  // Password stored in the database (should be hashed)
                .roles(user.getRole().replace("ROLE_", ""))  // Remove "ROLE_" prefix before setting
                .build();
    }
}


