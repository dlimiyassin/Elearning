export class Chapter {
    id: number;
    title : string;
    lien : string;
    level : number;
    constructor(id:number, title: string, lien: string, level: number){
        this.id = id;
        this.title = title;
        this.lien = lien;
        this.level = level;
    }
}