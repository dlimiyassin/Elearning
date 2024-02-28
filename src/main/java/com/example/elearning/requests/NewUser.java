package com.example.elearning.requests;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class NewUser {
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String password;
}

