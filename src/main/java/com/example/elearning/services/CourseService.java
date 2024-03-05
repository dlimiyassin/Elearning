package com.example.elearning.services;

import com.example.elearning.dto.CourseDto;
import com.example.elearning.entities.Course;
import java.util.List;

public interface CourseService {
    List<CourseDto> getCourses();

    Course createCourse(Course course);

    void deleteCourse(String title);

    Course editCourse(Course course, String title);

    Boolean setCourseToUser(String email, String title);
}
