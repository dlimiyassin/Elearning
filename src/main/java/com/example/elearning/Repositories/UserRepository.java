package com.example.elearning.Repositories;

import com.example.elearning.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository  extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    @Query(value = "SELECT * FROM user u WHERE u.role = 'TEACHER'", nativeQuery = true)
    List<User> findTeachers();
    @Query(value = "SELECT * FROM user u WHERE u.role = 'STUDENT'", nativeQuery = true)
    List<User> findStudents();
}
