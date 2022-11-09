import { Injectable } from '@angular/core';
import { json } from 'node:stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  storage:Storage

  constructor() {
    this.storage = window.localStorage;
   }

   set(key:string, value:string):void{
     this.storage[key] = value;
   }

   get(key:string):string{
     return this.storage[key]||false;
   }

   setObject(key:string, value:any):void{
     if(!value){
       return;
     }
     this.storage[key] = JSON.stringify(value);
   }
   getObject(key:string):any{
     return JSON.parse(this.storage[key]||'{}');
   }

   //T la generic type vd muon getTodo value thi se tra ve todo
   getValue<T>(key:string):T{
     const obj = JSON.parse(this.storage[key]||null);
     return <T>obj||null;
   }

   remove(key:string):any{
     this.storage.removeItem(key);
   }
   clear(){
     this.storage.clear();
   }
   get length():number{
     return this.storage.length;
   }
   get isStorageEmpty():boolean{
     return this.length===0;
   }
}
