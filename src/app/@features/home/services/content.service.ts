import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/firestore';
import { CredentialsService } from '@app/@features/auth';
import { User } from '@app/@shared/models/user-interface';
import { from, Observable, of } from 'rxjs';
import { Character } from '../models/character.interface';
import { Content } from '../models/content.interface';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private contentCollection: AngularFirestoreCollection<Content>;
  private characterCollection!: AngularFirestoreCollection<Character>;

  contents$: Observable<Content[]>;

  constructor(private readonly afs: AngularFirestore, private credentialsService: CredentialsService) {
    const uid = credentialsService.credentials?.uid;
    const userRef = this.afs.collection<User>('users').doc(uid);
    this.contentCollection = userRef.collection<Content>('contents', (ref) => ref.orderBy('dateCreated'));

    this.contents$ = this.contentCollection.valueChanges({ idField: 'id' });
  }

  createContent(content: Content): Observable<DocumentReference<Content>> {
    content.dateCreated = new Date();
    return from(this.contentCollection.add(content));
  }

  deleteContent(content: Content): boolean {
    if (content.id) {
      this.contentCollection.doc(content.id).delete();
      return true;
    }
    return false;
  }

  updateContent(content: Content): Promise<void> | null {
    if (content.id) {
      return this.contentCollection.doc(content.id).update(content);
    }
    return null;
  }

  getCharacters(idContent: string): Observable<Character[]> {
    this.characterCollection = this.contentCollection.doc(idContent).collection('characters');
    return this.characterCollection.valueChanges({ idField: 'idCharacter' });
  }

  addCharacter(character: Character) {
    return from(this.characterCollection.add(character));
  }

  deleteCharacter(character: Character): boolean {
    if (character.idCharacter) {
      this.characterCollection.doc(character.idCharacter).delete();
      return true;
    }
    return false;
  }
}
