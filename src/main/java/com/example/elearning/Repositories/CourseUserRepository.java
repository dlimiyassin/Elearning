package com.example.elearning.Repositories;

import com.example.elearning.entities.CourseUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CourseUserRepository extends JpaRepository<CourseUser, Integer> {
   @Query(nativeQuery = true, value = "SELECT * FROM course_user C WHERE C.user_id = ?1 AND C.course_id= ?2")
    Optional<CourseUser> findMatch(int userId, int courseId);

    @Query(nativeQuery = true, value = "SELECT * FROM course_user C WHERE C.user_id = ?1")
    Optional<List<CourseUser>> findCourses(int userId);
}
