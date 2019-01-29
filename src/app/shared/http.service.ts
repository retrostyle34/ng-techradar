import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

const endpoint = 'http://127.0.0.1:8080/api/';
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
export class HttpService {

   constructor(private http: HttpClient) { }

   getItems() {
      return this.http.get(endpoint + 'items');
   }

   deleteItem(id): Observable<any> {
      return this.http.delete<any>(endpoint + 'items/' + id, httpOptions)
      .pipe(tap(_ => console.log(`deleted items id=${id}`)),
         catchError(this.handleError<any>('deleteItem'))
      );
   }

   get(element: string) {
      return this.http.get(endpoint + element);
   }

   getById(element: string, id: string) {
      return this.http.get(endpoint + element +'/' + id);
   }

   add(object: Object, element: string): Observable<any> {
      console.log(object);
      return this.http.post<any>(endpoint + element, JSON.stringify(object), httpOptions)
         .pipe(tap(_ => console.log('new item w/ id=${item.id}')),
            catchError(this.handleError<any>('addItem'))
         );
   }

   updateItem(id, item): Observable<any> {
      console.log(item);
      return this.http.put(endpoint + 'items/' + id, JSON.stringify(item), httpOptions)
         .pipe(tap(_ => console.log('updated item id=${id}')),
            catchError(this.handleError<any>('updateItem'))
         );
   }

   delete(element: string, id: number): Observable<any> {
      return this.http.delete<any>(endpoint + element +'/' + id, httpOptions)
      .pipe(tap(_ => console.log('deleted '+element+` id=${id}`)),
         catchError(this.handleError<any>('deleteItem'))
      );
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
