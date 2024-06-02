import React from 'react'
import Loading from '../image/Loading.gif';

const Spinner = () => {
  return (
    <div className='container d-flex justify-content-center'>
        <img src={Loading} alt="" />
    </div>
  )
}

export default Spinner