export class Item {
   id: number;
   name: string;
   details: string;
   type: string;
   level: string;
   changeDate: string;

   constructor(id: number, name: string, details: string, type: string, level: string, changeDate: string) { 
      this.id = id;
      this.name = name;
      this.details = details;
      this.type = type;
      this.level = level;
      this.changeDate = changeDate;
   }

   getString(): string {
      // return "id: "+this.id+", name: "+this.name+", details: "+this.details
      //    +", type: "+this.type+", level: "+this.level+", changeDate: "+this.changeDate;
      return "Test";
   }

   public getType() {
      console.log('get Type');
   }
}