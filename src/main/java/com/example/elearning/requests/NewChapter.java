package com.example.elearning.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class NewChapter {
    String title;
    String lien;
    int level;
    int course_id;
}
