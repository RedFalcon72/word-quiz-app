import { useEffect, useState } from "react";
import type { Card, Wordbook } from "../types";

const STORAGE_KEY = "word-quiz-data";

const DEFAULT_WORDBOOKS: Wordbook[] = [
  {
    id: "sample-wordbook-1",
    title: "Travel English",
    description: "Common words for airports and hotels",
    updatedAt: new Date().toISOString(),
    cards: [
      {
        id: "sample-card-1",
        front: "boarding pass",
        back: "搭乗券",
        status: "unknown",
      },
      {
        id: "sample-card-2",
        front: "reservation",
        back: "予約",
        status: "known",
      },
    ],
  },
];

type UnknownRecord = Record<string, unknown>;
const isObject = (v: unknown): v is UnknownRecord =>
  typeof v === "object" && v !== null;
const isCardStatus = (v: unknown): v is Card["status"] =>
  v === "known" || v === "unknown";

const isCard = (v: unknown): v is Card => {
  if (!isObject(v)) return false;
  return (
    typeof v.id === "string" &&
    typeof v.front === "string" &&
    typeof v.back === "string" &&
    isCardStatus(v.status)
  );
};

const isWordbook = (v: unknown): v is Wordbook => {
  if (!isObject(v)) return false;
  return (
    typeof v.id === "string" &&
    typeof v.title === "string" &&
    Array.isArray(v.cards) &&
    v.cards.every(isCard)
  );
};

const isWordbookArray = (v: unknown): v is Wordbook[] =>
  Array.isArray(v) && v.every(isWordbook);

const loadWordbooks = (): Wordbook[] => {
  if (typeof window === "undefined") return DEFAULT_WORDBOOKS;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return DEFAULT_WORDBOOKS;
  try {
    const parsed = JSON.parse(raw);
    return isWordbookArray(parsed) ? parsed : DEFAULT_WORDBOOKS;
  } catch {
    return DEFAULT_WORDBOOKS;
  }
};

export const useWordbooks = () => {
  const [wordbooks, setWordbooks] = useState<Wordbook[]>(() => loadWordbooks());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wordbooks));
  }, [wordbooks]);

  // --- 単語帳の操作 ---
  const addWordbook = (title: string, description: string) => {
    const newBook: Wordbook = {
      id: crypto.randomUUID(),
      title,
      description,
      updatedAt: new Date().toISOString(),
      cards: [],
    };
    setWordbooks((prev) => [newBook, ...prev]);
  };

  const deleteWordbook = (id: string) => {
    setWordbooks((prev) => prev.filter((b) => b.id !== id));
  };

  const addCard = (bookId: string, front: string, back: string) => {
    setWordbooks((prev) =>
      prev.map((book) => {
        if (book.id !== bookId) return book;
        const newCard: Card = {
          id: crypto.randomUUID(),
          front,
          back,
          status: "unknown",
        };
        return {
          ...book,
          cards: [newCard, ...book.cards],
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  };

  const deleteCard = (bookId: string, cardId: string) => {
    setWordbooks((prev) =>
      prev.map((book) => {
        if (book.id !== bookId) return book;
        return {
          ...book,
          cards: book.cards.filter((c) => c.id !== cardId),
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  };

  return {
    wordbooks,
    addWordbook,
    deleteWordbook,
    addCard,
    deleteCard,
  };
};
