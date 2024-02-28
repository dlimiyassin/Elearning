package com.example.elearning.services;

import com.example.elearning.dto.UserDto;
import com.example.elearning.requests.NewUser;

import java.util.List;

public interface AdminService {
    List<UserDto> getAllTeachers();

    UserDto createTeacher(NewUser newUser);

    UserDto updateTeacher(NewUser newUser);

    void deleteTeacher(String email);

    List<UserDto> getAllStudents();

    UserDto createStudent(NewUser newUser);

    UserDto updateStudent(NewUser newUser);

    void deleteStudent(String email);

    UserDto getUser(String email);
}
