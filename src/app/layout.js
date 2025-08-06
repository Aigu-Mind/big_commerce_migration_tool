import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata = {
  title: "BigCommerce Migration Tool",
  description: "A tool to help migrate your data to BigCommerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <ToastContainer /> */}
        {children}
      </body>
    </html>
  );
}
