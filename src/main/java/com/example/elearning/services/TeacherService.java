package com.example.elearning.services;

import com.example.elearning.dto.ChapterDto;
import com.example.elearning.dto.CourseDto;
import com.example.elearning.dto.TestDto;
import com.example.elearning.requests.TestRequest;

import java.util.List;

public interface TeacherService {
    List<CourseDto> getCourses(String email);
    ChapterDto addChapter(ChapterDto chapterDto);

    ChapterDto editChapter(int id, ChapterDto chapterDto);

    void deleteChapter(int id);

    TestDto addTest(TestRequest newTest);

    TestDto editTest(int id, TestRequest updatedTest);

    void deleteTest(int id);
}
