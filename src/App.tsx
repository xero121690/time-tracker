import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Timer from "./pages/Timer";
import History from "./pages/History";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Timer />} />
          <Route path="/History" element={<History />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
