import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Quiz from "./pages/quiz";
import Editor from "./pages/editor";

export default function App() {
  return (
    <HashRouter>
      {/* 画面全体のベースデザイン */}
      <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
        <Routes>
          {/* ホーム */}
          <Route path="/" element={<Home />} />

          {/* ダッシュボード */}
          <Route path="/book/:id" element={<Dashboard />} />

          {/* クイズ画面 */}
          <Route path="/book/:id/quiz" element={<Quiz />} />

          {/* 編集画面 */}
          <Route path="/book/:id/edit" element={<Editor />} />
        </Routes>
      </main>
    </HashRouter>
  );
}
