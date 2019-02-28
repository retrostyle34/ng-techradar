import { Injectable, OnInit } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { Item } from './item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

const endpoint = 'http://localhost:8080/api/';
const httpOptions = {
   headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
   })
};

@Injectable({
   providedIn: 'root'
})
export class ItemService implements OnInit {

   private items: Item[] = [];
   private item: Item;
   activeItems = new Subject<Item[]>();
   activeItem = new Subject<Item>();
   activeMode = new Subject<number>();


   constructor(private http: HttpClient) { }


   ngOnInit() { }


   getItems() {
      this.http.get<Item[]>(endpoint + 'items').subscribe(
         (res: Item[]) => {
            console.log(res);
            this.items = res;
            this.activeItems.next(this.items.slice());
         }, error => catchError(this.handleError<any>(`get items error: ${error}`))
      );
      return this.items;
   }


   getItem(id: any): Item {
      this.http.get<Item>(endpoint + 'items/' + id).subscribe(
         (res: Item) => {
            console.log(res);
            this.activeItem.next(res);
            return res;
         }, error => {
            catchError(this.handleError<any>(`get item details error: ${error}`));
            // this.activeMode.next(0);
         }
      );
      return null;
   }
   

   deleteItem(id: any) {
      return this.http.delete(endpoint + 'items/' + id, httpOptions)
         .pipe(tap(_ => console.log(`deleted item with id=${id}`)),
            catchError(this.handleError<any>('deleteItem(${item.id})'))
         );
   }


   addItem(item: any): Observable<any> {
      return this.http.post<any>(endpoint + 'items', JSON.stringify(item), httpOptions)
         .pipe(tap(res => console.log(`inserted new item with id=${res.id}`)),
            catchError(this.handleError<any>('addItem'))
         );
   }


   reset() {
      this.activeItems.next(this.items);
      this.activeMode.next(0);
   }


   setActiveItem(item: Item) {
      this.activeItem.next(item);
      this.item = item;
   }


   getActiveItem() {
      return this.item;
   }


   private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
         // TODO: send the error to remote logging infrastructure
         console.error(error); // log to console instead
         // TODO: better job of transforming error for user consumption
         console.log(`${operation} failed: ${error.message}`);
         // Let the app keep running by returning an empty result.
         return of(result as T);
      };
   }
}
