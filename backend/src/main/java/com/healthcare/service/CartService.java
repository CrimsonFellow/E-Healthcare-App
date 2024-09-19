package com.healthcare.service;

import com.healthcare.model.Cart;
import com.healthcare.model.User;

import java.util.List;
import java.util.Optional;

public interface CartService {
    List<Cart> getCartByUser(User user);

    Cart addToCart(User user, Long medicine, int quantity);

    void removeFromCart(Long cartId);

    void clearCart(Long userId);

    void placeOrder(User user);
    
    Optional<Cart> findById(Long cartId);
}
