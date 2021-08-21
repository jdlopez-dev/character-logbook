import { UserCredential } from '@app/@shared/models/user-credential.interface';

export class MockCredentialsService {
  credentials: UserCredential | null = {
    displayName: 'test',
    uid: '123',
  };

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  setCredentials(credentials?: UserCredential, _remember?: boolean) {
    this.credentials = credentials || null;
  }
}
