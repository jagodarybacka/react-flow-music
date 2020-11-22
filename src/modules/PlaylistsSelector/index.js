import React, {useState, useEffect} from 'react'
import Playlists from 'modules/Playlists'
import EditBox from 'components/EditBox'
import InputNumber from 'components/InputNumber'
import './styles.css'

export default function PlaylistsSelector({token, selected, syncSelected, label, time, setTime}) {
  const [showPlaylists, setShowPlaylists] = useState(false)
  const bgImage = selected && selected.images[0].url

  const selectPlaylist = (playlist) => {
    syncSelected(playlist)
    setShowPlaylists(false)
  }

  useEffect(() => () => setShowPlaylists(false), [label]) // Cleanup when session part changes

  return (
    <div className="PlaylistsSelector" style={bgImage && { backgroundImage: `url(${bgImage})`}}>
      {
        !showPlaylists &&
          <div className="PlaylistsSelector__form">
            <EditBox
              label="Playlist"
              content={selected?.name || "No playlist selected. Pick one..."}
              onClick={() => setShowPlaylists(true)}/>
            <InputNumber
              label="Duration"
              suffix="min"
              value={time}
              setValue={setTime}
              max={120}
              min={5}/>
          </div>
      }

      { showPlaylists && <Playlists token={token} onClick={selectPlaylist}/> }
    </div>
  )
}
