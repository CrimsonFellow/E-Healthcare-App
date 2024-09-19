package com.healthcare.service;

import com.healthcare.model.Symptom;

import java.util.List;
import java.util.Optional;

public interface SymptomService {
    Symptom saveSymptom(Symptom symptom);

    Optional<Symptom> getSymptomById(Long id);

    List<Symptom> getAllSymptoms();

    Symptom updateSymptom(Long id, Symptom symptom);

    void deleteSymptom(Long id);
}
