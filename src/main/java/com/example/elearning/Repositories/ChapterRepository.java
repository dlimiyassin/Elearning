package com.example.elearning.Repositories;

import com.example.elearning.entities.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ChapterRepository extends JpaRepository<Chapter,Integer> {
    @Query(nativeQuery = true, value = "SELECT * FROM chapter C WHERE C.course_id = ?1 AND C.level = ?2")
    List<Chapter> findChapters(int courseId, int level);
}
