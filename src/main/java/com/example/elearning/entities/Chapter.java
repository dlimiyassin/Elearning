package com.example.elearning.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "chapter")
public class Chapter {
    @Id
    @GeneratedValue
    private Integer id;
    @Column
    private  String title;
    @Column
    private String lien;
    @Column
    private int level;
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

}
