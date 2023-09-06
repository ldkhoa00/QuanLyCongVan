import Layout from "./components/global/Layout";
import PageTrangChu from './pages/PageTrangChu';
import PageQuanLy from './pages/PageQuanLy';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<PageTrangChu />} />
          <Route path="quanly" element={<PageQuanLy />} />
        </Routes>
      </Layout>

    </>
  );
}

export default App;
