package com.example.elearning.services.impl;

import com.example.elearning.Repositories.CourseRepository;
import com.example.elearning.Repositories.CourseUserRepository;
import com.example.elearning.Repositories.UserRepository;
import com.example.elearning.dto.CourseDto;
import com.example.elearning.entities.Course;
import com.example.elearning.entities.CourseUser;
import com.example.elearning.entities.User;
import com.example.elearning.exceptions.UserAlreadyExistsException;
import com.example.elearning.services.CourseService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    CourseUserRepository courseUserRepository;

    @Override
    public List<CourseDto> getCourses() {
        List<Course> courseList = courseRepository.findAll();
        Type listType = new TypeToken<List<CourseDto>>() {}.getType();
        return new ModelMapper().map(courseList, listType);
    }

    @Override
    public Course createCourse(Course course) {
        Optional<Course> course1 = courseRepository.findByTitle(course.getTitle());
        if (course1.isPresent()) throw new UserAlreadyExistsException("This course already exists!");
        return courseRepository.save(course);
    }

    @Override
    public void deleteCourse(String title) {
        Optional<Course> courseList = courseRepository.findByTitle(title);
        if (courseList.isEmpty()) throw new UsernameNotFoundException("The title provided does not exist!");
        courseRepository.delete(courseList.get());
    }

    @Override
    public Course editCourse(Course course, String title) {
        Optional<Course> course1 = courseRepository.findByTitle(title);
        if (course1.isEmpty()) throw new UsernameNotFoundException("This course does not exist!");
        course1.get().setTitle(course.getTitle());
        return courseRepository.save(course1.get());
    }

    @Override
    public void setCourseToUser(String email, String title) {
        if (email.isEmpty()) throw new UsernameNotFoundException("No email provided");
        if (title.isEmpty()) throw new UsernameNotFoundException("No course provided");
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("This email: " + email + " does not exist"));
        Optional<Course> course = courseRepository.findByTitle(title);


    }


}
