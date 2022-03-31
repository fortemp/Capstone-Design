import{Link} from "react-router-dom";
import React from 'react'

function CommunityPage() { //임시로 null

  return(
    <div>
      <Link to='/Posting'> 
        <button> 글작성 </button>
      </Link>
    </div>
  ); 
}

export default CommunityPage