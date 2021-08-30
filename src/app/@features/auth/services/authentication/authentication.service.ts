import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { UserCredential } from '@shared/models/user-credential.interface';
import { LoginContext } from '../../models/login-context.interface';
import { CredentialsService } from '../credentials/credentials.service';

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private afAuth: AngularFireAuth, private credentialsService: CredentialsService) {
    // this.afAuth.onAuthStateChanged((credential) => {
    //   if (!credential) {
    //     this.credentialsService.setCredentials();
    //   }
    // });
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  async login(context: LoginContext): Promise<Observable<UserCredential>> {
    var persistence = this.getPersistence(context);
    await this.afAuth.setPersistence(persistence);
    return from(
      this.afAuth.signInWithEmailAndPassword(context.email, context.password).then((data) => {
        const userCredential: UserCredential = this.getUserCredential(data.user);
        this.credentialsService.setCredentials(userCredential, context.remember);
        return userCredential;
      })
    );
  }

  signUp(context: LoginContext): Observable<UserCredential> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(context.email, context.password).then((data) => {
        const userCredential: UserCredential = this.getUserCredential(data.user);
        this.credentialsService.setCredentials(userCredential, context.remember);
        return userCredential;
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
    return context.remember ? firebase.auth?.Auth.Persistence.LOCAL : firebase.auth?.Auth.Persistence.SESSION;
  }

  private getUserCredential(user: firebase.User | null): UserCredential {
    return {
      displayName: user?.displayName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      photoURL: user?.photoURL,
      providerId: user?.providerId,
      emailVerified: user?.emailVerified,
      uid: user?.uid,
    };
  }
}
