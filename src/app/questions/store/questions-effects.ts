import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { AppHttpService } from 'src/app/shared/app-http.service';
import * as questionActions from './questions-actions';
import { State } from './questions-reducer';
import * as  questionselectors from '../store/question-selectors';
import { Question } from '../question.model';

@Injectable()
export class QuestionsEffects {

  loadQuestions$ = createEffect(() => this.actions$.pipe(
    ofType(questionActions.QuestionActionTypes.LOAD_REQUEST),
    withLatestFrom(this.store.select(questionselectors.selectAllMyFeatureItems)),
    mergeMap((state) => {
      return this.appHttp.getQuestion()
        .pipe(
          map(question => {
            if (state[1].find(q => q.question == question.question)) {
              return new questionActions.LoadRequestAction()
            }
            else {
              return new questionActions.LoadSuccessAction(question)
            }
          }),
          catchError(() => EMPTY)
        )
    })
  )
  );

  constructor(
    private actions$: Actions,
    private appHttp: AppHttpService,
    private store: Store<State>
  ) { }
}
