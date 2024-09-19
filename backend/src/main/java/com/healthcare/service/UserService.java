package com.healthcare.service;

import com.healthcare.model.User;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User getUserById(Long userId);
    Optional<User> findByUsername(String username);  
    User getUserByUsername(String username);
}

