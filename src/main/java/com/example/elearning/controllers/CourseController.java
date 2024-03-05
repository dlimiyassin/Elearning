package com.example.elearning.controllers;

import com.example.elearning.dto.CourseDto;
import com.example.elearning.entities.Course;
import com.example.elearning.responses.CourseResponse;
import com.example.elearning.services.CourseService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@RequestMapping("/api/admin/course")
@RestController
public class CourseController {
    @Autowired
    CourseService courseService;
    @GetMapping
    public ResponseEntity<List<CourseResponse>> getCourses() {
        List<CourseDto> courseList = courseService.getCourses();
        Type listType = new TypeToken<List<CourseResponse>>() {}.getType();
        List<CourseResponse> coursesResponse = new ModelMapper().map(courseList, listType);
        return new ResponseEntity<>(coursesResponse, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course response = courseService.createCourse(course);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PutMapping
    public ResponseEntity<Course> editCourse(@RequestBody Course course,@RequestParam("title") String title) {
        Course response = courseService.editCourse(course,title);
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
    @DeleteMapping
    public ResponseEntity<Object> deleteCourse(@RequestParam("title") String title) {
        courseService.deleteCourse(title);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/setting")
    public ResponseEntity<Boolean> setCourseToUser(@RequestParam("email") String email, @RequestParam("title") String title){
        Boolean rep = courseService.setCourseToUser(email,title);
        return new ResponseEntity<>(rep,HttpStatus.OK);
    }
}
