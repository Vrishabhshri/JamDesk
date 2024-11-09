import React from 'react';
import './Station.css';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';

const Station = () => {

  return (

    <div className='station'>

      <Header/>

      <div className='files'>
        Files
      </div>
      <List/>

      <div className='work-station'>

      </div>

    </div>

  )

}

export default Station