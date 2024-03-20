import { Chapter } from "./chapter";
import { Teacher } from "./teacher";
import { Test } from "./test";

export class Course {
  id: number;
  title: string;
  users: Teacher[] = [];
  chapters: Chapter[] = [];
  tests: Test[] = [];
  constructor(
    id: number,
    title: string,
    chapters: Chapter[],
    tests: Test[] = []
  ) {
    this.id = id;
    this.title = title;
    this.chapters = chapters;
    this.tests= tests;
  }
}
