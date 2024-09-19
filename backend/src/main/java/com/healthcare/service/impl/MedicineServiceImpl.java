package com.healthcare.service.impl;

import com.healthcare.model.Medicine;
import com.healthcare.repository.MedicineRepository;
import com.healthcare.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Override
    public Medicine saveMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    @Override
    public Optional<Medicine> getMedicineById(Long id) {
        return medicineRepository.findById(id);
    }

    @Override
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    @Override
    public Medicine updateMedicine(Long id, Medicine updatedMedicine) {
        Optional<Medicine> existingMedicineOpt = medicineRepository.findById(id);
        if (existingMedicineOpt.isPresent()) {
            Medicine existingMedicine = existingMedicineOpt.get();
            existingMedicine.setName(updatedMedicine.getName());
            existingMedicine.setDescription(updatedMedicine.getDescription());
            existingMedicine.setPrice(updatedMedicine.getPrice());
            existingMedicine.setBrand(updatedMedicine.getBrand());
            existingMedicine.setPrescription(updatedMedicine.getPrescription());
            existingMedicine.setSymptoms(updatedMedicine.getSymptoms());
            return medicineRepository.save(existingMedicine);
        }
        return null;
    }

    @Override
    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }
}

