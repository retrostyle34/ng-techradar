import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailsComponent } from './items/item-details/item-details.component';
import { HeaderComponent } from './header/header.component';
import { VisualBoardComponent } from './visual-board/visual-board.component';
import { ItemAddComponent } from './items/item-add/item-add.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { OcticonDirective } from './shared/octicon.directive';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { LevelAddComponent } from './settings/level-add/level-add.component';
import { LevelEditComponent } from './settings/level-edit/level-edit.component';
import { LevelListComponent } from './settings/level-list/level-list.component';
// import { CategoryAddComponent } from './settings/category-add/category-add.component';
// import { CategoryEditComponent } from './settings/category-edit/category-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { SubmitIfValidDirective } from './shared/submit.directive';
import { LevelDetailsComponent } from './settings/level-details/level-details.component';
import { AddDirective } from './shared/add.directive';
import { DebounceClickDirective } from './shared/debounce-click.directive';
import { DetailsDirective } from './shared/details.directive';

@NgModule({
   declarations: [
      AppComponent,
      ItemsComponent,
      ItemDetailsComponent,
      HeaderComponent,
      OcticonDirective,
      VisualBoardComponent,
      ItemAddComponent,
      ItemEditComponent,
      ItemListComponent,
      LevelListComponent,
      LevelEditComponent,
      LevelAddComponent,
      SettingsComponent,
    //   CategoryAddComponent,
    //   CategoryEditComponent,
      SubmitIfValidDirective,
      AddDirective,
      DetailsDirective,
      DebounceClickDirective,
      LevelDetailsComponent,
   ],
   imports: [
      AngularFontAwesomeModule,
      BrowserModule,
      FormsModule,
      HttpClientModule,
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
