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
import { LevelEditComponent } from './settings/level-edit/level-edit.component';
import { LevelListComponent } from './settings/level-list/level-list.component';
import { LevelNewComponent } from './settings/level-new/level-new.component';
import { TypeEditComponent } from './settings/type-edit/type-edit.component';
import { TypeListComponent } from './settings/type-list/type-list.component';
import { TypeNewComponent } from './settings/type-new/type-new.component';
import { Item } from './items/item';
import { HttpClientModule } from '@angular/common/http';

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
      LevelNewComponent,
      SettingsComponent,
      TypeListComponent,
      TypeEditComponent,
      TypeNewComponent,
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
