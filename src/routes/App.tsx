import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/fonts.css";
// layouts
import { AnimatedMenuLayout } from "layouts";
// pages
import HomePage from "pages/home";
import CategoryPage from "pages/category";
import PostWritePage from "pages/postwrite";
import HeaderOnlyLayout from "layouts/HeaderOnlyLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AnimatedMenuLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/category/:category/:subCategory"
            element={<CategoryPage />}
          />
        </Route>
        <Route element={<HeaderOnlyLayout />}>
          <Route path="/postwrite" element={<PostWritePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
