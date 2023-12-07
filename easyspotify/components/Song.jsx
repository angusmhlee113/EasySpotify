import { useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";

const Song = ({
  sno,
  track,
  setGlobalCurrentSongId,
  setGlobalIsTrackPlaying,
  setView,
  setGlobalArtistId,
}) => {
  const [hover, setHover] = useState(false);
  const { data: session } = useSession();

  async function playSong(track) {
    setGlobalCurrentSongId(track.id);
    setGlobalIsTrackPlaying(true);
    if (session && session.accessToken) {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/play",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({
            uris: [track.uri],
          }),
        }
      );
      console.log("on play", response.status);
    }
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {hover ? (
            <PlayIcon
              onClick={async () => await playSong(track)}
              className="h-5 w-5 text-white"
            />
          ) : (
            <p className="w-5">{sno + 1}</p>
          )}
          <div className="flex items-center space-x-4">
            <img
              className="h-12 w-12 rounded-lg"
              src={track?.album?.images[0]?.url}
            />
            <div className="flex flex-col mb-3 pt-2">
              <p className="text-white mt-2">{track.name}</p>
              <p className="text-gray-400">
                {track.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Song;
