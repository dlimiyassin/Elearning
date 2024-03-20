package com.example.elearning.responses;

import com.example.elearning.dto.ChapterDto;
import com.example.elearning.dto.TestDto;
import com.example.elearning.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CourseResponse {
    int id;
    String title;
    //List<UserDto> users;
    List<ChapterResponse> chapters;
    List<TestResponse> tests;
}
