
export class Test {
  id: number;
  question: string;
  response_1: string;
  response_2: string;
  response_3: string;
  response_4: string;
  response_correct: string;
  level: number;

  constructor(
    id: number,
    question: string,
    response_1: string,
    response_2: string,
    response_3: string,
    response_4:string,
    response_correct:string,
    level:number
  ) {
    this.id=id;
    this.question=question;
    this.response_1=response_1;
    this.response_2=response_2;
    this.response_3=response_3;
    this.response_4=response_4;
    this.response_correct =response_correct;
    this.level=level;
  }
}
