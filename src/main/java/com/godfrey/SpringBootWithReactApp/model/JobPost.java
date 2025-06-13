package com.godfrey.SpringBootWithReactApp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "JobPost")
@TypeAlias("JobPost")
public class JobPost {
    @Id
    private String id;
    private String profile;
    private String description;
    private int experience;
    private List<String> techs;

    public JobPost() {}

    public JobPost(String profile, String description, int experience, List<String> techs) {
        this.profile = profile;
        this.description = description;
        this.experience = experience;
        this.techs = techs;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getProfile() { return profile; }
    public void setProfile(String profile) { this.profile = profile; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getExperience() { return experience; }
    public void setExperience(int experience) { this.experience = experience; }

    public List<String> getTechs() { return techs; }
    public void setTechs(List<String> techs) { this.techs = techs; }

    @Override
    public String toString() {
        return "JobPost{" +
                "id='" + id + '\'' +
                ", profile='" + profile + '\'' +
                ", description='" + description + '\'' +
                ", experience=" + experience +
                ", techs=" + techs +
                '}';
    }
}
