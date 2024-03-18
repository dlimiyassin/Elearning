package com.example.elearning.services;

import com.example.elearning.dto.CourseDto;

import java.util.List;

public interface TeacherService {
    List<CourseDto> getCourses(String email);
}
