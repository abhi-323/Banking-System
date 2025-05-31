package com.banking.backend.controller;


import com.banking.backend.service.BranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/branch")
public class BranchController {
    @Autowired
    private BranchService branchService;

    @GetMapping("/details")
    public ResponseEntity<?> branchDetails() {
        return ResponseEntity.ok(branchService.branchDetail());
    }

    @GetMapping("/all-branch")
    public ResponseEntity<?> getAllBranches() {
        return branchService.getAllBranch();
    }
}
