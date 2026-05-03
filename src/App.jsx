import { Route, Routes } from "react-router-dom";
import "./App.css";
import Flight from "./component/Flight";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Flight />} />
      </Routes>
    </>
  );
}

export default App;
