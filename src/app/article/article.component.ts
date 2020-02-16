import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ArticleService } from './article.service';
import { Article } from './article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  // Component properties
  allArticles: Article[];
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;
  // Create form
  articleForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    birthdate: new FormControl(new Date(), Validators.required),
    anniversary: new FormControl(new Date()),
    gender: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    pinCode: new FormControl('')
  });
  // Create constructor to get service instance
  constructor(private articleService: ArticleService) {
  }
  // Create ngOnInit() and and load articles
  ngOnInit(): void {
    this.getAllArticles();
  }
  // Fetch all articles
  getAllArticles() {
    this.articleService.getAllArticles()
      .subscribe(
        data => this.allArticles = data,
        errorCode => this.statusCode = errorCode);
  }
  // Handle create and update article
  onArticleFormSubmit() {
    this.processValidation = true;
    if (this.articleForm.invalid) {
      return; // Validation failed, exit from method.
    }
    // Form is valid, now perform create or update
    this.preProcessConfigurations();
    const article = this.articleForm.value;
    console.log(this.articleIdToUpdate);
    if (this.articleIdToUpdate === null) {
      // Generate article id then create article
      this.articleService.getAllArticles()
        .subscribe(articles => {
          // Generate article id (logic is for demo)
          console.log('inside generate id');
          const maxIndex = articles.length - 1;
          if (maxIndex >= 0) {
            const articleWithMaxIndex = articles[maxIndex];
            const articleAddress = articleWithMaxIndex.id + 1;
            article.id = articleAddress;
            console.log(article.id);
          } else {
            article.id = 1;
            console.log(article.id);
          }

          // Create article
          this.articleService.createArticle(article)
            .subscribe(statusCode => {
              console.log(statusCode);
              // Expecting success code 201 from server
              this.statusCode = statusCode;
              this.getAllArticles();
              this.backToCreateArticle();
            },
              errorCode => this.statusCode = errorCode
            );
        });
    } else {
      // Handle update article
      console.log(article.id , this.articleIdToUpdate);
      article.id = this.articleIdToUpdate;
      this.articleService.updateArticle(article)
        .subscribe(statusCode => {
          console.log(statusCode);
          this.statusCode = statusCode;
          // Expecting success code 204 from server
          // this.statusCode = 200;
          this.getAllArticles();
          this.backToCreateArticle();
        },
          errorCode => this.statusCode = errorCode);
    }
  }
  // Load article by id to edit
  loadArticleToEdit(articleAddress: number) {
    console.log(articleAddress , this.articleIdToUpdate);
    this.preProcessConfigurations();
    this.articleService.getArticleByName(articleAddress)
      .subscribe(article => {
        this.articleIdToUpdate = article.id;
        // tslint:disable-next-line: max-line-length
        this.articleForm.setValue({ id: article.id, name: article.name, birthdate: article.birthdate, anniversary: article.anniversary, gender: article.gender, pinCode: article.pinCode, street: article.street, city: article.city, state: article.state });
        this.processValidation = true;
        this.requestProcessing = false;
      },
        errorCode => this.statusCode = errorCode);
  }
  // Delete article
  deleteArticle(articleAddress: number) {
    console.log(articleAddress , this.articleIdToUpdate);
    this.preProcessConfigurations();
    this.articleService.deleteArticleByAddress(articleAddress)
      .subscribe(successCode => {
        // this.statusCode = successCode;
        // Expecting success code 204 from server
        console.log(this.statusCode);
        this.statusCode = 420;
        this.getAllArticles();
        this.backToCreateArticle();
      },
        errorCode => this.statusCode = errorCode);
  }
  // Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
    console.log('pre-process ran');
  }
  // Go back from update to create
  backToCreateArticle() {
    // this.statusCode = null;
    this.articleIdToUpdate = null;
    this.articleForm.reset();
    this.processValidation = false;
    console.log('back to create ran');
  }
}
