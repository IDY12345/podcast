import React from 'react'

const Podcast = ({params}:{params:{id:string}}) => {
  return (
    <p className='text-white-1'>Podcast for {params.id}</p>
  )
}

export default Podcast