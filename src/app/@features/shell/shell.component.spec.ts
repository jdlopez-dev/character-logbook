import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';

import { AuthenticationService, CredentialsService } from '@features/auth';

import { I18nModule } from '@features/i18n';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { MockAuthenticationService } from '@features/auth/mocks/authentication.service.mock';
import { MockCredentialsService } from '@features/auth/mocks/credentials.service.mock';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          TranslateModule.forRoot(),
          I18nModule,
          BrowserAnimationsModule,
          FlexLayoutModule,
          MaterialModule,
          RouterTestingModule,
        ],
        providers: [
          { provide: AuthenticationService, useClass: MockAuthenticationService },
          { provide: CredentialsService, useClass: MockCredentialsService },
        ],
        declarations: [HeaderComponent, ShellComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
