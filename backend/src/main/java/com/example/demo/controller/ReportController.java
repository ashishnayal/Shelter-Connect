package com.example.demo.controller;

import com.example.demo.model.Report;
import com.example.demo.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportRepository reportRepository;

    @PostMapping
    public ResponseEntity<Report> createReport(@RequestBody Report report) {
        Report savedReport = reportRepository.save(report);
        return ResponseEntity.ok(savedReport);
    }

    @GetMapping
    public ResponseEntity<List<Report>> getAllReports() {
        List<Report> reports = reportRepository.findAll();
        // Sort by timestamp descending
        reports.sort((a, b) -> b.getTimestamp().compareTo(a.getTimestamp()));
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/user/{reporterId}")
    public ResponseEntity<List<Report>> getUserReports(@PathVariable String reporterId) {
        List<Report> reports = reportRepository.findAll();
        // Filter by reporterId
        reports.removeIf(r -> r.getReporterId() == null || !r.getReporterId().equals(reporterId));
        reports.sort((a, b) -> b.getTimestamp().compareTo(a.getTimestamp()));
        return ResponseEntity.ok(reports);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReport(@PathVariable String id, @RequestBody Report updateData) {
        return reportRepository.findById(id).<ResponseEntity<?>>map(existingReport -> {
            // Prevent double claiming unless it's just an action update by the same org
            if (updateData.getStatus() != null && updateData.getStatus().equals("CLAIMED") || updateData.getStatus().equals("RESOLVED")) {
                if (!existingReport.getStatus().equals("PENDING") && 
                    existingReport.getClaimedByOrganization() != null && 
                    !existingReport.getClaimedByOrganization().equals(updateData.getClaimedByOrganization())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body("Report already claimed by another organization");
                }
            }

            if (updateData.getStatus() != null) {
                existingReport.setStatus(updateData.getStatus());
            }
            if (updateData.getClaimedByOrganization() != null) {
                existingReport.setClaimedByOrganization(updateData.getClaimedByOrganization());
            }
            if (updateData.getActionTaken() != null) {
                existingReport.setActionTaken(updateData.getActionTaken());
            }
            return ResponseEntity.ok(reportRepository.save(existingReport));
        }).orElse(ResponseEntity.notFound().build());
    }
}
