package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Document(collection = "organizations")
public class Organization {
    @Id
    private String id;
    private String name;
    private String email;
    private String password; // In a real app this would be hashed, for prototype plain text or simple hash
    private String type; // e.g. "NGO", "GOVT_SHELTER"
    private String contactNumber;
    private LocalDateTime registeredAt;

    public Organization() {
        this.registeredAt = LocalDateTime.now();
    }
}
