// import Checkout from "@/components/carrinho/Checkout";
// import { useSearchParams } from "next/navigation";

// export default async function CheckoutPage() {
//   const searchParams = useSearchParams();

//   const ids = searchParams.get("ids")?.split(",") ?? [];

//   const produtos = await Promise.all(
//     ids.map(async (id) => {
//       const res = await fetch(`${process.env.NEXTAUTH_URL || ""}/produtos/${id}`);
//       const produto = await res.json();
//       return {...produto, quantidade: quantidades.shift()}
//     })
//   );

//   const quantidades = searchParams.get("quantidades")?.split(",") ?? [];

//   return (
//     <div>
//       <h1>Checkout</h1>
//       <Checkout produtos={produtos} />
//     </div>
//   );
// }
