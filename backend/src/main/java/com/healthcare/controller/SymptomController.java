package com.healthcare.controller;

import com.healthcare.model.Symptom;
import com.healthcare.service.SymptomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/symptoms")
public class SymptomController {

    @Autowired
    private SymptomService symptomService;

    @PostMapping
    public ResponseEntity<Symptom> createSymptom(@RequestBody Symptom symptom) {
        Symptom savedSymptom = symptomService.saveSymptom(symptom);
        return ResponseEntity.ok(savedSymptom);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Symptom> getSymptomById(@PathVariable Long id) {
        Optional<Symptom> symptomOpt = symptomService.getSymptomById(id);
        return symptomOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Symptom>> getAllSymptoms() {
        List<Symptom> symptoms = symptomService.getAllSymptoms();
        return ResponseEntity.ok(symptoms);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Symptom> updateSymptom(@PathVariable Long id, @RequestBody Symptom symptom) {
        Symptom updatedSymptom = symptomService.updateSymptom(id, symptom);
        if (updatedSymptom != null) {
            return ResponseEntity.ok(updatedSymptom);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSymptom(@PathVariable Long id) {
        symptomService.deleteSymptom(id);
        return ResponseEntity.noContent().build();
    }
}
