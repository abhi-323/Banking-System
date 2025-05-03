package com.banking.backend.service;

import com.banking.backend.models.Users;
import com.banking.backend.repository.BankAccountRepo;
import com.banking.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    BankAccountRepo bankAccountRepo;

    public void register(Users user) {
//        Users existingUser = userRepository.findByUsername(user.getUsername());
//        if(existingUser == null) {
//            user.setPassword(user.getPassword());
            userRepository.save(user);
//        }
    }
}
