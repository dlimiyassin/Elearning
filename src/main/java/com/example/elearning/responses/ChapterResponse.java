package com.example.elearning.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChapterResponse {
    int id;
    String title;
    String lien;
    int level;
}
