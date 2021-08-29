import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { Content } from '../../models/content.interface';
import { QuoteService } from '../../quote.service';
import { ContentService } from '../../services/content.service';
import { ContentDialogComponent } from '../content-dialog/content-dialog.component';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';

const log = new Logger('Home');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  contents$: Observable<Content[]>;
  contents: Content[] = [];
  searchFilter: string = '';

  constructor(private contentService: ContentService, private dialog: MatDialog, private quoteService: QuoteService) {
    this.contents$ = contentService.contents$;
  }

  ngOnInit() {
    this.contents$.subscribe((r) => (this.contents = r));
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
}
