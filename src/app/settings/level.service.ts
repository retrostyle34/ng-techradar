import { Injectable, OnInit } from '@angular/core';
import { Subject, of, Observable } from 'rxjs';
import { Level } from './level';
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
export class LevelService implements OnInit {

   private levels: Level[] = [];
   private level: Level;
   activeLevels = new Subject<Level[]>();
   activeLevel = new Subject<Level>();
   activeMode = new Subject<number>();


   constructor(private http: HttpClient) { }


   ngOnInit() { }


   getLevels() {
      this.http.get<Level[]>(endpoint + 'levels').subscribe(
         (res: Level[]) => {
            console.log(res);
            this.levels = res;
            this.activeLevels.next(this.levels.slice());
         }, error => catchError(this.handleError<any>(`get levels error: ${error}`))
      );
      return this.levels;
   }


   getLevel(id: any): Level {
      this.http.get<Level>(endpoint + 'levels/' + id).subscribe(
         (res: Level) => {
            console.log(res);
            this.activeLevel.next(res);
            return res;
         }, error => {
            catchError(this.handleError<any>(`get level details error: ${error}`));
         }
      );
      return null;
   }
   

   deleteLevel(id: any) {
      return this.http.delete(endpoint + 'levels/' + id, httpOptions)
         .pipe(tap(_ => console.log(`deleted level with id=${id}`)),
            catchError(this.handleError<any>('deleteLevel(${level.id})'))
         );
   }


   addLevel(level: any): Observable<any> {
      return this.http.post<any>(endpoint + 'levels', JSON.stringify(level), httpOptions)
         .pipe(tap(res => console.log(`inserted new level with id=${res.id}`)),
            catchError(this.handleError<any>('addLevel'))
         );
   }


   reset() {
      this.activeLevels.next(this.levels);
      this.activeMode.next(0);
   }


   setActiveLevel(level: Level) {
      this.activeLevel.next(level);
      this.level = level;
   }


   getActiveLevel() {
      return this.level;
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
