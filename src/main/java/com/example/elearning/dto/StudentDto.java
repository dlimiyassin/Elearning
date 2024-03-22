package com.example.elearning.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentDto {
    int userId;
    int courseId;
    String title;
    int level;
    List<ChapterDto> chapters;
    List<TestDto> tests;
}
