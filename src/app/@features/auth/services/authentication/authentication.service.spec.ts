import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserCredential } from '@shared/models/user-credential.interface';
import { MockAngularFireAuth } from '../../mocks/angular-fire-auth.service.mock';
import { MockCredentialsService } from '../../mocks/credentials.service.mock';
import { CredentialsService } from '../credentials/credentials.service';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let credentialsService: MockCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CredentialsService, useClass: MockCredentialsService },
        { provide: AngularFireAuth, useClass: MockAngularFireAuth },
        AuthenticationService,
      ],
    });

    authenticationService = TestBed.inject(AuthenticationService);
    TestBed.inject(AngularFireAuth);
    credentialsService = TestBed.inject(CredentialsService);
    credentialsService.credentials = null;
    spyOn(credentialsService, 'setCredentials').and.callThrough();
  });

  describe('login', () => {
    it('should return credentials', fakeAsync(async () => {
      // Act
      const request = await authenticationService.login({
        username: 'toto',
        password: '123',
      });
      tick();

      // Assert
      request.subscribe((credentials) => {
        expect(credentials).toBeDefined();
        expect(credentials.uid).toBeDefined();
      });
    }));

    it('should authenticate user', fakeAsync(async () => {
      expect(credentialsService.isAuthenticated()).toBe(false);

      // Act
      const request = await authenticationService.login({
        username: 'toto',
        password: '123',
      });
      tick();

      // Assert
      request.subscribe(() => {
        expect(credentialsService.isAuthenticated()).toBe(true);
        expect(credentialsService.credentials).not.toBeNull();
        expect((credentialsService.credentials as UserCredential).uid).toBeDefined();
        expect((credentialsService.credentials as UserCredential).uid).not.toBeNull();
      });
    }));

    it('should persist credentials for the session', fakeAsync(async () => {
      // Act
      const request = await authenticationService.login({
        username: 'toto',
        password: '123',
      });
      tick();

      // Assert
      request.subscribe(() => {
        expect(credentialsService.setCredentials).toHaveBeenCalled();
        expect((credentialsService.setCredentials as jasmine.Spy).calls.mostRecent().args[1]).toBe(undefined);
      });
    }));

    it('should persist credentials across sessions', fakeAsync(async () => {
      // Act
      const request = await authenticationService.login({
        username: 'toto',
        password: '123',
        remember: true,
      });
      tick();

      // Assert
      request.subscribe(() => {
        expect(credentialsService.setCredentials).toHaveBeenCalled();
        expect((credentialsService.setCredentials as jasmine.Spy).calls.mostRecent().args[1]).toBe(true);
      });
    }));
  });

  describe('logout', () => {
    it('should clear user authentication', fakeAsync(async () => {
      // Arrange
      const loginRequest = await authenticationService.login({
        username: 'toto',
        password: '123',
      });
      tick();

      // Assert
      loginRequest.subscribe(() => {
        expect(credentialsService.isAuthenticated()).toBe(true);

        const request = authenticationService.logout();
        tick();

        request.subscribe(() => {
          expect(credentialsService.isAuthenticated()).toBe(false);
          expect(credentialsService.credentials).toBeNull();
        });
      });
    }));
  });
});
