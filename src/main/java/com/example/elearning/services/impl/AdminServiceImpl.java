package com.example.elearning.services.impl;

import com.example.elearning.Repositories.UserRepository;
import com.example.elearning.dto.UserDto;
import com.example.elearning.entities.Role;
import com.example.elearning.entities.User;
import com.example.elearning.exceptions.UserAlreadyExistsException;
import com.example.elearning.requests.NewUser;
import com.example.elearning.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;

/* ******************************* Teacher CRUD ******************************** */

    @Override
    public List<UserDto> getAllTeachers() {
        List<User> teachers = userRepository.findTeachers();
        List<UserDto> teachersList = new ArrayList<>();
        for (User teacher:teachers){
            ModelMapper modelMapper = new ModelMapper();
            UserDto t = modelMapper.map(teacher, UserDto.class);
            teachersList.add(t);
        }
        return teachersList;
    }

    @Override
    public UserDto createTeacher(NewUser newUser) {
        Optional<User> existingUser = userRepository.findByEmail(newUser.getEmail());
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException("Teacher with email " + newUser.getEmail() + " already exists.");
        }
        try {
            var teacher = User.builder()
                    .firstname(newUser.getFirstname())
                    .lastname(newUser.getLastname())
                    .email(newUser.getEmail())
                    .password(passwordEncoder.encode(newUser.getPassword()))
                    .phone(newUser.getPhone())
                    .role(Role.TEACHER)
                    .build();
            User user = userRepository.save(teacher);
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(user, UserDto.class);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to create teacher: " + ex.getMessage(), ex);
        }
    }

    @Override
    public UserDto updateTeacher(NewUser newUser) {
        Optional<User> existingUser = userRepository.findByEmail(newUser.getEmail());
        if (existingUser.isEmpty()) {
            throw new UsernameNotFoundException("Teacher with email " + newUser.getEmail() + " does not exist.");
        }
        try {
            User updatedTeacher =existingUser.get();
            updatedTeacher.setFirstname(newUser.getFirstname());
            updatedTeacher.setLastname(newUser.getLastname());
            updatedTeacher.setPhone(newUser.getPhone());
            updatedTeacher.setPassword(passwordEncoder.encode(newUser.getPassword()));
            User user = userRepository.save(updatedTeacher);
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(user, UserDto.class);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to update teacher: " + ex.getMessage(), ex);
        }
    }

    @Override
    public void deleteTeacher(String email) {
        try {
            Optional<User> existingUser = userRepository.findByEmail(email);
            if (email.isEmpty()){
                throw new UsernameNotFoundException("No email provided in the parameter.");
            }else if (existingUser.isEmpty()) {
                throw new UsernameNotFoundException("Teacher with email " + email + " does not exist.");
            }else {
                userRepository.delete(existingUser.get());
            }
        } catch (UsernameNotFoundException ex) {
            throw new UsernameNotFoundException(ex.getMessage(), ex);
        }
    }

/* ******************************* Student CRUD ******************************** */


    @Override
    public List<UserDto> getAllStudents() {
        List<User> students = userRepository.findStudents();
        List<UserDto> studentsList = new ArrayList<>();
        for (User student:students){
            ModelMapper modelMapper = new ModelMapper();
            UserDto t = modelMapper.map(student, UserDto.class);
            studentsList.add(t);
        }
        return studentsList;
    }

    @Override
    public UserDto createStudent(NewUser newUser) {
        Optional<User> existingUser = userRepository.findByEmail(newUser.getEmail());
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException("Student with email " + newUser.getEmail() + " already exists.");
        }
        try {
            var student = User.builder()
                    .firstname(newUser.getFirstname())
                    .lastname(newUser.getLastname())
                    .email(newUser.getEmail())
                    .password(passwordEncoder.encode(newUser.getPassword()))
                    .phone(newUser.getPhone())
                    .role(Role.STUDENT)
                    .build();
            User user = userRepository.save(student);
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(user, UserDto.class);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to create student: " + ex.getMessage(), ex);
        }
    }

    @Override
    public UserDto updateStudent(NewUser newUser) {
        Optional<User> existingUser = userRepository.findByEmail(newUser.getEmail());
        if (existingUser.isEmpty()) {
            throw new UsernameNotFoundException("Student with email " + newUser.getEmail() + " does not exist.");
        }
        try {
            User updatedStudent =existingUser.get();
            updatedStudent.setFirstname(newUser.getFirstname());
            updatedStudent.setLastname(newUser.getLastname());
            updatedStudent.setPhone(newUser.getPhone());
            updatedStudent.setPassword(passwordEncoder.encode(newUser.getPassword()));
            User user = userRepository.save(updatedStudent);
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(user, UserDto.class);
        } catch (Exception ex) {
            throw new RuntimeException("Failed to update student: " + ex.getMessage(), ex);
        }
    }

    @Override
    public void deleteStudent(String email) {
        try {
            Optional<User> existingUser = userRepository.findByEmail(email);
            if (email.isEmpty()){
                throw new UsernameNotFoundException("No email provided in the parameter.");
            }else if (existingUser.isEmpty()) {
                throw new UsernameNotFoundException("Student with email " + email + " does not exist.");
            }else {
                userRepository.delete(existingUser.get());
            }
        } catch (UsernameNotFoundException ex) {
            throw new UsernameNotFoundException(ex.getMessage(), ex);
        }
    }
}
