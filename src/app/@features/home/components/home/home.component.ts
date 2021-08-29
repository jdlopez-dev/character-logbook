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

  constructor(private contentService: ContentService, private dialog: MatDialog, private quoteService: QuoteService) {
    this.contents$ = contentService.contents$;
  }

  ngOnInit() {}

  createContent() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.height = '50%';
    dialogConfig.data = {
      name: 'hola',
    };
    this.dialog.open(ContentDialogComponent, dialogConfig);
  }

  deleteAccount(content: Content) {
    this.contentService.deleteContent(content);
  }
}
