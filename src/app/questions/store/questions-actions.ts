import { Action } from '@ngrx/store';
import { Question } from '../question.model';

export enum QuestionActionTypes {
  LOAD_REQUEST = '[My Feature] Load Request',
  LOAD_FAILURE = '[My Feature] Load Failure',
  LOAD_SUCCESS = '[My Feature] Load Success',
  SET_MOCK = '[My Feature] Set Mock',
  UPDATE_INDEX = '[My Feature] Update Index',
  SELECT_ANSWER = '[My Feature] Select Answer'
}

export class SelectAnswer implements Action {
  readonly type = QuestionActionTypes.SELECT_ANSWER;
  constructor(public payload: { questionId: number, answerText: string }) { }
}
export class SetMock implements Action {
  readonly type = QuestionActionTypes.SET_MOCK;
}
export class LoadRequestAction implements Action {
  readonly type = QuestionActionTypes.LOAD_REQUEST;
}
export class UpdateSelectedIndex implements Action {
  readonly type = QuestionActionTypes.UPDATE_INDEX;
  constructor(public payload: number) { }
}
export class LoadFailureAction implements Action {
  readonly type = QuestionActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: string }) { }
}

export class LoadSuccessAction implements Action {
  readonly type = QuestionActionTypes.LOAD_SUCCESS;
  constructor(public payload: Question) { }
}

export type QuestionsActions = LoadRequestAction | LoadFailureAction | LoadSuccessAction | UpdateSelectedIndex | SetMock | SelectAnswer;
