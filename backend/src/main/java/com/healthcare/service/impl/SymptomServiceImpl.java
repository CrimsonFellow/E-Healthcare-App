package com.healthcare.service.impl;

import com.healthcare.model.Symptom;
import com.healthcare.repository.SymptomRepository;
import com.healthcare.service.SymptomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SymptomServiceImpl implements SymptomService {

    @Autowired
    private SymptomRepository symptomRepository;

    @Override
    public Symptom saveSymptom(Symptom symptom) {
        return symptomRepository.save(symptom);
    }

    @Override
    public Optional<Symptom> getSymptomById(Long id) {
        return symptomRepository.findById(id);
    }

    @Override
    public List<Symptom> getAllSymptoms() {
        return symptomRepository.findAll();
    }

    @Override
    public Symptom updateSymptom(Long id, Symptom updatedSymptom) {
        Optional<Symptom> existingSymptomOpt = symptomRepository.findById(id);
        if (existingSymptomOpt.isPresent()) {
            Symptom existingSymptom = existingSymptomOpt.get();
            existingSymptom.setName(updatedSymptom.getName());
            existingSymptom.setDescription(updatedSymptom.getDescription());
            return symptomRepository.save(existingSymptom);
        }
        return null;
    }

    @Override
    public void deleteSymptom(Long id) {
        symptomRepository.deleteById(id);
    }
}
