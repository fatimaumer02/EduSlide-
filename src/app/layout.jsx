import "./globals.css";
import Navbar from "../components/Navbar.jsx";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
