
import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import ProgressBar from '../app/components/ProgressBar';
import './globals.css';

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Career Lifter",
  description: "Elevate Your Career",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <body
        className={`${openSans.variable} ${montserrat.variable} antialiased font-sans p-0 m-0 w-screen min-h-screen overflow-x-hidden `}
      >
        <Nav />
        <ToastContainer
          position="top-right" // position of toasts
          autoClose={3000} // auto close after 3 seconds
          hideProgressBar={false} // show progress bar
          newestOnTop={false} // show new toasts at the bottom
          closeOnClick // close toast on click
          rtl={false} // right-to-left support
          pauseOnFocusLoss // pause timer when window loses focus
          draggable // allow drag to dismiss
          pauseOnHover // pause timer on hover
        />
         <ProgressBar />
       
        {children}
        
       
        <Footer />
        
      </body>
    </html>
  );
}
