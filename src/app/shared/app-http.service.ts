import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question, ServerQuestion } from '../questions/question.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  readonly url = 'https://opentdb.com/api.php?amount=1&encode=base64&type=multiple';
  constructor(private http: HttpClient) { }
  getQuestion(): Observable<Question> {
    return this.http.get<{ results: ServerQuestion[] }>(this.url).pipe(
      map(res => { return res.results[0] }),
      map((res: ServerQuestion) => {
        const wrongAnswers = res.incorrect_answers?.map(ia => ({ answerText: atob(ia), isCorrect: false, isSelected: false }))
        const correctAnswer = { answerText: atob(res.correct_answer), isCorrect: true, isSelected: false }
        const answers = [...wrongAnswers, correctAnswer];
        const ret: Question = { id: -1, answers: this.shuffle(answers), question: atob(res.question) }
        return ret;

      })
    );
  }
  shuffle(array: any[]) {
    var currentIndex = array.length, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

}
