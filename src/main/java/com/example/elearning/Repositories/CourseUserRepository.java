package com.example.elearning.Repositories;

import com.example.elearning.entities.CourseUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseUserRepository extends JpaRepository<CourseUser, Integer> {
}
