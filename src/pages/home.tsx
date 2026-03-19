import { useWordbooks } from "../hooks/useWordbooks";
import WordbookCard from "../components/home/WordbookCard";
import CreateWordbookForm from "../components/home/CreateWordbookForm";

const Home = () => {
  const { wordbooks, addWordbook } = useWordbooks();

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

      <CreateWordbookForm onAdd={addWordbook} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wordbooks.map((book) => (
          <WordbookCard
            key={book.id}
            id={book.id}
            title={book.title}
            description={book.description}
            cardCount={book.cards.length}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
