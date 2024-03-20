package com.example.elearning.requests;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TestRequest {
     String question;
     String response_1;
     String response_2;
     String response_3;
     String response_4;
     String response_correct;
     int level;
     int course_id;
}
