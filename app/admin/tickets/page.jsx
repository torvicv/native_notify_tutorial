import Main from "@/components/layouts/main";
import Tickets from "./tickets";

export default async function Page() {
  const response = await fetch(process.env.NEXTAUTH_URL+'/api/admin/tickets');
  const tickets = await response.json();
  return (
    <Main>
      <Tickets tickets={tickets} />
    </Main>
  )
}