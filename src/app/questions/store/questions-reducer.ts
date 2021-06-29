import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { answer, Question } from '../question.model';
import { QuestionsActions, QuestionActionTypes } from './questions-actions';

export const featureAdapter: EntityAdapter<Question> = createEntityAdapter<Question>({
  selectId: model => model.id
});
export interface State extends EntityState<Question> {
  index: number;
  maxQuestions: number;
  totalLoaded: number;
}

export const initialState: State = featureAdapter.getInitialState({
  index: -1,
  maxQuestions: 10,
  totalLoaded: 0
});
function generateMockquestions() {
  const numOfQuestion = 10;
  const initData: Question[] = [];
  for (var x = 0; x < initialState.maxQuestions; x++) {
    initData.push({ id: x, question: '', answers: [] });
  }
  return initData;
}
export function questionsReducer(state = initialState, action: QuestionsActions): State {
  switch (action.type) {
    case QuestionActionTypes.SELECT_ANSWER: {
      const questionId = action.payload.questionId;
      const answerText = action.payload.answerText;
      const allQuestions = selectAll(state);
      const selectedQuestion: Question = allQuestions.find(f => f.id === questionId) as Question
      let answers: answer[] | undefined;
      if (selectedQuestion.answers) {
        answers = selectedQuestion.answers.map(a => { return { ...a, isSelected: false } });
        const selectedAnswerIndex = answers.findIndex(a => a.answerText === answerText);
        answers[selectedAnswerIndex] = { ...answers[selectedAnswerIndex], isSelected: true }
        //const selectedAnswer: answer = { ...selectedQuestion.answers[selectedAnswerIndex], isSelected: true }
        // selectedQuestion.answers[selectedAnswerIndex] = selectedAnswer
      }

      return featureAdapter.updateOne({ id: selectedQuestion.id, changes: { answers: answers } }, {
        ...state
      });
    }
    case QuestionActionTypes.SET_MOCK: {
      return featureAdapter.addMany(
        generateMockquestions(), {
        ...state
      });
    }
    case QuestionActionTypes.UPDATE_INDEX: {
      return { ...state, index: action.payload }
    }
    case QuestionActionTypes.LOAD_SUCCESS: {
      const currentIndex = state.index + 1;
      const newItem = { ...action.payload, id: currentIndex }
      return featureAdapter.setOne(newItem, {
        ...state, index: currentIndex, totalLoaded: state.totalLoaded + 1
      });
    }
    case QuestionActionTypes.LOAD_FAILURE: {
      return {
        ...state
      };
    }
    default: {
      return state;
    }
  }
}
export const getSelectedUserId = (state: State) => state.index;
export const getMaxQuestions = (state: State) => state.maxQuestions;
export const getTotalLoaded = (state: State) => state.totalLoaded;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = featureAdapter.getSelectors();
