import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { ItemDetailsComponent } from './items/item-details/item-details.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { SettingsComponent } from './settings/settings.component';
import { LevelNewComponent } from './settings/level-new/level-new.component';
import { LevelEditComponent } from './settings/level-edit/level-edit.component';
import { LevelListComponent } from './settings/level-list/level-list.component';
import { TypeListComponent } from './settings/type-list/type-list.component';
import { TypeNewComponent } from './settings/type-new/type-new.component';
import { TypeEditComponent } from './settings/type-edit/type-edit.component';

const routes: Routes = [
   { path: '', redirectTo: '/items', pathMatch: 'full' },
   { path: "items/:id", component: ItemsComponent, data: { title: 'Item List', mode: 0 }},
   { path: "items", component: ItemsComponent, data: { title: 'Item List', mode: 0 }, children: [
      { path: "add", component: ItemEditComponent, data: { title: 'New Item', mode: 1 }},
      { path: "details/:id", component: ItemDetailsComponent, data: { title: 'Item Details', mode: 2 }},
      { path: "edit/:id", component: ItemEditComponent, data: { title: 'Edit Item', mode: 3 }},
   ] },
   { path: "settings", component: SettingsComponent, children: [
      { path: "levels", component: LevelListComponent },
      { path: "level/add", component: LevelNewComponent },
      { path: "level/edit", component: LevelEditComponent },
      { path: "types", component: TypeListComponent },
      { path: "type/add", component: TypeNewComponent },
      { path: "type/edit", component: TypeEditComponent },
   ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
