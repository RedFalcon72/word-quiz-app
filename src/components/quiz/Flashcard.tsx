import { useSpeech } from "../../hooks/useSpeech";

/**
 * フラッシュカードの見た目と回転アニメーションを担当するコンポーネント
 */
type Props = {
  front: string;
  back: string;
  isFlipped: boolean;
  onFlip: () => void;
};

const Flashcard = ({ front, back, isFlipped, onFlip }: Props) => {
  const { speak } = useSpeech(); // フックの呼び出し

  return (
    <div
      onClick={onFlip}
      className="relative h-80 w-full cursor-pointer [perspective:1000px]"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* 表面 */}
        <div className="absolute inset-0 w-full h-full bg-white border-4 border-slate-900 rounded-[2.5rem] flex items-center justify-center p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] [backface-visibility:hidden] [transform:translateZ(1px)]">
          {/*  左上にボタン配置。e.stopPropagation()でカードが回るのを防ぐ */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              speak(front);
            }}
            className="absolute top-6 left-6 text-2xl hover:scale-110 transition-transform"
          >
            🔊
          </button>

          <span className="text-4xl font-black text-slate-800 text-center">
            {front}
          </span>
          <span className="absolute bottom-6 text-[10px] font-bold text-gray-300">
            TAP TO FLIP
          </span>
        </div>

        {/* 裏面 */}
        <div className="absolute inset-0 w-full h-full bg-blue-50 border-4 border-blue-600 rounded-[2.5rem] flex items-center justify-center p-8 [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
          {/* 裏面にも同じ位置にボタン配置 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              speak(back);
            }}
            className="absolute top-6 left-6 text-2xl hover:scale-110 transition-transform text-blue-600"
          >
            🔊
          </button>

          <span className="text-4xl font-black text-blue-600 text-center">
            {back}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
