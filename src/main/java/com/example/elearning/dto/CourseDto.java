package com.example.elearning.dto;

import com.example.elearning.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CourseDto {
    int id;
    String title;
    List<UserDto> users;
    // tests
    //chapters
    //
}
