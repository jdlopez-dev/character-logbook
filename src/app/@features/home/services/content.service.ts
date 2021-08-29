import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Content } from '../models/content.interface';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private contentCollection: AngularFirestoreCollection<Content>;
  contents$: Observable<Content[]>;

  constructor(private readonly afs: AngularFirestore) {
    this.contentCollection = afs.collection<Content>('content');
    this.contents$ = this.contentCollection.valueChanges({ idField: 'id' });
  }

  createContent(content: Content): Observable<DocumentReference<Content>> {
    content.dateCreated = new Date();
    return from(this.contentCollection.add(content));
  }

  deleteContent(content: Content): void {
    console.log(content);
    if (content.id) {
      var r = this.contentCollection.doc(content.id).delete();
    }
  }
}
