import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tavern from "@/pages/Tavern";
import Duel from "@/pages/Duel";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tavern />} />
        <Route path="/duel/:philosopherId" element={<Duel />} />
      </Routes>
    </Router>
  );
}
