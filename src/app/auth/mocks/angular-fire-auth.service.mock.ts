import { UserCredential } from '@app/@shared/models/user-credential.interface';

export class MockAngularFireAuth {
  signInWithEmailAndPassword(email: String, password: String): Promise<any> {
    const data: UserCredential = {
      displayName: 'userMock',
      email: 'testMailMock',
      phoneNumber: '123456789',
      photoURL: '/photo.url',
      providerId: 'firebase',
      emailVerified: false,
      uid: '12345',
    };

    const userCredential = {
      user: data,
    };
    return new Promise((resolve, reject) => {
      resolve(userCredential);
    });
  }

  signOut() {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
}
