import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Timer from "./pages/Timer";
import History from "./pages/History";
import Update from "./pages/Update";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Timer />} />
          <Route path="/History" element={<History />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
