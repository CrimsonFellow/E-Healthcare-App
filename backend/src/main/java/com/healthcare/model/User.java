package com.healthcare.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

   
    @Column(nullable = false)
    private String role;  

  
    @Column(nullable = true)
    private String name;

    @Column(unique = true, nullable = true)
    private String email;

   
    @Column(nullable = false)
    private boolean enabled = true;

    @Column(nullable = false)
    private boolean accountNonExpired = true;

    @Column(nullable = false)
    private boolean accountNonLocked = true;

    @Column(nullable = false)
    private boolean credentialsNonExpired = true;

  
    public boolean isAdmin() {
        return "ROLE_ADMIN".equals(this.role);
    }

    public boolean isUser() {
        return "ROLE_USER".equals(this.role);
    }
}

