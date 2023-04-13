import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-api-3dxz.onrender.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint

 /**
   * @service POST to register a new user
   * @param {any} userDetails
   * @returns a new user object in json format
   * @function userRegistration
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'users', userDetails)
    .pipe(
    catchError(this.handleError)
    );
  }

  /**
   * @service POST to login a user
   * @param {any} userDetails
   * @returns a user object in json format
   * @function userLogin
   */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @service GET a list of all movies
   * @returns an array of all movies in json format
   * @function getAllMovies
   */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies',
      {headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token, }
      )})
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

  /**
   * @service GET a movie by title
   * @param {string} title
   * @returns an array of movie objects in json format
   * @function getMovie
   */

  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies/' + title,
      {headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token, }
      )})
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

  /**
   * @service GET a director's data by name 
   * @param {string} directorName
   * @returns an array of movie objects in json format
   * @function getDirector
   */

  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies/directors/' + directorName, 
      {headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token, }
      )})
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

  /**
   * @service GET a genre's data by name
   * @param {string} genreName
   * @returns an array of movie objects in json format
   * @function getGenre
   */

  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies/genre/' + genreName, 
      {headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token, }
      )})
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

  /**
   * @service GET a user's data by username
   * @returns a user object in json format
   * @function getUser
   */

  getUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'users/' + username, 
      {headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token, }
      )})
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

  /**
   * @service GET a user's favorite movies list
   * @returns a list of movie ids
   * @function getFavoriteMovies
   */

  getFavoriteMovies(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'users/' + username, 
      {headers: new HttpHeaders(
        { Authorization: 'Bearer ' + token, }
      )})
        .pipe(
          map(this.extractResponseData),
          map((data) => data.FavoriteMovies),
          catchError(this.handleError)
        );
  }

  /**
   * @service POST to add a favorite movie to user
   * @returns a user object in json format
   * @function addFavoriteMovie
   */

  addFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .post(apiUrl + 'users/' + username + movieId, 
        {headers: new HttpHeaders(
          { Authorization: 'Bearer ' + token, }
          )})
          .pipe(
            map(this.extractResponseData),
            map((data) => data.FavoriteMovies),
            catchError(this.handleError)
          );
  }

  /**
   * @service PUT to update a user's data
   * @returns a user object in json format
   * @function editUser
   */

  editUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .put(apiUrl + 'users/' + username, 
        {headers: new HttpHeaders(
          { Authorization: 'Bearer ' + token, }
          )})
          .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
          );
  }

  /**
   * @service DELETE a user's account
   * @returns success message
   * @function deleteUser
   */

  deleteUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .delete(apiUrl + 'users/' + username, 
        {headers: new HttpHeaders(
          { Authorization: 'Bearer ' + token, }
          )})
          .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
          );
  }

  /**
   * @service DELETE a movie from a user's favorites
   * @returns a user object in json format
   * @function removeFavoriteMovie
   */

  removeFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
    .delete(apiUrl + 'users/' + username + movieId, 
        {headers: new HttpHeaders(
          { Authorization: 'Bearer ' + token, }
          )})
          .pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
          );
  }

// Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  /**
   * Error handler
   * @param error
   * @returns error message
   */

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}