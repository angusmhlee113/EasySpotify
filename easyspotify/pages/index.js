import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const { data: session } = useSession();
  const [sessiontoken, setSessiontoken] = useState("");
  const [view, setView] = useState("search"); // ["search", "library", "playlist", "artist"]
  const [globalPlaylistId, setGlobalPlaylistId] = useState(null);
  const [globalArtistId, setGlobalArtistId] = useState(null);

  useEffect(() => {
    if (session && session.accessToken) {
      setSessiontoken(session.accessToken);
    }
  }, [session]);
  return (
    <>
      <main className="h-screen overflow-hidden bg-black">
        <div className="flex w-full">
          <Sidebar
            view={view}
            setView={setView}
            setGlobalArtistId={setGlobalArtistId}
          />
          <div className="text-white">Main</div>
        </div>
      </main>
      <div className="sticky z-20 bottom-0 h-24 w-full bg-red-100"></div>
    </>
  );
}
