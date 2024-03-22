package com.example.elearning.controllers;

import com.example.elearning.dto.ChapterDto;
import com.example.elearning.dto.CourseDto;
import com.example.elearning.dto.TestDto;
import com.example.elearning.requests.NewChapter;
import com.example.elearning.requests.NewTest;
import com.example.elearning.responses.ChapterResponse;
import com.example.elearning.responses.CourseResponse;
import com.example.elearning.responses.TestResponse;
import com.example.elearning.services.TeacherService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.List;

@RestController
@RequestMapping("/api/teacher")
@RequiredArgsConstructor
public class TeacherController {
    @Autowired
    TeacherService teacherService;


    /*****************************  chapter crud  ********************************/


    @GetMapping
    public ResponseEntity<List<CourseResponse>> getCourses(@RequestParam("email") String email) {
        List<CourseDto> courseList = teacherService.getCourses(email);
        Type listType = new TypeToken<List<CourseResponse>>() {}.getType();
        List<CourseResponse> coursesResponse = new ModelMapper().map(courseList, listType);
        return new ResponseEntity<>(coursesResponse, HttpStatus.OK);
    }

    @GetMapping("/course")
    public ResponseEntity<CourseResponse> getCourse(@RequestParam("id") int id) {
        CourseDto course = teacherService.getCourse(id);
        CourseResponse courseResponse = new ModelMapper().map(course, CourseResponse.class);
        return new ResponseEntity<>(courseResponse, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ChapterResponse> addChapter(@RequestBody NewChapter chapter){
        ChapterDto chapterDto = new ModelMapper().map(chapter, ChapterDto.class);
        ChapterDto newChapter = teacherService.addChapter(chapterDto);
        ChapterResponse result = new ModelMapper().map(newChapter, ChapterResponse.class);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<ChapterResponse> editChapter(@RequestBody NewChapter chapter, @RequestParam("id") int id){
        ChapterDto chapterDto = new ModelMapper().map(chapter, ChapterDto.class);
        ChapterDto newChapter = teacherService.editChapter(id,chapterDto);
        ChapterResponse result = new ModelMapper().map(newChapter, ChapterResponse.class);
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
    }
    @DeleteMapping
    public ResponseEntity<Object> deleteChapter(@RequestParam("id") int id){
        teacherService.deleteChapter(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    /*****************************  test crud  ********************************/
    @PostMapping("/test")
    public ResponseEntity<TestResponse> addTest(@RequestBody NewTest newTest){
        TestDto testDto = teacherService.addTest(newTest);
        return new ResponseEntity<>(
                new ModelMapper().map(testDto,TestResponse.class),
                HttpStatus.CREATED);
    }

    @PutMapping("/test")
    public ResponseEntity<TestResponse> editTest(@RequestBody NewTest updatedTest, @RequestParam("id") int id){
        TestDto testDto = teacherService.editTest(id,updatedTest);
        return new ResponseEntity<>(
                new ModelMapper().map(testDto,TestResponse.class),
                HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/test")
    public ResponseEntity<Object> deleteTest(@RequestParam("id") int id){
        teacherService.deleteTest(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
