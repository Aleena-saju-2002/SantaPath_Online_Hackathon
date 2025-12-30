import { useState } from "react";
import Landing from "./pages/Landing";
import KidStart from "./pages/KidStart";
import KidWish from "./pages/KidWish";
import DailyTask from "./pages/DailyTask";
import SantaDash from "./pages/SantaDashboard";
import FinalMessage from "./pages/FinalMessage";
import SantaChat from "./components/SantaChat";

import SantaLogin from "./pages/SantaLogin";

function App() {
  const [page, setPage] = useState("landing");

  return (
    <div>
      {/* 🎅 Global Santa Chatbot - Available on all pages EXCEPT Santa Dashboard & Login */}
      {page !== "santa" && page !== "santa-login" && <SantaChat />}

      {page === "landing" && <Landing setPage={setPage} />}
      {page === "kid" && <KidStart setPage={setPage} />}
      {page === "wish" && <KidWish setPage={setPage} />}
      {page === "task" && <DailyTask setPage={setPage} />}
      {page === "final" && <FinalMessage />}
      {page === "santa-login" && <SantaLogin setPage={setPage} />}
      {page === "santa" && <SantaDash />}
    </div>
  );
}

export default App;
