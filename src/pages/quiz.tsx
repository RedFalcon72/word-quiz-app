import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useWordbooks } from "../hooks/useWordbooks";

/**
 * クイズ画面コンポーネント
 * 登録されたカードを順番に出題する
 */
const Quiz = () => {
  const { id } = useParams();
  const { wordbooks } = useWordbooks();
  const book = wordbooks.find((b) => b.id === id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState({ known: 0, unknown: 0 });

  // 単語帳またはカードが存在しない場合のガード処理
  if (!book || book.cards.length === 0) {
    return (
      <div className="p-10 text-center space-y-4">
        <p className="text-gray-500 font-bold">
          出題できる単語が登録されていません。
        </p>
        <Link
          to={`/book/${id}/edit`}
          className="text-blue-500 font-black hover:underline"
        >
          単語を登録する →
        </Link>
      </div>
    );
  }

  const cards = book.cards;
  const currentCard = cards[currentIndex];

  /**
   * 回答ボタン押下時の処理
   */
  const handleAnswer = (type: "known" | "unknown") => {
    setScore((prev) => ({ ...prev, [type]: prev[type] + 1 }));

    if (currentIndex + 1 < cards.length) {
      // 次のカードへ進む前に、カードの状態を表面にリセットする
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  // 全問題終了時のリザルト画面
  if (isFinished) {
    return (
      <div className="max-w-md mx-auto p-8 text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <h1 className="text-4xl font-black text-slate-900">Finish! 🏁</h1>
        <div className="bg-white border-4 border-slate-900 rounded-[2.5rem] p-8 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
          <p className="text-sm font-black text-gray-400 uppercase tracking-widest">
            Your Score
          </p>
          <div className="flex justify-center items-center gap-6 mt-4">
            <div className="text-center">
              <span className="block text-4xl font-black text-green-500">
                {score.known}
              </span>
              <span className="text-xs font-bold text-gray-400">KNOWN</span>
            </div>
            <div className="w-[2px] h-10 bg-gray-100"></div>
            <div className="text-center">
              <span className="block text-4xl font-black text-red-400">
                {score.unknown}
              </span>
              <span className="text-xs font-bold text-gray-400">LEARNING</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full p-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all"
          >
            もう一度挑戦する
          </button>
          <Link
            to="/"
            className="w-full p-4 bg-white border-2 border-gray-200 text-gray-500 rounded-2xl font-black hover:bg-gray-50 transition-all text-center"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 space-y-8">
      {/* 進行状況バー */}
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="bg-blue-500 h-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-xs font-black text-gray-400 uppercase">
        <span>
          Question {currentIndex + 1} of {cards.length}
        </span>
        <Link
          to={`/book/${id}`}
          className="hover:text-red-400 transition-colors"
        >
          Quit
        </Link>
      </div>

      {/* フラッシュカードUI。keyにカード内容を含め、カード切り替え時に要素をリセットする */}
      <div
        key={`${currentIndex}-${currentCard.front}`}
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative h-80 w-full cursor-pointer [perspective:1000px]"
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* 表面の表示。translateZ(1px)を付与して裏面との重なりによる透過を防止する */}
          <div className="absolute inset-0 w-full h-full bg-white border-4 border-slate-900 rounded-[2.5rem] flex items-center justify-center p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] [backface-visibility:hidden] [transform:translateZ(1px)]">
            <span className="text-4xl font-black text-slate-800 text-center">
              {currentCard.front}
            </span>
            <span className="absolute bottom-6 text-[10px] font-bold text-gray-300">
              TAP TO FLIP
            </span>
          </div>

          {/* 裏面の表示。rotateY(180deg)で裏側に配置し、backface-visibilityで表面からは隠す */}
          <div className="absolute inset-0 w-full h-full bg-blue-50 border-4 border-blue-600 rounded-[2.5rem] flex items-center justify-center p-8 [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
            <span className="text-4xl font-black text-blue-600 text-center">
              {currentCard.back}
            </span>
          </div>
        </div>
      </div>

      {/* 回答ボタンエリア。カードが裏返っているときのみ操作可能とする */}
      <div
        className={`grid grid-cols-2 gap-4 transition-all duration-300 ${
          isFlipped
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAnswer("unknown");
          }}
          className="p-5 bg-white border-2 border-red-100 text-red-400 rounded-3xl font-black hover:bg-red-50 hover:border-red-200 transition-all flex flex-col items-center gap-1"
        >
          <span className="text-xl">🤔</span>
          <span>Still learning</span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAnswer("known");
          }}
          className="p-5 bg-white border-2 border-green-100 text-green-500 rounded-3xl font-black hover:bg-green-50 hover:border-green-200 transition-all flex flex-col items-center gap-1"
        >
          <span className="text-xl">✅</span>
          <span>I know this!</span>
        </button>
      </div>
    </div>
  );
};

export default Quiz;
