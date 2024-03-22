package com.example.elearning.services.impl;

import com.example.elearning.Repositories.*;
import com.example.elearning.dto.ChapterDto;
import com.example.elearning.dto.CourseDto;
import com.example.elearning.dto.StudentDto;
import com.example.elearning.dto.TestDto;
import com.example.elearning.entities.*;
import com.example.elearning.services.StudentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    CourseUserRepository courseUserRepository;
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    ChapterRepository chapterRepository;
    @Autowired
    TestRepository testRepository;
    @Override
    public List<CourseDto> getCourses(String email) {
        Optional<User> student = userRepository.findByEmail(email);
        if (student.isEmpty()) throw new UsernameNotFoundException("Student with email : "+email+ " does not exist");
        Optional<List<CourseUser>> courseUsers = courseUserRepository.findCourses(student.get().getId());
        List<CourseDto> courseDtos = new ArrayList<>();
        for (CourseUser c:courseUsers.get()){
            Optional<Course> course = courseRepository.findById(c.getCourse().getId());

            CourseDto courseDto = new CourseDto();

            courseDto.setId(course.get().getId());
            courseDto.setTitle(course.get().getTitle());
            Type listType = new TypeToken<List<ChapterDto>>() {}.getType();
            List<ChapterDto> chapterDtos = new ModelMapper().map(course.get().getChapters(), listType);
            courseDto.setChapters(chapterDtos);

            listType = new TypeToken<List<TestDto>>() {}.getType();
            List<TestDto> testDtos = new ModelMapper().map(course.get().getTests(), listType);
            courseDto.setTests(testDtos);

            courseDtos.add(courseDto);
        }
        return courseDtos;
    }

    @Override
    public StudentDto getCourse(String email, int courseId) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) throw new UsernameNotFoundException("User with this email : '"+email+"' does not exist");

        Optional<CourseUser> courseUser = courseUserRepository.findCourse(user.get().getId(),courseId);
        if (courseUser.isEmpty()) throw new UsernameNotFoundException("there is no link between user n : "+user.get().getId()+ " and course n :"+ courseId);

        Optional<Course> courseEntity = courseRepository.findById(courseId);

        List<Chapter> chapters = chapterRepository.findChapters(courseId,courseUser.get().getLevel());
        Type listType = new TypeToken<List<ChapterDto>>() {}.getType();
        List<ChapterDto> chapterDtos = new ModelMapper().map(chapters, listType);

        List<Test> tests = testRepository.findTests(courseId,courseUser.get().getLevel());
        listType = new TypeToken<List<TestDto>>() {}.getType();
        List<TestDto> testDtos = new ModelMapper().map(tests, listType);

        StudentDto studentDto = new StudentDto();
        studentDto.setCourseId(courseUser.get().getCourse().getId());
        studentDto.setUserId(courseUser.get().getUser().getId());
        studentDto.setTitle(courseEntity.get().getTitle());
        studentDto.setLevel(courseUser.get().getLevel());
        studentDto.setChapters(chapterDtos);
        studentDto.setTests(testDtos);
        return studentDto;
    }
}
