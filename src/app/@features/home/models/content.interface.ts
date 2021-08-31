import { Character } from './character.interface';

export type ContentType = 'BOOK' | 'FILM' | 'GAME';

export interface Content {
  id?: string | null;
  name: string;
  contentType: ContentType;
  dateCreated: Date;
  description?: string | null;
  characters?: Character[] | null;
}
