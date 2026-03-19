import { useState, type FormEvent } from "react";

type Props = {
  onAdd: (title: string, description: string) => void;
};

const CreateWordbookForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      alert("タイトルを入力してください");
      return;
    }
    onAdd(trimmedTitle, description.trim());
    setTitle("");
    setDescription("");
  };

  return (
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
  );
};

export default CreateWordbookForm;
