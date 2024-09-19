package com.healthcare.controller;

import com.healthcare.model.Cart;
import com.healthcare.model.User;
import com.healthcare.dto.CartRequest;
import com.healthcare.service.CartService;
import com.healthcare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;
    @GetMapping
    public ResponseEntity<List<Cart>> getCart(@RequestParam Long userId) {
        User currentUser = validateUser(userId);
        List<Cart> cartItems = cartService.getCartByUser(currentUser);
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping
    public ResponseEntity<Void> addToCart(@RequestBody CartRequest request) {
        User currentUser = validateUser(request.getUserId());
        cartService.addToCart(currentUser, request.getMedicineId(), request.getQuantity()); // Pass medicineId, not the whole object
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@RequestParam Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/checkout")
    public ResponseEntity<Void> placeOrder(@RequestParam Long userId) {
        User currentUser = validateUser(userId);
        cartService.placeOrder(currentUser);
        return ResponseEntity.ok().build();
    }

    private User validateUser(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID must not be null");
        }
        return userService.getUserById(userId);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeFromCart(@PathVariable("id") Long cartId, Authentication authentication) {
        try {
            String username = authentication.getName();
            Optional<User> userOpt = userService.findByUsername(username);
            User user = userOpt.orElseThrow(() -> new RuntimeException("User not found"));
            Optional<Cart> cartItemOpt = cartService.findById(cartId);
            Cart cartItem = cartItemOpt.orElseThrow(() -> new RuntimeException("Cart item not found"));
            if (!cartItem.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(403).body(Collections.singletonMap("error", "You are not authorized to remove this item."));
            }

            cartService.removeFromCart(cartId);

            return ResponseEntity.ok(Collections.singletonMap("message", "Cart item removed successfully."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}


