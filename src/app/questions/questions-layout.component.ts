import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as questionActions from './store/questions-actions';
import * as  questionselectors from './store/question-selectors';
import { State } from './store/questions-reducer';
import { Question } from './question.model';
import { scan, takeWhile, tap } from 'rxjs/operators';
import { Subscription, timer } from 'rxjs';



@Component({
  selector: 'app-questions-layout',
  templateUrl: './questions-layout.component.html',
  styleUrls: ['./questions-layout.component.css']
})
export class QuestionsLayoutComponent implements OnInit {

  questions: Question[] = [];
  index: number = -1;
  maxQuestions: number = 0;
  selectedText: string = '';
  totalLoaded = 0;
  time = timer(0, 1000).pipe(
    scan(acc => --acc, 19),
    takeWhile(x => { this.timeDisplayer++; return x >= 0 })
  );
  timeDisplayer: number = 0
  timerUbscription: Subscription | undefined;
  subscriptions: Subscription[] = [];

  constructor(private store: Store<State>) {
    this.store.dispatch(new questionActions.SetMock())

    this.subscriptions.push(this.store.select(questionselectors.selectQuestionIndex).pipe(tap(d => {
      debugger
      if (this.index !== d) {
        if (this.timerUbscription)
          this.timerUbscription.unsubscribe();
        this.timerUbscription = this.time.subscribe();
      }
      this.index = d;

    }
    )).subscribe());

    this.subscriptions.push(this.store.select(questionselectors.selectMaxQuestionsx).pipe(tap(d => { this.maxQuestions = d }
    )).subscribe());

    this.store.dispatch(new questionActions.LoadRequestAction())

    this.subscriptions.push(this.store.select(questionselectors.selectAllMyFeatureItems).pipe(

      tap(d => {
        this.questions = d;


      }
      )).subscribe());

    this.subscriptions.push(this.store.select(questionselectors.totalLoaded).pipe(tap(d => { this.totalLoaded = d }
    )).subscribe());
  }
  answerSelected(selectedText: string) {
    this.store.dispatch(new questionActions.SelectAnswer({ questionId: this.questions[this.index].id, answerText: selectedText }))

  }
  pageChane(event: { page: number }) {
    if (event.page === this.totalLoaded) {
      this.store.dispatch(new questionActions.LoadRequestAction())
    }
    else {
      this.store.dispatch(new questionActions.UpdateSelectedIndex(event.page))
    }


  }
  ngOnDestroy() {
    if (this.timerUbscription)
      this.timerUbscription.unsubscribe();
    this.subscriptions.map(s => s.unsubscribe())
  }
  ngOnInit(): void {

  }

}
