import React from 'react'

export default function Error() {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",paddingTop:"20%"}}>
      <h2 style={{color:"red"}}>URL you're trying to Connect isn't existed</h2>
      <h5>"Try Checking another URL"</h5>
    </div>
  )
}
