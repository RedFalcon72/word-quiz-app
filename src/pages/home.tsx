import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useWordbooks } from "../hooks/useWordbooks";

const Home = () => {
  const { wordbooks, addWordbook } = useWordbooks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      alert("タイトルを入力してください");
      return;
    }
    addWordbook(trimmedTitle, description.trim());
    setTitle("");
    setDescription("");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      <header className="pt-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          My Books
        </h1>
        <p className="text-gray-500 mt-2">
          学習する単語帳を選択するか、新しく作成してください。
        </p>
      </header>

      {/* 新規作成エリア */}
      <section className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="タイトル（例：TOEIC頻出英単語）"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="説明（オプション）"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-xl shadow-md transition-all active:scale-95"
            >
              作成
            </button>
          </div>
        </form>
      </section>

      {/* リスト表示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wordbooks.map((book) => (
          <Link
            key={book.id}
            to={`/book/${book.id}`}
            className="group bg-white border border-gray-100 rounded-[1.5rem] p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {book.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">
                {book.description || "説明はありません"}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-gray-400">
              <span className="text-xs font-bold uppercase tracking-wider">
                {book.cards.length} Cards
              </span>
              <span className="text-sm font-bold group-hover:text-blue-500">
                詳細へ →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
