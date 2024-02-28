package com.example.elearning.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserResponse {
    private int id;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String picture;
}
