export class Todo{
  public id: number//timestamp (không bị trùng)
  public content:  string;
  public isCompleted: boolean;
  constructor(id:number, content:string){
    this.id = id;
    this.content = content;
    this.isCompleted = false;
  }
}
