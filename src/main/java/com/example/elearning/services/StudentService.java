package com.example.elearning.services;

import com.example.elearning.dto.CourseDto;
import com.example.elearning.dto.StudentDto;

import java.util.List;

public interface StudentService {
    List<CourseDto> getCourses(String email);

    StudentDto getCourse(String email, int courseId);
}
