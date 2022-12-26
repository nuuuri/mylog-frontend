import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/fonts.css";
// layouts
import AnimatedMenuLayout from "layouts/AnimatedMenuLayout";
import HeaderLayout from "layouts/HeaderLayout";
// pages
import HomePage from "pages/home";
import CategoryPage from "pages/category";
import PostWritePage from "pages/postwrite";
import PostPage from "pages/post";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<AnimatedMenuLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/category/:category/:subCategory"
            element={<CategoryPage />}
          />
          <Route path="/post/:id" element={<PostPage />} />
        </Route>
        <Route element={<HeaderLayout />}>
          <Route path="/postwrite" element={<PostWritePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
