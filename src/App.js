import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Category from "./pages/Category";
function App() {
  return (
    <div class="text-black bg-white dark:text-white dark:bg-slate-900">
      <marquee class="p-1">Freeship với đơn hàng từ 500k 🚀</marquee>
      <Navigation />
      <Category/>
      <Footer />
    </div>
  );
}

export default App;
