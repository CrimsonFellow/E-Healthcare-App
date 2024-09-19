package com.healthcare.repository;

import com.healthcare.model.Cart;
import com.healthcare.model.Medicine;
import com.healthcare.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
	 List<Cart> findByUserId(Long userId);
	 List<Cart> findByUser(User user);
	 Cart findByUserAndMedicine(User user, Medicine medicine);
}

