import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import PlaylistView from "@/components/PlaylistView";

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
  }, [session, globalPlaylistId]);

  return (
    <>
      <main className="h-screen overflow-hidden bg-black">
        <div className="flex w-full">
          <Sidebar
            view={view}
            setView={setView}
            setGlobalPlaylistId={setGlobalPlaylistId}
          />
          {view === "playlist" && (
            <PlaylistView
              setView={setView}
              setGlobalArtistId={setGlobalArtistId}
              globalPlaylistId={globalPlaylistId}
            />
          )}
        </div>
      </main>
      <div className="sticky z-20 bottom-0 h-24 w-full bg-red-100"></div>
    </>
  );
}
