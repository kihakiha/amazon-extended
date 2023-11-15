import React, { PropsWithChildren } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="grid" style={{ gridTemplateColumns: "1fr 4fr" }}>
        <Sidebar />
        <main className="p-12">
          <div>{children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;
