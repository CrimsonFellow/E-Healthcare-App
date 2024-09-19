package com.healthcare.service;

import com.healthcare.model.Brand;

import java.util.List;
import java.util.Optional;

public interface BrandService {
    Brand saveBrand(Brand brand);

    Optional<Brand> getBrandById(Long id);

    List<Brand> getAllBrands();

    Brand updateBrand(Long id, Brand brand);

    void deleteBrand(Long id);
}
