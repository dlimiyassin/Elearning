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
@Table(name = "test")
public class Test {
    @Id
    @GeneratedValue
    private Integer id;
    @Column
    private String question;
    @Column
    private String response_1;
    @Column
    private String response_2;
    @Column
    private String response_3;
    @Column
    private String response_4;
    @Column
    private String response_correct;
    @Column
    private int level;
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course_id;
}
