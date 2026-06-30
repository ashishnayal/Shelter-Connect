package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Document(collection = "reports")
public class Report {
    @Id
    private String id;
    private double latitude;
    private double longitude;
    private String photoBase64;
    private String status; // e.g. "PENDING", "CLAIMED", "RESOLVED"
    private LocalDateTime timestamp;
    
    private String claimedByOrganization;
    private String actionTaken;
    
    private String reporterId;

    public Report() {
        this.timestamp = LocalDateTime.now();
        this.status = "PENDING";
    }
}
