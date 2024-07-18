import React from 'react'
import { useNavigate,Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const nav = useNavigate();
  const op = useLocation();
  const navi = () =>{
    if(op.pathname=='/'){
      nav('/crpost')
    }else if(op.pathname=='/crpost'){
      nav('/')
    }
  }
  return (
    <div className='navbar bg-blue-950 '>
      <div className='flex justify-between mx-4 items-center p-2'>
        <Link to="/" className='font-semibold text-white'>GenAI Images</Link>
        {op.pathname==='/crpost'?(<button className='font-semibold bg-violet-400 p-2 text-white rounded-lg' onClick={navi}>Explore</button>):(<button className='font-semibold bg-blue-400 p-2 text-white rounded-lg' onClick={navi}>Create Post</button>)}        
      </div>
    </div>
  )
}

export default Navbar
