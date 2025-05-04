package com.banking.backend.service;

import com.banking.backend.models.Users;
import com.banking.backend.repository.BankAccountRepo;
import com.banking.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    private final AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BankAccountRepo bankAccountRepo;
    @Autowired
    JwtService jwtService;
    public static final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    public UserService(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public void register(Users user) {
        Users existingUser = userRepository.findByEmail(user.getEmail());
        if(existingUser == null) {
           user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        }
    }
    public Map<String, String> verify(Users user) {
        Map<String, String> res = new HashMap<>();
        Users existingUser = userRepository.findByEmail(user.getEmail());
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );
            if (authentication.isAuthenticated()) {
                res.put("token", JwtService.generateToken(user.getEmail(),existingUser.getRole()));
                return res;
            }
        } catch (AuthenticationException e) {
            System.out.println("Authentication failed: " + e.getMessage());
        }

        res.put("token", "none");
        return res;
    }


}
