package com.example.elearning.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue
    private Integer id;

    @Column
    private String title;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Chapter> chapters;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Test> tests;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CourseUser> users;

}
