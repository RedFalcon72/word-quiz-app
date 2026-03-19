import { Link } from "react-router-dom";

type Props = {
  id: string;
  title: string;
  description?: string;
  cardCount: number;
};

const WordbookCard = ({ id, title, description, cardCount }: Props) => {
  return (
    <Link
      to={`/book/${id}`}
      className="group bg-white border border-gray-100 rounded-[1.5rem] p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2">
          {description || "説明はありません"}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-gray-400">
        <span className="text-xs font-bold uppercase tracking-wider">
          {cardCount} Cards
        </span>
        <span className="text-sm font-bold group-hover:text-blue-500">
          詳細へ →
        </span>
      </div>
    </Link>
  );
};

export default WordbookCard;
