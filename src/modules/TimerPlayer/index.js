import React, {useState, useEffect, useCallback} from 'react'
import Header from 'components/Header'
import Player from 'modules/Player'
import {useInterval} from 'hooks'
import {play, pause} from 'services/spotifyService'
import './styles.css'

const SECOND = 1000;

export default function TimerPlayer({token, playlists, handleReset}) {
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [currentDuration, setCurrentDuration] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(null)

  const changeIndexCallback = useCallback(() => setCurrentIndex((index) => index ? 0 : 1), [setCurrentIndex])
  const changeTimeRemainingCallback = useCallback(() => setTimeRemaining((time) => --time), [setTimeRemaining])

  useEffect(() => {
    if (isPlaying) {
      const current = playlists[currentIndex]

      setCurrentPlaylist(current)
      play({
        token,
        context: current.selected.uri
      })
      setCurrentDuration(current.time * SECOND)
      setTimeRemaining(current.time)
    } else {
      pause({ token })
    }
  }, [playlists, token, isPlaying, currentIndex])

  useInterval(changeIndexCallback, isPlaying ? currentDuration : null)

  useInterval(changeTimeRemainingCallback, isPlaying ? SECOND : null)

  // Unmounting cleanup - after session reset playback should be paused
  useEffect(() => () => pause({ token }), [token])

  return (
    <div className="TimerPlayer">
      {currentPlaylist && <Header label={currentPlaylist.label}/>}
      <div className="TimerPlayer__wrapper">
        <Player
          token={token}
          handlePlay={() => setIsPlaying(true)}
          handlePause={() => setIsPlaying(false)}
          handleReset={handleReset}/>
        {isPlaying && currentPlaylist &&
          <div className="TimerPlayer__time">
            {secondsToMinutes(timeRemaining)}
            <div className="TimerPlayer__time-description">to the end off {currentPlaylist.label} session</div>
          </div>}
      </div>
    </div>
  )
}

function secondsToMinutes(time){
  return Math.floor(time / 60)+':'+('0'+Math.floor(time % 60)).slice(-2);
}
