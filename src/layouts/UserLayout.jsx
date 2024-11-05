import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

export default function UserLayout({ children }) {
  return (
    <div className="min-h-[100vh] flex flex-col">
      <marquee className="py-2 text-xl font-semibold">
        Shine your style, affirm your personality ❤️
      </marquee>
      <Navigation />
      <main className="mx-10 my-5">{children}</main>
      <Footer />
    </div>
  );
}
