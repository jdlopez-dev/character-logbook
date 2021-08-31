import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '@app/material.module';
import { AuthenticationService, CredentialsService } from '@features/auth';
import { I18nModule } from '@features/i18n';
import { HeaderComponent } from './header.component';
import { MockAuthenticationService } from '@features/auth/mocks/authentication.service.mock';
import { MockCredentialsService } from '@features/auth/mocks/credentials.service.mock';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, MaterialModule, TranslateModule.forRoot(), I18nModule],
        declarations: [HeaderComponent],
        providers: [
          { provide: AuthenticationService, useClass: MockAuthenticationService },
          { provide: CredentialsService, useClass: MockCredentialsService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
