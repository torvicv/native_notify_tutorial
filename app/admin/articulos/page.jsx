import Main from "@/components/layouts/main";
import Articulos from "./articulos";

export default async function Page() {
  const response = await fetch(process.env.NEXTAUTH_URL+'/api/admin/articulos');
  const articulos = await response.json();
  return (
    <Main>
      <Articulos articulos={articulos} />
    </Main>
  )
}