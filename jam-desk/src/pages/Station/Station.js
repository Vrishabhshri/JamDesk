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

      setAudios(prevAudios => ({...prevAudios, [fileName]: {fileAudio, progress: 0}}));
      setAudioFiles(prevAudioFiles => ({...prevAudioFiles, [fileName]: {fileURL, date: new Date()}}));

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

      for (const fileName in audios) {

        const fileAudio = audios[fileName].fileAudio;

        fileAudio.pause();

      }

      setPlayButtonLabel("Play");

    }
    else {

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

    const fileAudio = audios[fileName].fileAudio;
    const progress = (fileAudio.currentTime / fileAudio.duration) * 100;
    audios[fileName].progress = progress;

  }, [audios]);

  // const onSelectionChange = (isSelected, fileInfo) => {

  //   if (isSelected) {

      

  //   }

  // }

  // Adding audio files already present in project to files area

  useEffect(() => {

    if (project?.audioFiles) {

      setAudioFiles(project.audioFiles);

    }

  }, [project])

  // Add event listeners for each audio file to track progress

  useEffect(() => {

    const eventListeners = [];

    for (const fileName in audios) {

      const fileAudio = audios[fileName].fileAudio;
      const handleTimeUpdate = () => updateProgress(fileName);

      fileAudio.addEventListener('timeupdate', handleTimeUpdate);
      eventListeners.push(() => fileAudio.removeEventListener('timeupdate', handleTimeUpdate))

    }

    return () => {eventListeners.forEach((cleanup) => cleanup())}

  }, [audios, updateProgress]);

  // Stopping audio when reloading the page

  useEffect(() => {
    // Stop all audio and reset files when leaving the page or unmounting
    const handleBeforeUnload = () => {

      for (const fileName in audios) {

        const fileAudio = audios[fileName].fileAudio;

        fileAudio.pause();
        fileAudio.currentTime = 0;

      }

      setAudioFiles({});
      setIsPlaying(false);

    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function to remove the event listener when the component unmounts

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };

  }, [audios]);

  // Updating project in database properly

  useEffect(() => {

    project.audioFiles = audioFiles;
    saveProject(project.id, project);

  })

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