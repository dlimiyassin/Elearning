package com.example.elearning.controllers;

import com.example.elearning.dto.CourseDto;
import com.example.elearning.responses.CourseResponse;
import com.example.elearning.services.TeacherService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.List;

@RestController
@RequestMapping("/api/teacher")
@RequiredArgsConstructor
public class TeacherController {
    @Autowired
    TeacherService teacherService;
    @GetMapping
    public ResponseEntity<List<CourseResponse>> getCourses(@RequestParam("email") String email) {
        List<CourseDto> courseList = teacherService.getCourses(email);
        Type listType = new TypeToken<List<CourseResponse>>() {}.getType();
        List<CourseResponse> coursesResponse = new ModelMapper().map(courseList, listType);
        return new ResponseEntity<>(coursesResponse, HttpStatus.OK);
    }
}
