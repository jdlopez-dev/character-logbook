import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { Content } from '../../models/content.interface';
import { ContentService } from '../../services/content.service';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

const log = new Logger('ContentDialogComponent');

@UntilDestroy()
@Component({
  selector: 'app-content-dialog',
  templateUrl: './content-dialog.component.html',
  styleUrls: ['./content-dialog.component.scss'],
})
export class ContentDialogComponent implements OnInit {
  form!: FormGroup;
  error: string | undefined;
  isLoading = false;

  constructor(
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private contentService: ContentService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ContentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) { name }: Content
  ) {
    this.createForm();
  }

  ngOnInit(): void {}
  save() {
    const contentCreated$ = this.contentService.createContent(this.form.value);
    contentCreated$
      .pipe(
        finalize(() => {
          this.form.markAsPristine;
          this.isLoading = false;
          this.dialogRef.close();
        }),
        untilDestroyed(this)
      )
      .subscribe({
        next: (content) => {
          log.debug(`${content.id} was successfully created`);
          this.snackBar.open(this.translateService.instant('content.dialog.saveMessage'), '', {
            duration: 5000,
          });
        },
        error: (err) => {
          log.debug(`Creation error: ${err}`);
        },
      });
  }
  close() {
    this.dialogRef.close();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      contentType: ['', Validators.required],
    });
  }
}
