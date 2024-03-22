package com.example.elearning.services;

import com.example.elearning.dto.ChapterDto;
import com.example.elearning.dto.CourseDto;
import com.example.elearning.dto.TestDto;
import com.example.elearning.requests.NewTest;

import java.util.List;

public interface TeacherService {
    List<CourseDto> getCourses(String email);
    ChapterDto addChapter(ChapterDto chapterDto);

    ChapterDto editChapter(int id, ChapterDto chapterDto);

    void deleteChapter(int id);

    TestDto addTest(NewTest newTest);

    TestDto editTest(int id, NewTest updatedTest);

    void deleteTest(int id);

    CourseDto getCourse(int id);
}
