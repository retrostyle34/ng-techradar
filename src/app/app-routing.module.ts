import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { ItemAddComponent } from './items/item-add/item-add.component';
import { ItemDetailsComponent } from './items/item-details/item-details.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { SettingsComponent } from './settings/settings.component';
import { LevelAddComponent } from './settings/level-add/level-add.component';
import { LevelDetailsComponent } from './settings/level-details/level-details.component';
import { LevelEditComponent } from './settings/level-edit/level-edit.component';
import { CategoryAddComponent } from './settings/category-add/category-add.component';
import { CategoryEditComponent } from './settings/category-edit/category-edit.component';

const routes: Routes = [
   { path: '', redirectTo: '/items', pathMatch: 'full' },
   { path: "items", component: ItemsComponent, data: { title: 'Item List', mode: 0 }, children: [
        { path: "add", component: ItemAddComponent, data: { title: 'New Item', mode: 1 }},
        { path: "details/:id", component: ItemDetailsComponent, data: { title: 'Item Details', mode: 2 }},
        { path: "edit/:id", component: ItemEditComponent, data: { title: 'Edit Item', mode: 3 }},
   ] },
   { path: "settings", component: SettingsComponent, children: [
        { path: "levels/add", component: LevelAddComponent },
        { path: "levels/details", component: LevelDetailsComponent },
        { path: "levels/details/:id", component: LevelDetailsComponent },
        { path: "levels/:mode", component: LevelEditComponent },
        { path: "levels/:mode/:id", component: LevelEditComponent },
        // { path: "category/add", component: CategoryAddComponent },
        // { path: "category/edit", component: CategoryEditComponent },
   ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
