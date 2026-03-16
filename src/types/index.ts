export type Status = "known" | "unknown";

export interface Card {
  id: string;
  front: string;
  back: string;
  status: Status;
}

export interface Wordbook {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  cards: Card[];
}
