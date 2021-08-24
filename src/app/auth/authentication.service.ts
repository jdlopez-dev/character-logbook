import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { CredentialsService } from './credentials.service';
import { UserCredential } from '@app/@shared/models/user-credential.interface';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private afAuth: AngularFireAuth, private credentialsService: CredentialsService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  async login(context: LoginContext): Promise<Observable<UserCredential>> {
    var persistence = this.getPersistence(context);

    await this.afAuth.setPersistence(persistence);
    return from(
      this.afAuth.signInWithEmailAndPassword(context.username, context.password).then((userCredential) => {
        const user = userCredential.user;
        const data: UserCredential = {
          displayName: user?.displayName,
          email: user?.email,
          phoneNumber: user?.phoneNumber,
          photoURL: user?.photoURL,
          providerId: user?.providerId,
          emailVerified: user?.emailVerified,
          uid: user?.uid,
        };
        this.credentialsService.setCredentials(data, context.remember);
        return data;
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return from(
      this.afAuth.signOut().then(() => {
        return true;
      })
    );
  }

  private getPersistence(context: LoginContext) {
    return context.remember ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;
  }
}
