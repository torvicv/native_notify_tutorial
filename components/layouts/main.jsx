'use client';

import Sidebar from "@/components/header/sidebar";

const Main = ({ children }) => {
  return (
    <>
      <div className="flex items-center">
        <Sidebar />
        <div>
          <header>
            <h1>My Website</h1>
          </header>
          <main>{children}</main>
          <footer>&copy; 2023 My Website</footer>
        </div>
      </div>
    </>
  );
};

export default Main;
