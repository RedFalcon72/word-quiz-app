import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useWordbooks } from "../hooks/useWordbooks";

const Editor = () => {
  const { id } = useParams();
  const { wordbooks, addCard, deleteCard } = useWordbooks();

  // 入力フォームの状態管理
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const book = wordbooks.find((b) => b.id === id);

  if (!book) {
    return <div className="p-10 text-center">単語帳が見つかりません。</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!front.trim() || !back.trim()) return;

    // 単語カードを追加
    addCard(book.id, front, back);

    // 入力欄をリセット
    setFront("");
    setBack("");

    // 再度、Frontの入力欄にフォーカス
    (document.getElementById("front-input") as HTMLInputElement)?.focus();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* ヘッダー */}
      <header className="flex items-center justify-between">
        <Link
          to={`/book/${id}`}
          className="text-blue-500 font-bold hover:underline"
        >
          ← 戻る
        </Link>
        <h1 className="text-xl font-black text-gray-800">
          「{book.title}」を編集
        </h1>
        <div className="w-10"></div> {/* バランス調整用 */}
      </header>

      {/* カード追加フォーム */}
      <section className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
        <h2 className="text-lg font-black mb-4 flex items-center gap-2">
          <span>✨</span> 新しいカードを追加
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                Front (英単語など)
              </label>
              <input
                id="front-input"
                type="text"
                value={front}
                onChange={(e) => setFront(e.target.value)}
                placeholder="Apple"
                className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                Back (日本語訳など)
              </label>
              <input
                type="text"
                value={back}
                onChange={(e) => setBack(e.target.value)}
                placeholder="りんご"
                className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all font-bold"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-2xl font-black hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200"
          >
            追加する
          </button>
        </form>
      </section>

      {/* カードリスト */}
      <section className="space-y-4">
        <h2 className="text-lg font-black flex items-center gap-2 ml-1">
          <span>📚</span> 登録済みのカード ({book.cards.length})
        </h2>
        <div className="space-y-3">
          {book.cards.map((card) => (
            <div
              key={card.id}
              className="group flex items-center justify-between p-5 bg-white border-2 border-gray-100 rounded-2xl hover:border-blue-200 transition-all shadow-sm"
            >
              <div className="flex gap-8">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">
                    Front
                  </p>
                  <p className="font-black text-gray-800">{card.front}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">
                    Back
                  </p>
                  <p className="font-bold text-gray-600">{card.back}</p>
                </div>
              </div>
              <button
                onClick={() => deleteCard(book.id, card.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                title="削除"
              >
                🗑️
              </button>
            </div>
          ))}
          {book.cards.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
              <p className="text-gray-400 font-bold">
                まだカードがありません。
                <br />
                上のフォームから追加してみましょう！
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Editor;
