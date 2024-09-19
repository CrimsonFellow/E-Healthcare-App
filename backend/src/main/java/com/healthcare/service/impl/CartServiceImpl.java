package com.healthcare.service.impl;

import com.healthcare.model.Cart;
import com.healthcare.model.Medicine;
import com.healthcare.model.User;
import com.healthcare.repository.CartRepository;
import com.healthcare.repository.MedicineRepository;
import com.healthcare.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    @Override
    public List<Cart> getCartByUser(User user) {
        return cartRepository.findByUser(user);
    }
    @Override
    public Optional<Cart> findById(Long cartId) {
        return cartRepository.findById(cartId);
    }


    @Override
    public Cart addToCart(User user, Long medicineId, int quantity) {
        Medicine fetchedMedicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new RuntimeException("Medicine not found"));

        Cart existingCartItem = cartRepository.findByUserAndMedicine(user, fetchedMedicine);

        if (existingCartItem != null) {
            existingCartItem.setQuantity(existingCartItem.getQuantity() + quantity);
            return cartRepository.save(existingCartItem);
        } else {
            Cart cartItem = new Cart();
            cartItem.setUser(user);
            cartItem.setMedicine(fetchedMedicine);
            cartItem.setQuantity(quantity);
            return cartRepository.save(cartItem);
        }
    }

    @Override
    public void removeFromCart(Long cartId) {
        if (cartRepository.existsById(cartId)) {
            cartRepository.deleteById(cartId);
        } else {
            throw new RuntimeException("Cart item not found");
        }
    }

    @Override
    public void clearCart(Long userId) {
        List<Cart> cartItems = cartRepository.findByUserId(userId);
        if (!cartItems.isEmpty()) {
            cartRepository.deleteAll(cartItems);
        } else {
            throw new RuntimeException("No cart items found for user");
        }
    }

    @Override
    public void placeOrder(User user) {
        List<Cart> cartItems = getCartByUser(user);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty, cannot place an order");
        }
        clearCart(user.getId());
    }
}


