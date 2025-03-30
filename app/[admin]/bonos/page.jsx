import Main from "@/components/layouts/main";
import Bonos from "./bonos";

export default async function Page() {
  const response = await fetch(process.env.NEXTAUTH_URL+'/api/admin/bonos');
  const bonos = await response.json();
  return (
    <Main>
      <Bonos bonos={bonos} />
    </Main>
  )
}