package com.banking.backend.controller;

import com.banking.backend.models.Users;
import com.banking.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping
    ResponseEntity<?> registerUser(@RequestBody Users user) {
        userService.register(user);
        return ResponseEntity.ok().build();
    }
}
