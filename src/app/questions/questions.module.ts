import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { questionsReducer } from './store/questions-reducer';
import { QuestionsLayoutComponent } from './questions-layout.component';
import { EffectsModule } from '@ngrx/effects';
import { QuestionsEffects } from './store/questions-effects';
import { CarouselModule } from 'primeng/carousel';
import { AnswerComponent } from './answer/answer.component';



@NgModule({
  declarations: [
    QuestionsLayoutComponent,
    AnswerComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    StoreModule.forFeature('questions', questionsReducer),
    EffectsModule.forFeature([QuestionsEffects])
  ]
})
export class QuestionsModule { }
