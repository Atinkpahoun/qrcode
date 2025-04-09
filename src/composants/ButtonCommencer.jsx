import React from 'react'
import { Link } from 'react-router-dom';

function ButtonCommencer() {
  return (
    <div>
      <button className="bg-[#0000FF] text-white px-4 lg:px-6 py-2 text-start font-bold rounded-lg doto text-lg lg:text-2xl">
        <Link to="/codeqr">Commencer</Link>
      </button>
    </div>
  )
}

export default ButtonCommencer