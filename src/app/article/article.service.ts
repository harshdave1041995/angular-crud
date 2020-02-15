import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // URL for CRUD operations
  articleUrl = '/api/articles';
  // Create constructor to get Http instance
  constructor(private http: HttpClient) { }
  // Fetch all articles
  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articleUrl).pipe(
      tap(articles => console.log('Number of articles: ' + articles.length)),
      catchError(this.handleError)
    );
  }
  // Create article
  createArticle(article: Article): Observable<number> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Article>(this.articleUrl + '/' + article.id.toFixed(0), article, {
        headers: httpHeaders,
        observe: 'response'
      }
    ).pipe(
      map(res => res.status),
      catchError(this.handleError)
    );
  }
  // Fetch article by name
  getArticleByName(articleName: number): Observable<Article> {
    return this.http.get<Article>(this.articleUrl + '/' + articleName).pipe(
      tap(article => console.log(article.id + ' ' + article.name)),
      catchError(this.handleError)
    );
  }
  // Update articlesy
  updateArticle(article: Article): Observable<number> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<Article>(this.articleUrl + '/' + article.id, article, {
        headers: httpHeaders,
        observe: 'response'
      }
    ).pipe(
      map(res => res.status),
      catchError(this.handleError)
    );
  }
  // Delete article
  deleteArticleByAddress(articleAddress: number): Observable<Article> {
    return this.http.delete<any>(this.articleUrl + '/' + articleAddress).pipe(
      tap(status => console.log('status: ' + status)),
      catchError(this.handleError)
    );
  }
  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }



}
