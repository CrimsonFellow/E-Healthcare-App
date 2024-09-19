package com.healthcare.service.impl;

import com.healthcare.model.Prescription;
import com.healthcare.repository.PrescriptionRepository;
import com.healthcare.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Override
    public Prescription savePrescription(Prescription prescription) {
        return prescriptionRepository.save(prescription);
    }

    @Override
    public Optional<Prescription> getPrescriptionById(Long id) {
        return prescriptionRepository.findById(id);
    }

    @Override
    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

    @Override
    public Prescription updatePrescription(Long id, Prescription updatedPrescription) {
        Optional<Prescription> existingPrescriptionOpt = prescriptionRepository.findById(id);
        if (existingPrescriptionOpt.isPresent()) {
            Prescription existingPrescription = existingPrescriptionOpt.get();
            existingPrescription.setName(updatedPrescription.getName());
            existingPrescription.setDescription(updatedPrescription.getDescription());
            return prescriptionRepository.save(existingPrescription);
        }
        return null;
    }

    @Override
    public void deletePrescription(Long id) {
        prescriptionRepository.deleteById(id);
    }
}
