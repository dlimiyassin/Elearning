package com.example.elearning.responses;

import com.example.elearning.dto.ChapterDto;
import com.example.elearning.dto.TestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentResponse {
    int userId;
    int courseId;
    String title;
    int level;
    List<ChapterResponse> chapters;
    List<TestResponse> tests;
}
