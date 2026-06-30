package com.example.demo.controller;

import com.example.demo.model.Organization;
import com.example.demo.repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orgs")
public class OrganizationController {

    @Autowired
    private OrganizationRepository organizationRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Organization org) {
        if (organizationRepository.findByEmail(org.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }
        Organization savedOrg = organizationRepository.save(org);
        return ResponseEntity.ok(savedOrg);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Organization loginData) {
        Optional<Organization> orgOpt = organizationRepository.findByEmail(loginData.getEmail());
        if (orgOpt.isPresent()) {
            Organization org = orgOpt.get();
            if (org.getPassword().equals(loginData.getPassword())) {
                return ResponseEntity.ok(org);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @GetMapping
    public ResponseEntity<List<Organization>> getAllOrganizations() {
        return ResponseEntity.ok(organizationRepository.findAll());
    }
}
