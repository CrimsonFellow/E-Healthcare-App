package com.healthcare.service;

import com.healthcare.model.Prescription;
import java.util.List;
import java.util.Optional;

public interface PrescriptionService {
    Prescription savePrescription(Prescription prescription);

    Optional<Prescription> getPrescriptionById(Long id);

    List<Prescription> getAllPrescriptions();

    Prescription updatePrescription(Long id, Prescription prescription);

    void deletePrescription(Long id);
}

