package com.healthcare.service;

import com.healthcare.model.Medicine;
import java.util.List;
import java.util.Optional;

public interface MedicineService {
    
    Medicine saveMedicine(Medicine medicine);

    Optional<Medicine> getMedicineById(Long id);

    List<Medicine> getAllMedicines();

    Medicine updateMedicine(Long id, Medicine medicine);

    void deleteMedicine(Long id);
}
