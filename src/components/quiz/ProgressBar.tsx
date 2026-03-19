/**
 * 進行状況を表示するプログレスバー
 * @param progress 0から100までの数値
 */
type Props = {
  progress: number;
};

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
      <div
        className="bg-blue-500 h-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
