import Main from "@/components/layouts/main";
import Servicios from "./servicios";

export default async function Page() {
  const response = await fetch(process.env.NEXTAUTH_URL+'/api/admin/servicios');
  const servicios = await response.json();
  return (
    <Main>
      <Servicios servicios={servicios} />
    </Main>
  )
}