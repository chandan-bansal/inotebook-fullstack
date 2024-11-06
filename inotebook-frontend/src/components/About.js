import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'
const About = () => {
  const ctx = useContext(noteContext);
  return (
    <div> Hello {ctx.name}</div>
  )
}

export default About