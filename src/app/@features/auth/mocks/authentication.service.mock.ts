import { UserCredential } from '@shared/models/user-credential.interface';
import { Observable, of } from 'rxjs';
import { LoginContext } from '../models/login-context.interface';

export class MockAuthenticationService {
  credentials: UserCredential = {
    displayName: 'test',
    uid: '123',
  };

  login(context: LoginContext): Observable<UserCredential> {
    return of(this.credentials);
  }

  logout(): Observable<boolean> {
    return of(true);
  }
}
