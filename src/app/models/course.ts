import { Chapter } from "./chapter";
import { Teacher } from "./teacher";

export class Course {
  id: number;
  title: string;
  users: Teacher[] = [];
  chapters: Chapter[] = [];
  constructor(id: number, title: string, chapters : Chapter[]) {
    this.id = id;
    this.title = title;
    this.chapters = chapters;
  }
}
