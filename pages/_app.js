import "../styles/globals.css";
import { Provider } from "../context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopNav from "../components/Nav/basic/TopNav";
import Footer from "../components/Sections/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <TopNav />
      <ToastContainer position="top-center" />
      <div className="min-h-screen pb-20 ">
        <Component key={1} {...pageProps} />
      </div>
      <Footer />
    </Provider>
  );
}

export default MyApp;
