import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { ItemDetailsComponent } from './items/item-details/item-details.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { SettingsComponent } from './settings/settings.component';
import { LevelAddComponent } from './settings/level-add/level-add.component';
import { LevelEditComponent } from './settings/level-edit/level-edit.component';
import { TypeListComponent } from './settings/type-list/type-list.component';
import { TypeNewComponent } from './settings/type-new/type-new.component';
import { TypeEditComponent } from './settings/type-edit/type-edit.component';
import { ItemAddComponent } from './items/item-add/item-add.component';
import { LevelDetailsComponent } from './settings/level-details/level-details.component';

const routes: Routes = [
   { path: '', redirectTo: '/items', pathMatch: 'full' },
   { path: "items", component: ItemsComponent, data: { title: 'Item List', mode: 0 }, children: [
      { path: "add", component: ItemAddComponent, data: { title: 'New Item', mode: 1 }},
      { path: "details/:id", component: ItemDetailsComponent, data: { title: 'Item Details', mode: 2 }},
      { path: "edit/:id", component: ItemEditComponent, data: { title: 'Edit Item', mode: 3 }},
   ] },
   { path: "settings/levels", component: SettingsComponent, children: [
      { path: "add", component: LevelAddComponent },
      { path: "details", component: LevelDetailsComponent },
      { path: "details/:id", component: LevelDetailsComponent },
      { path: "edit", component: LevelEditComponent },
      { path: "edit/:id", component: LevelEditComponent },
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
