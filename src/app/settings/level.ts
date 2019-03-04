export class Level {
   id: number;
   name: string;
   details: string;
   orderNumber: number;

   constructor(id: number, name: string, details: string, orderNumber: number) { 
      this.id = id;
      this.name = name;
      this.details = details;
      this.orderNumber = orderNumber;
   }
}