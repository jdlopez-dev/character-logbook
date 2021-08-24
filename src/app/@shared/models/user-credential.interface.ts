export interface UserCredential {
  displayName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  photoURL?: string | null;
  providerId?: string;
  emailVerified?: boolean;
  /**
   * The user's unique ID.
   */
  uid?: string;
}
