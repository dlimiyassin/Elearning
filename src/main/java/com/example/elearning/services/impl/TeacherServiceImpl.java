package com.example.elearning.services.impl;

import com.example.elearning.Repositories.CourseRepository;
import com.example.elearning.Repositories.CourseUserRepository;
import com.example.elearning.Repositories.UserRepository;
import com.example.elearning.dto.ChapterDto;
import com.example.elearning.dto.CourseDto;
import com.example.elearning.entities.Chapter;
import com.example.elearning.entities.Course;
import com.example.elearning.entities.CourseUser;
import com.example.elearning.entities.User;
import com.example.elearning.services.TeacherService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TeacherServiceImpl implements TeacherService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    CourseUserRepository courseUserRepository;
    @Autowired
    CourseRepository courseRepository;
    @Override
    public List<CourseDto> getCourses(String email) {
        Optional<User> teacher = userRepository.findByEmail(email);
        if (teacher.isEmpty()) throw new UsernameNotFoundException("Teacher with email : "+email+ " does not exist");
        Optional<List<CourseUser>> courseUsers = courseUserRepository.findCourses(teacher.get().getId());
        List<CourseDto> courseDtos = new ArrayList<>();
        for (CourseUser c:courseUsers.get()){
            Optional<Course> course = courseRepository.findById(c.getCourse().getId());
            CourseDto courseDto = new CourseDto();
            courseDto.setId(course.get().getId());
            courseDto.setTitle(course.get().getTitle());
            List<ChapterDto> chapterDtos = new ArrayList<>();
            for (Chapter chapter: course.get().getChapters()){
                ChapterDto chapterDto = new ChapterDto();
                chapterDto.setId(chapter.getId());
                chapterDto.setTitle(chapter.getTitle());
                chapterDto.setLien(chapter.getLien());
                chapterDto.setLevel(chapter.getLevel());
                chapterDtos.add(chapterDto);
            }
            courseDto.setChapters(chapterDtos);
            courseDtos.add(courseDto);
        }
        return courseDtos;
    }
}
