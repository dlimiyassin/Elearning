package com.example.elearning.dto;

import com.example.elearning.entities.CourseUser;
import com.example.elearning.entities.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto implements Serializable {

    private int id;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String phone;
    private String picture;
    private Role role;
    private List<CourseUser> courses;
}
