package com.example.elearning.Repositories;

import com.example.elearning.entities.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TestRepository extends JpaRepository<Test, Integer> {
    @Query(nativeQuery = true, value = "SELECT * FROM test C WHERE C.course_id = ?1 AND C.level = ?2")
    List<Test> findTests(int courseId, int level);
}
