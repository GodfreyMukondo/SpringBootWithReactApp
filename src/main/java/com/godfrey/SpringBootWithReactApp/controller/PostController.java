package com.godfrey.SpringBootWithReactApp.controller;

import com.godfrey.SpringBootWithReactApp.model.JobPost;
import com.godfrey.SpringBootWithReactApp.service.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/jobs")
public class PostController {

    @Autowired
    private JobPostService service;

    // Get all jobs
    @GetMapping
    public List<JobPost> getAllJobs() {
        return service.getAllJobs();
    }

    // Get a job by its ID
    @GetMapping("/{id}")
    public ResponseEntity<JobPost> getJobById(@PathVariable String id) {
        JobPost jobPost = service.getJobById(id).orElse(null);

        if (jobPost == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // return 404 if not found
        }

        return ResponseEntity.ok(jobPost); // return 200 with the job post data
    }

    // Search jobs by profile
    @GetMapping("/search")
    public List<JobPost> searchJobs(@RequestParam String profile) {
        return service.searchByProfile(profile);
    }

    // Add a new job post
    @PostMapping
    public ResponseEntity<JobPost> addJob(@RequestBody JobPost job) {
        JobPost addedJob = service.addJob(job);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedJob); // return 201 with the added job
    }

    // Update an existing job post
    @PutMapping("/{id}")
    public ResponseEntity<JobPost> updateJob(@PathVariable String id, @RequestBody JobPost updatedJob) {
        JobPost existingJob = service.getJobById(id).orElse(null);

        if (existingJob == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // return 404 if not found
        }

        // Ensuring that the ID is retained and correct in the update
        updatedJob.setId(id);
        JobPost updatedJobPost = service.updateJob(id, updatedJob);
        return ResponseEntity.ok(updatedJobPost); // return 200 with the updated job
    }

    // Delete a job post
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable String id) {
        JobPost existingJob = service.getJobById(id).orElse(null);

        if (existingJob == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // return 404 if not found
        }

        service.deleteJob(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
