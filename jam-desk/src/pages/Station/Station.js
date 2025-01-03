import React, { useState, useEffect, useCallback } from 'react';
import './Station.css';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import { useDropzone } from 'react-dropzone';
import { saveProject } from '../../services/projectService';
import { useNavigate } from 'react-router-dom';

const Station = () => {

  const [audioFiles, setAudioFiles] = useState({});
  const [audios, setAudios] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [playButtonLabel, setPlayButtonLabel] = useState("Play");
  const project = JSON.parse(localStorage.getItem('project'));
  const navigate = useNavigate();

  // Handling audio files being dropped into work station

  const onDrop = (acceptedFiles) => {

    // Converting audio files to elements separating URL and audios from files

    acceptedFiles.forEach(file => {

      const fileName = file.name;
      const fileURL = URL.createObjectURL(file)
      const fileAudio = new Audio(fileURL);

      project.audioFiles[fileName] = {fileURL, date: new Date().toDateString()};
      saveProject(project.id, project);
      localStorage.setItem('project', JSON.stringify(project));

      setAudioFiles(project.audioFiles);
      setAudios(prevAudios => ({...prevAudios, [fileName]: {fileAudio, progress: 0}}));

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

  const onSelectionChange = (isSelected, fileName) => {

    setAudios(currentAudios => {

      const updatedAudios = {...currentAudios};

      if (isSelected) {

        const fileURL = audioFiles[fileName].fileURL;

        audios[fileName] = {fileAudio: new Audio(fileURL), progress: 0};

      }
      else {

        delete audios[fileName];

      }

      return updatedAudios;

    });

  }

  // Loading audio files already present in project to files area

  useEffect(() => {

    if (!localStorage.getItem('project')) {

      navigate('/projects');

    }
    else {

      console.log("Should see project in localStorage")

    }

    if (project?.audioFiles) {

      setAudioFiles(project.audioFiles);

    }

  }, [navigate])

  // Updating audio progress at each current time

  const updateProgress = (fileName) => {

    setAudios((prevAudios) => {

      const updatedAudios = {...prevAudios};
      const fileAudio = updatedAudios[fileName]?.fileAudio;
      if (fileAudio) {

        const progress = (fileAudio.currentTime / fileAudio.duration) * 100;
        updatedAudios[fileName].progress = progress;

      }

      return updatedAudios;

    })

  }

  // Add event listeners for each audio file to track progress

  useEffect(() => {

    const eventListeners = [];

    for (const fileName in audios) {

      const fileAudio = audios[fileName].fileAudio;

      // Updating audio progress at each current time

      const handleTimeUpdate = () => updateProgress(fileName)

      fileAudio.addEventListener('timeupdate', handleTimeUpdate);
      eventListeners.push(() => fileAudio.removeEventListener('timeupdate', handleTimeUpdate))

    }

    return () => {eventListeners.forEach((cleanup) => cleanup())}

  }, [audios]);

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

  return (

    <div className='station'>

      <Header/>

      <div className='project-name'>{project.name}</div>

      <div className='files'>Files</div>
      <List onSelectionChange={onSelectionChange} size="medium" listItems={Object.entries(audioFiles)} type={"station"}/>

      <div className='work-station-title'>Station</div>
      <div className='work-station' {...getRootProps()}>

        <input {...getInputProps()}/>

        <div className='drop-zone'>
          Drag audio files here
        </div>

        <div className='audio-files-list'>

          {Object.keys(audios).length > 0 && (

            <div>
                
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