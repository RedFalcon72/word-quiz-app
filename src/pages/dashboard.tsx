import { useParams, Link } from "react-router-dom";
import { useWordbooks } from "../hooks/useWordbooks";

/**
 * ダッシュボードページ
 * 特定の単語帳の統計情報を表示し、クイズまたは編集画面へのナビゲーションを行う
 */
const Dashboard = () => {
  const { id } = useParams();
  const { wordbooks } = useWordbooks();

  // IDに一致する単語帳を検索
  const book = wordbooks.find((b) => b.id === id);

  // 単語帳が見つからない場合のガード
  if (!book) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-500 font-bold">
          単語帳が見つかりませんでした。
        </p>
        <Link to="/" className="text-blue-500 underline">
          ホームに戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      {/* ヘッダーセクション */}
      <header className="space-y-2">
        <Link
          to="/"
          className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← ホームへ戻る
        </Link>
        <h1 className="text-4xl font-black text-slate-900 leading-tight">
          {book.title}
        </h1>
        <p className="text-gray-500 font-medium">{book.description}</p>
      </header>

      {/* 統計カード */}
      <section className="bg-blue-50 border-2 border-blue-200 rounded-[2rem] p-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-black text-blue-400 uppercase tracking-widest">
            Total Cards
          </p>
          <p className="text-5xl font-black text-blue-600">
            {book.cards.length}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-blue-300">最終更新日</p>
          <p className="text-sm font-bold text-blue-500">
            {new Date(book.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* アクションメニュー */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* クイズ開始ボタン */}
        <Link
          to={`/book/${id}/quiz`}
          className="group relative bg-slate-900 p-8 rounded-[2rem] overflow-hidden transition-all hover:-translate-y-1 active:translate-y-0 shadow-xl"
        >
          <div className="relative z-10">
            <span className="text-3xl mb-2 block">📝</span>
            <h2 className="text-xl font-black text-white">クイズを開始</h2>
            <p className="text-slate-400 text-sm">登録した単語を復習する</p>
          </div>
          <div className="absolute right-[-10%] bottom-[-10%] text-9xl opacity-10 grayscale group-hover:scale-110 transition-transform">
            📝
          </div>
        </Link>

        {/* 単語編集ボタン */}
        <Link
          to={`/book/${id}/edit`}
          className="group relative bg-white border-4 border-slate-900 p-8 rounded-[2rem] transition-all hover:-translate-y-1 active:translate-y-0 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]"
        >
          <div className="relative z-10">
            <span className="text-3xl mb-2 block">✍️</span>
            <h2 className="text-xl font-black text-slate-900">単語を編集</h2>
            <p className="text-slate-500 text-sm">カードの追加や削除を行う</p>
          </div>
          <div className="absolute right-[-10%] bottom-[-10%] text-9xl opacity-5 grayscale group-hover:scale-110 transition-transform">
            ✍️
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
