import { Route, Routes } from "react-router-dom";
// @ts-ignore
import Home from "./pages/Home";
// @ts-ignore
import Register from "./pages/register";
// @ts-ignore
import Login from "./pages/login";

function App() {
  return (
    <>
      <div>
        <Routes>
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
