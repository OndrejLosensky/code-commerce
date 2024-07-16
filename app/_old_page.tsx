import Link from "next/link";
import { FaShop } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="w-screen h-screen flex flex-col justify-center  items-center">
      <Link href="/admin" className="absolute top-4 right-4 active:scale-90 duration-200"> <Button> Admin</Button> </Link>
      
      <div className="w-full mx-auto flex flex-row items-center justify-center gap-x-4">
         <FaShop className="w-12 h-12"/>
         <h1 className="text-5xl font-black text-center"> CodeCommerce </h1>
      </div>
       <p className="text-center text-2xl font-thin pt-1"> Smart way to manage online store </p>
    </main>
  );
}
