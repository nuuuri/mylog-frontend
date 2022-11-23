import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/fonts.css";
// layouts
import { AnimatedLayout } from "layouts";
// pages
import HomePage from "pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AnimatedLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
