import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsLayoutComponent } from './questions/questions-layout.component';
// import { QuestinionsLayoutComponent } from 'src/questions/questinions-layout.component';

const routes: Routes = [
  { path: 'questions', component: QuestionsLayoutComponent },
  { path: '**', redirectTo: 'questions', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
