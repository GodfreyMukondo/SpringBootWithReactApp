package com.godfrey.SpringBootWithReactApp.repository;

import com.godfrey.SpringBootWithReactApp.model.JobPost;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface JobPostRepository extends MongoRepository<JobPost, String> {
    List<JobPost> findByProfileContainingIgnoreCase(String profile);
}
