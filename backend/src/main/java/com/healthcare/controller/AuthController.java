package com.healthcare.controller;

import com.healthcare.model.User;
import com.healthcare.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

 // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Optional<User> userOptional = authService.login(username, password);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Map<String, Object> response = new HashMap<>();
            response.put("userId", user.getId()); 
            response.put("username", user.getUsername());
            response.put("role", user.getRole());
            return ResponseEntity.ok(response);  
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid credentials");
            return ResponseEntity.status(401).body(errorResponse); 
        }
    }

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody Map<String, String> registerData) {
	    String username = registerData.get("username");
	    String password = registerData.get("password");
	    String role = registerData.getOrDefault("role", "user");  

	    String name = null;
	    String email = null;

	    if ("user".equals(role)) {
	        name = registerData.get("name");
	        email = registerData.get("email");


	        if (name == null || email == null) {
	            return ResponseEntity.badRequest().body("Name and email are required for user registration.");
	        }
	    }


	    role = "ROLE_" + role.toUpperCase(); 

	    try {
	        User registeredUser = authService.register(username, password, role, name, email);
	        Map<String, String> response = new HashMap<>();
	        response.put("username", registeredUser.getUsername());
	        response.put("role", registeredUser.getRole());
	        return ResponseEntity.ok(response);
	    } catch (IllegalArgumentException e) {
	        return ResponseEntity.badRequest().body(e.getMessage());
	    }
	}

}




