import { Route, Routes, useLocation } from "react-router-dom";
// @ts-ignore
import Home from "./pages/Home";
// @ts-ignore
import Register from "./pages/register";
// @ts-ignore
import Login from "./pages/login";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    <>
      <div>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
