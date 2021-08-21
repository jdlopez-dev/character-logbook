import { UserCredential } from '@app/@shared/models/user-credential.interface';
import { Observable, of } from 'rxjs';

import { LoginContext } from './authentication.service';

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
