package com.example.elearning.services.impl;

import com.example.elearning.Repositories.*;
import com.example.elearning.dto.ChapterDto;
import com.example.elearning.dto.CourseDto;
import com.example.elearning.dto.TestDto;
import com.example.elearning.entities.*;
import com.example.elearning.requests.NewTest;
import com.example.elearning.services.TeacherService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Type;
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
    @Autowired
    ChapterRepository chapterRepository;
    @Autowired
    TestRepository testRepository;
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
    public ChapterDto addChapter(ChapterDto chapterDto) {
        Optional<Course> course = courseRepository.findById(chapterDto.getCourse_id());
        if (course.isEmpty()) throw new UsernameNotFoundException("this provided course_id does not exist");
        Chapter chapter = new ModelMapper().map(chapterDto, Chapter.class);
        chapter.setCourse(course.get());
        Chapter savedChapter = chapterRepository.save(chapter);
    return new ModelMapper().map(savedChapter, ChapterDto.class);
    }

    @Override
    public ChapterDto editChapter(int id, ChapterDto chapterDto) {
        Optional<Chapter> chapter = chapterRepository.findById(id);
        if (chapter.isEmpty()) throw new UsernameNotFoundException("Chapter with this id : "+id+" does not exit");
        chapter.get().setTitle(chapterDto.getTitle());
        chapter.get().setLien(chapterDto.getLien());
        Chapter updatedChapter = chapterRepository.save(chapter.get());
        return new ModelMapper().map(updatedChapter, ChapterDto.class);
    }

    @Override
    public void deleteChapter(int id) {
        Optional<Chapter> chapter = chapterRepository.findById(id);
        if (chapter.isEmpty()) throw new UsernameNotFoundException("Chapter with this id : "+id+" does not exit");
        chapterRepository.delete(chapter.get());
    }

    @Override
    public TestDto addTest(NewTest newTest) {
        Optional<Course> course = courseRepository.findById(newTest.getCourse_id());
        if (course.isEmpty()) throw new UsernameNotFoundException("Course with id  : "+newTest.getCourse_id()+" does not exist");
        Test test = new ModelMapper().map(newTest, Test.class);
        test.setCourse(course.get());
        return new ModelMapper().map(testRepository.save(test),TestDto.class);
    }

    @Override
    public TestDto editTest(int id, NewTest updatedTest) {
        Optional<Test> test = testRepository.findById(id);
        if (test.isEmpty()) throw new UsernameNotFoundException("Test with this id '" +id+ "' does not exist");
        test.get().setQuestion(updatedTest.getQuestion());
        test.get().setResponse_1(updatedTest.getResponse_1());
        test.get().setResponse_2(updatedTest.getResponse_2());
        test.get().setResponse_3(updatedTest.getResponse_3());
        test.get().setResponse_4(updatedTest.getResponse_4());
        test.get().setResponse_correct(updatedTest.getResponse_correct());
        return new ModelMapper().map(testRepository.save(test.get()), TestDto.class);
    }

    @Override
    public void deleteTest(int id) {
        Optional<Test> test = testRepository.findById(id);
        if (test.isEmpty()) throw new UsernameNotFoundException("Test with this id '" +id+ "' does not exist");
        testRepository.deleteById(id);
    }


}
