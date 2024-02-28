package com.example.elearning.controllers;

import com.example.elearning.dto.UserDto;
import com.example.elearning.requests.NewUser;
import com.example.elearning.responses.UserResponse;
import com.example.elearning.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    @Autowired
    AdminService adminService;

/* ******************************* Teacher CRUD ******************************** */

    @GetMapping
    public ResponseEntity<UserResponse> getUser(@RequestParam("email") String email){
        UserDto userDto = adminService.getUser(email);
        ModelMapper modelMapper = new ModelMapper();
        UserResponse userResponse = modelMapper.map(userDto, UserResponse.class);
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }
    @GetMapping("/teacher")
    public ResponseEntity<List<UserResponse>> getAllTeachers(){
        List<UserDto> userDtoList = adminService.getAllTeachers();
        List<UserResponse> userResponse = new ArrayList<>();
        for (UserDto userDto:userDtoList){
            ModelMapper modelMapper = new ModelMapper();
            UserResponse teacher = modelMapper.map(userDto, UserResponse.class);
            userResponse.add(teacher);
        }
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    @PostMapping("/teacher")
    public ResponseEntity<UserResponse> createTeacher(@RequestBody NewUser newUser){
        UserDto userDto = adminService.createTeacher(newUser);
        ModelMapper modelMapper = new ModelMapper();
        UserResponse teacher = modelMapper.map(userDto, UserResponse.class);
        return new ResponseEntity<>(teacher,HttpStatus.CREATED);
    }

    @PutMapping("/teacher")
    public ResponseEntity<UserResponse> updateTeacher(@RequestBody NewUser newUser){
        UserDto userDto = adminService.updateTeacher(newUser);
        ModelMapper modelMapper = new ModelMapper();
        UserResponse teacher = modelMapper.map(userDto, UserResponse.class);
        return new ResponseEntity<>(teacher,HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/teacher")
    public ResponseEntity<Object> deleteTeacher(@RequestParam("email") String email){
        adminService.deleteTeacher(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

/* ******************************* Student CRUD ******************************** */

    @GetMapping("/student")
    public ResponseEntity<List<UserResponse>> getAllStudents(){
        List<UserDto> userDtoList = adminService.getAllStudents();
        List<UserResponse> userResponse = new ArrayList<>();
        for (UserDto userDto:userDtoList){
            ModelMapper modelMapper = new ModelMapper();
            UserResponse teacher = modelMapper.map(userDto, UserResponse.class);
            userResponse.add(teacher);
        }
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    @PostMapping("/student")
    public ResponseEntity<UserResponse> createStudent(@RequestBody NewUser newUser){
        UserDto userDto = adminService.createStudent(newUser);
        ModelMapper modelMapper = new ModelMapper();
        UserResponse teacher = modelMapper.map(userDto, UserResponse.class);
        return new ResponseEntity<>(teacher,HttpStatus.CREATED);
    }

    @PutMapping("/student")
    public ResponseEntity<UserResponse> updateStudent(@RequestBody NewUser newUser){
        UserDto userDto = adminService.updateStudent(newUser);
        ModelMapper modelMapper = new ModelMapper();
        UserResponse teacher = modelMapper.map(userDto, UserResponse.class);
        return new ResponseEntity<>(teacher,HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/student")
    public ResponseEntity<Object> deleteStudent(@RequestParam("email") String email){
        adminService.deleteStudent(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
