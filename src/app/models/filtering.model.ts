export interface FilterButton{
  //sử dụng interface như một khuôn mẫu và ko có thay đổi gì cho nó
  type:Filter;
  label:string;
  isActive:boolean;
}

export enum Filter{
  All,
  Active,
  Completed
}
