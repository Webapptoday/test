
import React from 'react'

const topics=[
  {slug:'anxiety', name:'Anxiety', summary:'Excessive worry, restlessness, and physical symptoms like rapid heartbeat.'},
  {slug:'depression', name:'Depression', summary:'Persistent sadness, loss of interest, sleep/appetite changes, concentration issues.'},
  {slug:'adhd', name:'ADHD', summary:'Inattention and/or hyperactivity-impulsivity interfering with functioning.'},
  {slug:'ptsd', name:'PTSD', summary:'Trauma-related symptoms like flashbacks, avoidance, hyperarousal.'},
]

export default function Learn(){
  return (
    <article>
      <h1>Learn</h1>
      <p>Use the cards below as a starting point. Always consult qualified professionals for diagnosis or treatment.</p>
      <div className="row">
        {topics.map(t => (
          <div className="col-md-6 mb-3" key={t.slug}>
            <div className="card h-100" role="article">
              <div className="card-body">
                <h2 className="h4">{t.name}</h2>
                <p>{t.summary}</p>
                <p><strong>Self-help ideas:</strong> grounding, journaling, gentle movement, sleep hygiene, social support.</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
