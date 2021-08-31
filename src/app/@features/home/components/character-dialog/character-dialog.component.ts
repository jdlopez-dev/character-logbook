import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Logger, UntilDestroy, untilDestroyed } from '@app/@shared';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { Character } from '../../models/character.interface';
import { ContentService } from '../../services/content.service';
import { ContentDialogComponent } from '../content-dialog/content-dialog.component';

const log = new Logger('CharacterDialogComponent');

@UntilDestroy()
@Component({
  selector: 'app-character-dialog',
  templateUrl: './character-dialog.component.html',
  styleUrls: ['./character-dialog.component.scss'],
})
export class CharacterDialogComponent implements OnInit {
  form!: FormGroup;
  error: string | undefined;
  isLoading = false;
  isEditor = false;
  id: string = '';

  constructor(
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private contentService: ContentService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CharacterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) { idCharacter }: Character
  ) {
    this.createForm(idCharacter);
  }

  ngOnInit(): void {}

  private createForm(id: string | null | undefined) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      nickname: [''],
      description: [''],
      id: [id],
    });
  }

  update() {}
  save() {
    console.log(this.form.value);

    const characterCreated$ = this.contentService.addCharacter(this.form.value);
    characterCreated$
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
          this.snackBar.open(this.translateService.instant('character.dialog.saveMessage'), '', {
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
}
