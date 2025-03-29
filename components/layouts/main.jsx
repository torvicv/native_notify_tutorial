import Sidebar from "@/components/header/sidebar";
import Header from "@/components/header/header";
import { getServerSession } from "next-auth";
import authOptions from "@/app/lib/auth";
const Main = ({ children }) => {

  const session = getServerSession(authOptions);

  return (
    <>
      <div className="flex items-start">
        <Sidebar />
        <div className="flex-[1_1_100%] relative flex flex-col min-h-screen">
          <header>
            <Header user={session} />
          </header>
          <main className="flex-[1_1_100%] mt-24 px-4">{children}</main>
          <footer className="px-4 py-3">&copy; 2025 Nextjs React Prisma</footer>
        </div>
      </div>
    </>
  );
};

export default Main;
