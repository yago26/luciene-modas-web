import Link from "next/link";
import ConsumidoresSignIn from "@/components/ConsumidoresSignIn";

export default function SignIn() {
  return (
    <>
      <Link href="../">Voltar</Link>
      <ConsumidoresSignIn />
    </>
  );
}
