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

const isObject = (value: unknown): value is UnknownRecord => {
  return typeof value === "object" && value !== null;
};

const isCardStatus = (value: unknown): value is Card["status"] => {
  return value === "known" || value === "unknown";
};

const isCard = (value: unknown): value is Card => {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.front === "string" &&
    typeof value.back === "string" &&
    isCardStatus(value.status)
  );
};

const isWordbook = (value: unknown): value is Wordbook => {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.updatedAt === "string" &&
    Array.isArray(value.cards) &&
    value.cards.every((card) => isCard(card))
  );
};

const isWordbookArray = (value: unknown): value is Wordbook[] => {
  return (
    Array.isArray(value) && value.every((wordbook) => isWordbook(wordbook))
  );
};

const loadWordbooks = (): Wordbook[] => {
  if (typeof window === "undefined") {
    return DEFAULT_WORDBOOKS;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return DEFAULT_WORDBOOKS;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isWordbookArray(parsed) || parsed.length === 0) {
      return DEFAULT_WORDBOOKS;
    }

    return parsed;
  } catch {
    return DEFAULT_WORDBOOKS;
  }
};

export const useWordbooks = () => {
  const [wordbooks, setWordbooks] = useState<Wordbook[]>(() => loadWordbooks());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wordbooks));
  }, [wordbooks]);

  const addWordbook = (title: string, description: string) => {
    const now = new Date().toISOString();
    const newWordbook: Wordbook = {
      id: crypto.randomUUID(),
      title,
      description,
      updatedAt: now,
      cards: [],
    };

    setWordbooks((prev) => [newWordbook, ...prev]);
  };

  const updateWordbook = (
    id: string,
    updates: Pick<Wordbook, "title" | "description">,
  ) => {
    setWordbooks((prev) =>
      prev.map((wordbook) => {
        if (wordbook.id !== id) {
          return wordbook;
        }

        return {
          ...wordbook,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  };

  const deleteWordbook = (id: string) => {
    setWordbooks((prev) => prev.filter((wordbook) => wordbook.id !== id));
  };

  return {
    wordbooks,
    addWordbook,
    updateWordbook,
    deleteWordbook,
    setWordbooks,
  };
};
