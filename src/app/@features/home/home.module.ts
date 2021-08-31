import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ContentDialogComponent } from './components/content-dialog/content-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { CharacterDialogComponent } from './components/character-dialog/character-dialog.component';
import { CharacterSearchPipePipe } from './pipes/character-search-pipe.pipe';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HomeComponent,
    ContentDialogComponent,
    SearchPipePipe,
    CharacterDialogComponent,
    CharacterSearchPipePipe,
  ],
})
export class HomeModule {}
