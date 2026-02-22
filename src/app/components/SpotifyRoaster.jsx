import { useState } from 'react';
import { Flame, X } from 'lucide-react';


import { redirectToAuthCodeFlow, getAccessToken } from "./pkce.js";
const clientId = "000593df51b54086800cb9a2e6e57490"; // Replace with your client ID
import getResponse1 from './roaster1.js';

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

let songs = [];
let score;
let content = "";
let sample = "This is just a testing text.So dont worry!!!!";




async function fetchTracks(token) {
  // TODO: Call Web API
  const result = await fetch(`https://api.spotify.com/v1/me/tracks?limit=50&offset=0`, {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}

async function fetchStats(username) {
  const result = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
  let content = await result.json();
  //chess_rapid data is used
  console.log(content.chess_rapid.best.rating);
  score = content.chess_rapid.best.rating;
  // return await content.chess_rapid.best.rating;
  //   return await result.json();
}

async function populateUITrack(tracks) {
  let text = [];
  for (let i = 0; i < tracks.items.length; i++) {
    text[i] = tracks.items[i].track.name;
  }
  return text;
}

// async function fetchResponse() {
//   let myJSON = JSON.stringify(text);
//   console.log(myJSON);
//   content = await getResponse1(myJSON);
//   console.log(content);
// }
let spotify = false;
let chess = false;
let youtube = false;



export function SpotifyRoaster() {
  const [showRoast, setShowRoast] = useState(false);
  const [roastText, setRoastText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [Option, setOption] = useState('');
  console.log(spotify);

  const handleRoastMe = async () => {
    setIsLoading(true);
    if (Option == "Spotify") {
      let myJSON = JSON.stringify(songs);
      content = await getResponse1(myJSON, Option);
      setIsLoading(false);
      setRoastText(content);
      setShowRoast(true);

    }
    if (Option == "Chess") {
      content = await getResponse1(String(score), Option);
      console.log(content);
      setIsLoading(false);
      setRoastText(content);
      setShowRoast(true);

    }
    if (Option == "youtube") {
      setIsLoading(false);
      setRoastText(content);
      setShowRoast(true);

    }


  };

  const setVal = async (val) => {
    if (val == 1) {
      setOption("Spotify");
      console.log("Spotify!!: " + spotify);
      if (!code) {
        redirectToAuthCodeFlow(clientId);
      } else {
        const accessToken = await getAccessToken(clientId, code);
        const tracks = await fetchTracks(accessToken);
        songs = await populateUITrack(tracks);
      }

    }
    if (val == 2) {
      setOption("Chess");
      console.log("Chess!!")
      let username = prompt("Enter the username");
      fetchStats(username);

    }
    if (val == 3) {
      setOption("youtube");
      console.log("YT");
    }
  };



  return (
    <div className="min-h-screen bg-black from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-6">
      <div className="text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="w-16 h-16 text-red-500" />
            <h1 className="text-6xl text-red-500 ">Roaster</h1>
            <Flame className="w-16 h-16 text-red-500" />
          </div>
          <p className="text-2xl text-gray-600">
            Ready to get <span className="font-semibold text-red-600">destroyed ?</span> 🔥
          </p>
        </div>

        <div>
          <button
            onClick={() => setVal(1)}
            disabled={Option == "Spotify"}
            className="mb-6 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-black font-bold text-xs rounded-2xl transition shadow-2xl hover:shadow-3xl hover:scale-105 disabled:cursor-not-allowed disabled:scale-100"
          >{spotify ? (
            <span className="flex items-center gap-3">
              Spotify
            </span>
          ) : (
            <span className="flex items-center gap-3">
              Spotify
            </span>
          )}</button>

          <button
            onClick={() => setVal(2)}
            disabled={Option == "Chess"}
            className="mb-6 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-black font-bold text-xs rounded-2xl transition shadow-2xl hover:shadow-3xl hover:scale-105 disabled:cursor-not-allowed disabled:scale-100"
          >{chess ? (
            <span className="flex items-center gap-3">
              Chess.com
            </span>
          ) : (
            <span className="flex items-center gap-3">
              Chess.com
            </span>
          )}</button>

          <button
            onClick={() => setVal(3)}
            disabled={Option == "youtube"}
            className="mb-6 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-black font-bold text-xs rounded-2xl transition shadow-2xl hover:shadow-3xl hover:scale-105 disabled:cursor-not-allowed disabled:scale-100"
          >{youtube ? (
            <span className="flex items-center gap-3">
              YouTube
            </span>
          ) : (
            <span className="flex items-center gap-3">
              Youtube
            </span>
          )}</button>
        </div>

        {/* Roast Button */}
        <button
          onClick={handleRoastMe}
          disabled={isLoading}
          className="px-12 py-6 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold text-2xl rounded-2xl transition shadow-2xl hover:shadow-3xl hover:scale-105 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isLoading ? (
            <span className="flex items-center gap-3">
              <Flame className="w-8 h-8 animate-pulse" />
              Analyzing Your Terrible Taste...
            </span>
          ) : (
            <span className="flex items-center gap-3">
              <Flame className="w-8 h-8" />
              Roast Me!
              <Flame className="w-8 h-8" />
            </span>
          )}
        </button>

        <p className="mt-6 text-gray-500 text-sm">
          Click the button and prepare to be humbled
        </p>
      </div>

      {/* Roast Modal */}
      {showRoast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={() => setShowRoast(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl shadow-2xl max-w-2xl max-h-200 w-full p-8 md:p-12 animate-in fade-in zoom-in duration-300">
            {/* Close Button */}
            <button
              onClick={() => setShowRoast(false)}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Roast Header */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <Flame className="w-10 h-10 text-white" />
              <h2 className="text-4xl font-black text-white">The Verdict</h2>
              <Flame className="w-10 h-10 text-white" />
            </div>

            {/* Roast Text */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border-2 border-white/20 max-h-64 overflow-y-scroll">
              <p className="text-xs text-white leading-relaxed font-medium text-center">
                {roastText}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-white/90 text-lg font-semibold">
                💀 Feeling burned? Good. 💀
              </p>
              <button
                onClick={() => setShowRoast(false)}
                className="mt-4 px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition border border-white/30"
              >
                I've Learned My Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}