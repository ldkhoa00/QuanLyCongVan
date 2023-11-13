import Layout from "./components/global/Layout";
import PageTrangChu from './pages/PageTrangChu';
import PageQuanLy from './pages/PageNhanVien';
import PagePhongBan from './pages/PagePhongBan';
import PageChuDeCVan from './pages/PageChuDeCVan';
import { Routes, Route } from "react-router-dom";
import PageCongVan from "./pages/PageCongVan";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({});

function App() {
  return (
      <Layout>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<PageTrangChu />} />
            <Route path="nhanvien" element={<PageQuanLy />} />
            <Route path="phongban" element={<PagePhongBan />} />
            <Route path="chudecvan" element={<PageChuDeCVan />} />
            <Route path="congvan" element={<PageCongVan />} />
          </Routes>
        </QueryClientProvider>
      </Layout>
  );
}

export default App;
