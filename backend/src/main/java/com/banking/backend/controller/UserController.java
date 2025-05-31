package com.banking.backend.controller;

import com.banking.backend.models.Users;
import com.banking.backend.repository.UserRepository;
import com.banking.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
   @Autowired
    UserService userService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    ResponseEntity<?> registerUser(@RequestBody Users user) {
        userService.register(user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Users user) throws Exception {
        return ResponseEntity.ok(userService.verify(user));
    }
}
