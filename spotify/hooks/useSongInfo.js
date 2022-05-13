import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import useSpotify from './useSpotify';
import {currentTrackIdState} from '../atoms/songAtom';

function useSongInfo() {
  const spotifyApi = useSpotify();
  const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if(currentIdTrack) {
        console.log(currentIdTrack)
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`
            }
          }
        ).then(res => res.json())
        // console.log('trackInfo>>>', trackInfo)
        setSongInfo(trackInfo); 
      }
      // console.log(songInfo)
    }
    fetchSongInfo();
  }, [currentIdTrack, spotifyApi]);

  return songInfo;
}

export default useSongInfo;