import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// layouts
import { DefaultLayout } from "layouts";
// pages
import HomePage from "pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
