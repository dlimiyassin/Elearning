export class Student {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  picture: string;
  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    picture: string
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.picture = picture;
  }
}
