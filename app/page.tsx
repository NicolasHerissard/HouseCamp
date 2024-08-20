'use client'

import { getUsers } from "@/lib/db/users";
import { useEffect, useState } from "react";
import Header from "./components/header";
import Card from "./components/card";

export default function Home() {

  //const [users, setUsers] = useState([])

  // async function fetchUsers() {
  //   const data = await getUsers()
  //   console.log(data)
  //   setUsers(data)
  // }

  useEffect(() => {

  }, [])

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center p-28 space-y-10">
        <div className="border border-black h-full w-full p-10 flex flex-col items-center justify-center">
          <div>
            <h1 className="text-3xl">Trouver rapidement ce que vous cherchez !</h1>
          </div>
          <div>
            <Card title="Titre"/>
          </div>
        </div>
      </div>
    </div>
  );
}
