import Articulos from "./articulos";

export default async function Page() {
  const response = await fetch(process.env.NEXTAUTH_URL+'/api/admin/articulos');
  const articulos = await response.json();
  return <Articulos articulos={articulos} />;
}