import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { Content } from '../../models/content.interface';
import { QuoteService } from '../../quote.service';
import { ContentService } from '../../services/content.service';
import { ContentDialogComponent } from '../content-dialog/content-dialog.component';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CharacterDialogComponent } from '../character-dialog/character-dialog.component';
import { Character } from '../../models/character.interface';

const log = new Logger('Home');
@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  contents: Content[] = [];
  characters: Character[] = [];
  selectedCharacter: string = '';

  searchFilter: string = '';
  selectContent = false;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private contentService: ContentService,
    private dialog: MatDialog,
    private quoteService: QuoteService
  ) {}

  ngOnInit() {
    this.contentService.contents$.pipe(untilDestroyed(this)).subscribe((data) => {
      this.contents = data;
      log.debug(data);
    });
  }

  createContent() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.height = '50%';
    dialogConfig.data = {};
    this.dialog.open(ContentDialogComponent, dialogConfig);
  }

  deleteContent(content: Content) {
    this.contentService.deleteContent(content);
  }

  editContent(content: Content) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.height = '50%';
    dialogConfig.data = content;
    this.dialog.open(ContentDialogComponent, dialogConfig);
  }

  applyFilter(data: string) {
    this.searchFilter = data;
  }

  goToDetails(data: Content) {
    this.selectContent = !this.selectContent;
    if (this.searchFilter == data.id) {
      this.searchFilter = '';
      this.characters = [];
      this.selectedCharacter = '';
    } else {
      this.searchFilter = data.id ?? '';
      this.selectedCharacter = data.id ?? '';
      this.contentService
        .getCharacters(this.selectedCharacter)
        .pipe(untilDestroyed(this))
        .subscribe((data) => {
          this.characters = data;
        });
    }
  }

  createCharacter() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.height = '50%';
    dialogConfig.data = {};
    this.dialog.open(CharacterDialogComponent, dialogConfig);
  }

  deleteCharacter(character: Character) {
    this.contentService.deleteCharacter(character);
  }
}
