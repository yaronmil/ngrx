import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Question } from '../question.model';

import { featureAdapter, State, getSelectedUserId, getMaxQuestions, getTotalLoaded } from './questions-reducer';

export const selectMyFeatureState: MemoizedSelector<object, State> = createFeatureSelector<State>('questions');


// export const selectQuestionIndex = (state: State) => { debugger; return state.index; }


export const selectQuestionIndex = createSelector(
  selectMyFeatureState,
  getSelectedUserId
);
export const selectMaxQuestionsx = createSelector(
  selectMyFeatureState,
  getMaxQuestions
);

export const totalLoaded = createSelector(
  selectMyFeatureState,
  getTotalLoaded
);
export const selectAllMyFeatureItems: (state: object) => Question[] = featureAdapter.getSelectors(selectMyFeatureState).selectAll;

// export const selectMyFeatureById = (id: string) => createSelector(this.selectAllMyFeatureItems, (allMyFeatures: question[]) => {
//   if (allMyFeatures) {
//     return allMyFeatures.find(p => p.id === id);
//   } else {
//     return null;
//   }
// }
// );

// export const selectMyFeatureError: MemoizedSelector<
//   object,
//   any
// > = createSelector(
//   selectMyFeatureState,
//   getError
// );

// export const selectMyFeatureIsLoading: MemoizedSelector<
//   object,
//   boolean
// > = createSelector(
//   selectMyFeatureState,
//   getIsLoading
// );
