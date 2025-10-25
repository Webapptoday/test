
import React from 'react'
const posts=[
  {id:1, title:'What is mental health?', body:'Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act.'},
  {id:2, title:'Sleep & mood', body:'Consistent sleep is one of the strongest levers for mood regulation. Try a wind-down routine and keep devices away at night.'},
  {id:3, title:'Movement for the mind', body:'Gentle movement like walking can reduce stress hormones and support neuroplasticity.'},
]
export default function Blog(){
  return (<article>
    <h1>Blog</h1>
    {posts.map(p=>(<section key={p.id} className="mb-3">
      <h2 className="h4">{p.title}</h2>
      <p>{p.body}</p>
    </section>))}
  </article>)
}
