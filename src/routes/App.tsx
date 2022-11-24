import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/fonts.css";
// layouts
import { AnimatedLayout } from "layouts";
// pages
import HomePage from "pages/home";
import CategoryPage from "pages/category";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AnimatedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/category/:category/:subCategory"
            element={<CategoryPage />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
