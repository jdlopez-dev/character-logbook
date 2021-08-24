import { UserCredential } from '@app/@shared/models/user-credential.interface';

export const MockFirebaseConfig = {
  apiKey: '14424d6e50df41eb99694b437366b0a75318fda',
  authDomain: 'character-logbook',
  projectId: 'character-logbook',
  storageBucket: 'character-logbook',
  messagingSenderId: '',
  appId: '1:423561300800:web:Nv4oaMe25SxK38wuihw1w1',
};

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
