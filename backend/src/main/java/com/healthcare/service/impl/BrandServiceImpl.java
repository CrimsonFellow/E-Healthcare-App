package com.healthcare.service.impl;

import com.healthcare.model.Brand;
import com.healthcare.repository.BrandRepository;
import com.healthcare.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public Brand saveBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    @Override
    public Optional<Brand> getBrandById(Long id) {
        return brandRepository.findById(id);
    }

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    @Override
    public Brand updateBrand(Long id, Brand updatedBrand) {
        Optional<Brand> existingBrandOpt = brandRepository.findById(id);
        if (existingBrandOpt.isPresent()) {
            Brand existingBrand = existingBrandOpt.get();
            existingBrand.setName(updatedBrand.getName());
            return brandRepository.save(existingBrand);
        }
        return null;
    }

    @Override
    public void deleteBrand(Long id) {
        brandRepository.deleteById(id);
    }
}

