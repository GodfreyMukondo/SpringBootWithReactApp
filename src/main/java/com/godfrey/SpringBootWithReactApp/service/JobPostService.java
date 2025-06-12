package com.godfrey.SpringBootWithReactApp.service;

import com.godfrey.SpringBootWithReactApp.model.JobPost;
import com.godfrey.SpringBootWithReactApp.repository.JobPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class JobPostService {
    private static final Logger logger = Logger.getLogger(JobPostService.class.getName());

    @Autowired
    private JobPostRepository repository;

    public List<JobPost> getAllJobs() {
        return repository.findAll();
    }

    public Optional<JobPost> getJobById(String id) {
        return repository.findById(id);
    }

    public List<JobPost> searchByProfile(String profile) {
        return repository.findByProfileContainingIgnoreCase(profile);
    }

    public JobPost addJob(JobPost job) {
        job.setId(null);
        logger.info("Adding new job post: " + job.toString());
        return repository.save(job);
    }

    public JobPost updateJob(String id, JobPost updatedJob) {
        logger.info("Updating job with ID: " + id);
        logger.info("Updated job payload: " + updatedJob.toString());

        return repository.findById(id).map(existingJob -> {
            existingJob.setProfile(updatedJob.getProfile());
            existingJob.setDescription(updatedJob.getDescription());
            existingJob.setExperience(updatedJob.getExperience());

            // Cleaning the techs list by trimming each element
            List<String> cleanedTechs = updatedJob.getTechs().stream()
                    .map(String::trim)
                    .collect(Collectors.toList());

            existingJob.setTechs(cleanedTechs);
            logger.info("Job updated in memory: " + existingJob.toString());
            return repository.save(existingJob);
        }).orElseThrow(() -> {
            logger.warning("Job not found with ID: " + id);
            return new RuntimeException("Job not found with ID: " + id);
        });
    }


    public void deleteJob(String id) {
        logger.info("Deleting job with ID: " + id);
        repository.deleteById(id);
    }
}
