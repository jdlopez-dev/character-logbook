import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { CredentialsService } from '@app/@features/auth';
import { from, Observable, of } from 'rxjs';
import { Content } from '../models/content.interface';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private contentCollection: AngularFirestoreCollection<Content>;
  contents$: Observable<Content[]>;

  constructor(private readonly afs: AngularFirestore, private credentialsService: CredentialsService) {
    const uid = credentialsService.credentials?.uid;
    const userRef = this.afs.collection('user').doc(uid);
    this.contentCollection = userRef.collection<Content>('content', (ref) => ref.orderBy('dateCreated'));
    this.contents$ = this.contentCollection.valueChanges({ idField: 'id' });
  }

  createContent(content: Content): Observable<DocumentReference<Content>> {
    content.dateCreated = new Date();
    return from(this.contentCollection.add(content));
  }

  deleteContent(content: Content): void {
    if (content.id) {
      this.contentCollection.doc(content.id).delete();
    }
  }

  updateContent(content: Content): Promise<void> | null {
    if (content.id) {
      return this.contentCollection.doc(content.id).update(content);
    }
    return null;
  }
}
