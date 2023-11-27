import Layout from "./components/global/Layout";
import PageTrangChu from './pages/PageTrangChu';
import PageQuanLy from './pages/PageNhanVien';
import PagePhongBan from './pages/PagePhongBan';
import PageLinhVuc from './pages/PageLinhVuc';
import { Routes, Route } from "react-router-dom";
import PageCongVan from "./pages/PageCongVan";
import { QueryClient, QueryClientProvider } from "react-query";
import CVanDetail from "./components/congvan/CVanDetail";

const queryClient = new QueryClient({});

function App() {
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<PageTrangChu />} />
          <Route path="nhanvien" element={<PageQuanLy />} />
          <Route path="phongban" element={<PagePhongBan />} />
          <Route path="linhvuc" element={<PageLinhVuc />} />
          <Route path="congvan" element={<PageCongVan />} />
          <Route path="/congvan/:id" element={<CVanDetail />} />
        </Routes>
      </QueryClientProvider>
    </Layout>
  );
}

export default App;
