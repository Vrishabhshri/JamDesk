import React, { useState, useEffect, useCallback } from 'react';
import './Station.css';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import { useDropzone } from 'react-dropzone';
import { useLocation } from 'react-router-dom';
import { saveProject } from '../../services/projectService';

const Station = () => {

  const [audioFiles, setAudioFiles] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [playButtonLabel, setPlayButtonLabel] = useState("Play");
  const [audios, setAudios] = useState({});
  const location = useLocation();
  const project = location.state?.project;

  // Handling audio files being dropped into work station

  const onDrop = (acceptedFiles) => {

    // Converting audio files to elements separating URL and audios from files

    acceptedFiles.forEach(file => {

      const fileName = file.name;
      const fileURL = URL.createObjectURL(file)
      const fileAudio = new Audio(fileURL);

      setAudios(prevAudios => ({...prevAudios, [fileName]: {fileAudio}}));
      setAudioFiles(prevAudioFiles => ({...prevAudioFiles, [fileName]: {fileURL, date: new Date()}}))
      project.audioFiles = audioFiles

    });

  };

  // Creating drop zone for audio files

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'audio/*',
  });

  // Handling pause and play of audio

  const toggleAudio = () => {

    if (isPlaying) {

      // audioFiles.forEach(file => {

      //   file.audio.pause();

      // });

      for (const fileName in audios) {

        const fileAudio = audios[fileName].fileAudio;

        fileAudio.pause();

      }

      setPlayButtonLabel("Play");

    }
    else {

      // audioFiles.forEach(file => {

      //   file.audio.play();

      // });

      for (const fileName in audios) {
        
        const fileAudio = audios[fileName].fileAudio;

        fileAudio.play();

      }

      setPlayButtonLabel("Pause");

    }

    setIsPlaying(!isPlaying);

  }

  // Loading progress bars for each song

  const updateProgress = useCallback((fileName) => {

    // const file = audioFiles[index];
    // const progress = (file.audio.currentTime / file.audio.duration) * 100;
    // const updatedFiles = [...audioFiles];
    // updatedFiles[index].progress = progress;
    // setAudioFiles(updatedFiles);

    setAudios((prevAudios) => {

      const fileAudio = prevAudios[fileName].fileAudio;

      if (!fileAudio) {

        console.log("Audio file not found")
        return prevAudios;

      }
      else {

        const progress = (fileAudio.currentTime / fileAudio.duration) * 100;
        return {...prevAudios, [fileName]: {...fileAudio, progress}}

      }

    });

  }, []);

  // const onSelectionChange = (isSelected, fileInfo) => {

  //   if (isSelected) {

      

  //   }

  // }

  // Add event listeners for each audio file to track progress

  // Adding audio files already present in project to files area

  useEffect(() => {

    if (project?.audioFiles) {

      setAudioFiles(project.audioFiles);

    }

  }, [project])

  useEffect(() => {

    // audioFiles.forEach((file, index) => {

    //   file.audio.addEventListener('timeupdate', () => updateProgress(index));

    //   // Cleanup event listener when component unmounts
    //   return () => file.audio.removeEventListener('timeupdate', () => updateProgress(index));

    // });

    for (const fileName in audios) {

      const fileAudio = audios[fileName].fileAudio

      fileAudio.addEventListener('timeupdate', () => updateProgress(fileName));

      // Cleanup event listener when component unmounts
      return () => fileAudio.removeEventListener

    }

  }, [audios, updateProgress]);

  // Stopping audio when reloading the page

  useEffect(() => {
    // Stop all audio and reset files when leaving the page or unmounting
    const handleBeforeUnload = () => {

      audioFiles.forEach((file) => {

        file.audio.pause();
        file.audio.currentTime = 0;

      });

      setAudioFiles([]);
      setIsPlaying(false);

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
      <List size="medium" listItems={Object.entries(audioFiles)} type={"station"}/>

      <div className='work-station-title'>Station</div>
      <div className='work-station' {...getRootProps()}>

        <input {...getInputProps()}/>

        <div className='drop-zone'>
          Drag audio files here
        </div>

        <div className='audio-files-list'>

          {Object.keys(audios).length > 0 && (

            <div>

                {/* {audioFiles.map((file, index) => (

                  <div className='file' key={index}>{file.name}

                  <div className="progress-bar-container">

                    <div className="progress-bar" style={{ width: `${file.progress}%` }}/>

                  </div>
                  
                  </div>
                )); */}
                
                {Object.keys(audios).map((fileName, index) => (

                  <div className='file' key={index}>{fileName}

                  <div className="progress-bar-container">

                    <div className="progress-bar" style={{ width: `${audios[fileName].progress}%` }}/>

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