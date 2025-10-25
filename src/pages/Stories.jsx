
import React from 'react'
const stories=[
  {name:'Avery', text:'Talking to peers and a counselor helped me realize I was not alone.'},
  {name:'Jordan', text:'Journaling and mindful walks slowly shifted my day.'},
]
export default function Stories(){
  return (<section>
    <h1>Recovery Stories</h1>
    <ul>
      {stories.map((s,i)=>(<li key={i}><strong>{s.name}</strong>: {s.text}</li>))}
    </ul>
  </section>)
}
