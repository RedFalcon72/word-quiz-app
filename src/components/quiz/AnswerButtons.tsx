/**
 * クイズの回答用ボタンセット（Known / Still learning）
 */
type Props = {
  isFlipped: boolean;
  onAnswer: (type: "known" | "unknown") => void;
};

const AnswerButtons = ({ isFlipped, onAnswer }: Props) => {
  return (
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
          onAnswer("unknown");
        }}
        className="p-5 bg-white border-2 border-red-100 text-red-400 rounded-3xl font-black hover:bg-red-50 transition-all flex flex-col items-center gap-1"
      >
        <span className="text-xl">🤔</span>
        <span>Still learning</span>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAnswer("known");
        }}
        className="p-5 bg-white border-2 border-green-100 text-green-500 rounded-3xl font-black hover:bg-green-50 transition-all flex flex-col items-center gap-1"
      >
        <span className="text-xl">✅</span>
        <span>I know this!</span>
      </button>
    </div>
  );
};

export default AnswerButtons;
