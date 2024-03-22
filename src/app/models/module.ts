import { Chapter } from './chapter';
import { Test } from './test';

export class Module {
  userId: number;
  courseId: number;
  title: string;
  level: number;
  chapters: Chapter[] = [];
  tests: Test[] = [];
  constructor(
    userId: number,
    courseId: number,
    title: string,
    level: number,
    chapters: Chapter[],
    tests: Test[] = []
  ) {
    this.userId = userId;
    this.courseId = courseId;
    this.title = title;
    this.level = level;
    this.chapters = chapters;
    this.tests = tests;
  }
}
