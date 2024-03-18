package com.example.elearning.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChapterDto {
    int id;
    String title;
    String lien;
    int level;
   // String course_id;
}
