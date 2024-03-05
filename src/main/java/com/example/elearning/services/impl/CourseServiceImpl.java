package com.example.elearning.services.impl;

import com.example.elearning.Repositories.CourseRepository;
import com.example.elearning.Repositories.CourseUserRepository;
import com.example.elearning.Repositories.UserRepository;
import com.example.elearning.dto.CourseDto;
import com.example.elearning.dto.UserDto;
import com.example.elearning.entities.Course;
import com.example.elearning.entities.CourseUser;
import com.example.elearning.entities.User;
import com.example.elearning.exceptions.UserAlreadyExistsException;
import com.example.elearning.services.CourseService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
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
        List<CourseDto> courseDtoList = new ArrayList<>();

        for (Course course : courseList) {
            CourseDto courseDto = new CourseDto();
            courseDto.setId(course.getId());
            courseDto.setTitle(course.getTitle());

            // Map users to user DTOs
            List<UserDto> userDtoList = new ArrayList<>();
            for (CourseUser courseUser : course.getUsers()) {
                User user = courseUser.getUser();
                UserDto userDto = new UserDto();
                userDto.setId(user.getId());
                userDto.setFirstname(user.getFirstname());
                userDto.setLastname(user.getLastname());
                userDto.setEmail(user.getEmail());
                userDto.setPhone(user.getPhone());
                userDto.setRole(user.getRole());
                userDtoList.add(userDto);
            }
            courseDto.setUsers(userDtoList);

            courseDtoList.add(courseDto);
        }

        return courseDtoList;
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
    public Boolean setCourseToUser(String email, String title) {
        if (email.isEmpty()) throw new UsernameNotFoundException("No email provided");
        if (title.isEmpty()) throw new UsernameNotFoundException("No course provided");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User with email " + email + " not found"));

        Course course = courseRepository.findByTitle(title)
                .orElseThrow(() -> new UsernameNotFoundException("Course with title " + title + " not found"));

        Optional<CourseUser> course_user = courseUserRepository.findMatch(user.getId(),course.getId());
        if (course_user.isPresent()) {
            courseUserRepository.delete(course_user.get());
            return false;
        }else{
            CourseUser courseUser = new CourseUser();
            courseUser.setUser(user);
            courseUser.setCourse(course);
            courseUser.setLevel(0);
            courseUserRepository.save(courseUser);
            return true;
        }
    }
}
