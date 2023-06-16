/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-param-reassign */

// Icons
import { FaPause, FaPlay } from 'react-icons/fa';
import { RiFullscreenLine } from 'react-icons/ri';
import {
  BsVolumeDownFill,
  BsVolumeMuteFill,
  BsVolumeUpFill,
} from 'react-icons/bs';

// Hooks
import { useState, useRef, useEffect } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';

function usePlayerState($videoPlayer) {
  const [playerState, setPlayerState] = useState({
    playing: false,
    percentage: 0,
  });
  const [volumeState, setVolumeState] = useState(1);

  const toggleVideoPlay = () => {
    setPlayerState({
      ...playerState,
      playing: !playerState.playing,
    });
  };

  const handleTimeUpdate = () => {
    const currentPercentage =
      ($videoPlayer.current.currentTime / $videoPlayer.current.duration) * 100;

    setPlayerState({
      ...playerState,
      percentage: currentPercentage,
    });
  };

  const handleChangeVideoPercentage = (e) => {
    const currentPercentageValue = e.target.value;

    $videoPlayer.current.currentTime =
      ($videoPlayer.current.duration / 100) * currentPercentageValue;

    setPlayerState({
      ...playerState,
      percentage: currentPercentageValue,
    });
  };

  const handleVolumePercentage = (e) => {
    const currentPercentageValue = e.target.value;
    $videoPlayer.current.volume = currentPercentageValue;
    setVolumeState(currentPercentageValue);
  };

  const handleSpeed = (e) => {
    $videoPlayer.current.playbackRate = e.target.value;
  };

  const handleFullScreen = () => {
    $videoPlayer.current.requestFullscreen();
  };

  useEffect(() => {
    if (playerState.playing) {
      $videoPlayer.current.play();
    } else {
      $videoPlayer.current.pause();
    }
  }, [playerState.playing, $videoPlayer]);

  return {
    playerState,
    toggleVideoPlay,
    handleTimeUpdate,
    handleChangeVideoPercentage,
    handleSpeed,
    handleFullScreen,
    handleVolumePercentage,
    volumeState,
  };
}

const VideoPlayer = ({ video, darkMode }) => {
  const $videoPlayer = useRef(null);
  const {
    playerState,
    volumeState,
    toggleVideoPlay,
    handleTimeUpdate,
    handleChangeVideoPercentage,
    handleSpeed,
    handleFullScreen,
    handleVolumePercentage,
  } = usePlayerState($videoPlayer);

  console.log(volumeState);

  const size = useWindowSize();

  return (
    <div className='relative bg-cMdBlack'>
      {playerState.playing === false && size[0] > 1024 && (
        <div className='w-full h-full absolute flex items-center justify-center bg-cBlackTransp '>
          <h1 className='absolute top-0 left-0 text-2xl text-cWhite w-full p-4 font-bold '>
            {video && video.title}
          </h1>
          <div className='flex items-center justify-center p-8 text-xl bg-cGreen rounded-full text-cWhite '>
            <FaPlay />
          </div>
        </div>
      )}
      <video
        ref={$videoPlayer}
        src={video && video.videoUrl}
        onTimeUpdate={handleTimeUpdate}
        className='w-full xl:w-[80%] mx-auto'
        onClick={toggleVideoPlay}
      />
      <div
        className={`flex p-4 items-center gap-4 border-b-1  ${
          darkMode ? 'bg-cDkBlack border-cLtBlack' : 'bg-cMdWhite border-cWhite'
        }`}>
        <button type='button' onClick={toggleVideoPlay} className='text-cGreen'>
          {playerState.playing ? <FaPause /> : <FaPlay />}
        </button>
        <input
          className='w-full'
          type='range'
          min='0'
          max='100'
          value={playerState.percentage || 0}
          step='0.01'
          onChange={handleChangeVideoPercentage}
        />
        <select
          className={`text-xs font-bold text-cGreen ${
            darkMode ? 'bg-cDkBlack' : 'bg-cDkWhite'
          }`}
          onChange={handleSpeed}>
          <option value='1'>1x</option>
          <option value='1.25'>1.25x</option>
          <option value='1.5'>1.5x</option>
          <option value='1.75'>1.75x</option>
          <option value='2'>2x</option>
        </select>

        <div className='flex items-center gap-2 text-2xl'>
          {volumeState <= 0 && <BsVolumeMuteFill className='text-cGreen' />}
          {volumeState > 0 && volumeState <= 0.5 && (
            <BsVolumeDownFill className='text-cGreen ' />
          )}
          {volumeState > 0.5 && <BsVolumeUpFill className='text-cGreen' />}
          <input
            className='w-full'
            type='range'
            min='0'
            max='1'
            value={volumeState || 0}
            onChange={handleVolumePercentage}
            step='0.01'
          />
        </div>

        <RiFullscreenLine
          className='text-cGreen font-bold text-2xl cursor-pointer'
          onClick={handleFullScreen}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
