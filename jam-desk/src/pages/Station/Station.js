import React, { useState, useEffect, useCallback } from 'react';
import './Station.css';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import { useDropzone } from 'react-dropzone';

const Station = () => {

  const [audioFiles, setAudioFiles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playButtonLabel, setPlayButtonLabel] = useState("Play");

  const onDrop = (acceptedFiles) => {

    // Converting audio files to elemenets
    const newFiles = acceptedFiles.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file), // Creating URL for each audio file
      audio: new Audio(URL.createObjectURL(file)) // Creating Audio object
    }));

    setAudioFiles((audioFiles) => [...audioFiles, ...newFiles]);

  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'audio/*',
  });

  const toggleAudio = () => {

    if (isPlaying) {

      audioFiles.forEach(file => {

        file.audio.pause();

      });

      setPlayButtonLabel("Play");

    }
    else {

      audioFiles.forEach(file => {

        file.audio.play();

      });

      setPlayButtonLabel("Pause");

    }

    setIsPlaying(!isPlaying);

  }

  const updateProgress = useCallback((index) => {

    const file = audioFiles[index];
    const progress = (file.audio.currentTime / file.audio.duration) * 100;
    const updatedFiles = [...audioFiles];
    updatedFiles[index].progress = progress;
    setAudioFiles(updatedFiles);

  }, [audioFiles]);

  // Add event listeners for each audio file to track progress
  useEffect(() => {

    audioFiles.forEach((file, index) => {

      file.audio.addEventListener('timeupdate', () => updateProgress(index));

      // Cleanup event listener when component unmounts
      return () => file.audio.removeEventListener('timeupdate', () => updateProgress(index));

    });

  }, [audioFiles, updateProgress]);

  // Stopping audio when reloading the page

  useEffect(() => {
    // Stop all audio and reset files when leaving the page or unmounting
    const handleBeforeUnload = () => {

      audioFiles.forEach((file) => {

        file.audio.pause();

      });

      setAudioFiles([]);

    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function to remove the event listener when the component unmounts

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };

  }, [audioFiles]);

  return (

    <div className='station'>

      <Header/>

      <div className='files'>Files</div>
      <List size="medium"/>

      <div className='work-station-title'>Station</div>
      <div className='work-station' {...getRootProps()}>

        <input {...getInputProps()}/>

        <div className='drop-zone'>
          Drag audio files here
        </div>

        <div className='audio-files-list'>

          {audioFiles.length > 0 && (

            <div>

                {audioFiles.map((file, index) => (

                  <div className='file' key={index}>{file.name}

                  <div className="progress-bar-container">

                    <div className="progress-bar" style={{ width: `${file.progress}%` }}/>

                  </div>
                  
                  </div>
                ))}

            </div>

          )}

        </div>

      </div>

      <div className='play-button' onClick={toggleAudio}>{playButtonLabel}</div>

    </div>

  )

}

export default Station