import { Teacher } from "./teacher";

export class Course {
  id: number;
  title: string;
  users: Teacher[] = [];

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}
