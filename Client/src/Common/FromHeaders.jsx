import React from 'react'

const FromHeaders = ({title,des}) => {
  return (
    <div className='flex flex-col gap-1'>
        <p className='capitalize font-semibold text-lg'> {title}</p>
        <h1 className='font-medium text-[.7rem]'> {des}</h1>
    </div>
  )
}

export default FromHeaders