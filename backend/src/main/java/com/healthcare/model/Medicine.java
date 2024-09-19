package com.healthcare.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "medicines")
public class Medicine {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Double price;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;  

    @ManyToOne
    @JoinColumn(name = "prescription_id")
    private Prescription prescription;  

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "medicine_symptoms",
        joinColumns = @JoinColumn(name = "medicine_id"),
        inverseJoinColumns = @JoinColumn(name = "symptom_id")
    )
    private List<Symptom> symptoms;  
}
