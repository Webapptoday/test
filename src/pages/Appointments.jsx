
import React, {useState} from 'react'
import dayjs from 'dayjs'
import { v4 as uuid } from 'uuid'
import { saveAs } from 'file-saver'

function makeICS(appt){
  const start = dayjs(appt.date + 'T' + appt.time)
  const end = start.add(50, 'minute')
  // Simple, standards-compliant ICS (no external lib)
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//YouMatter//Scheduler//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${uuid()}@youmatter.local`,
    `DTSTAMP:${start.utc().format('YYYYMMDDTHHmmss')}Z`,
    `DTSTART:${start.utc().format('YYYYMMDDTHHmmss')}Z`,
    `DTEND:${end.utc().format('YYYYMMDDTHHmmss')}Z`,
    `SUMMARY:Counseling with ${appt.counselor}`,
    `DESCRIPTION:Notes: ${appt.notes ? appt.notes.replace(/\n/g,'\\n') : ''}`,
    'LOCATION:YouMatter Counseling (virtual/in-person)',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')
}

export default function Appointments(){
  const [form,setForm]=useState({name:'', email:'', counselor:'Any', date:'', time:'', notes:''})
  const [confirmed,setConfirmed]=useState(null)
  const times=['09:00','10:00','11:00','13:00','14:00','15:00']
  const submit=(e)=>{
    e.preventDefault()
    const appt={...form, id: uuid()}
    const all=JSON.parse(localStorage.getItem('ym_appts')||'[]')
    all.push(appt); localStorage.setItem('ym_appts', JSON.stringify(all))
    setConfirmed(appt)
    const ics=makeICS(appt)
    const blob=new Blob([ics],{type:'text/calendar;charset=utf-8'})
    saveAs(blob, 'YouMatter-appointment.ics')
  }
  return (
    <section>
      <h1>Appointments</h1>
      <p>Book a mock counseling slot (demo only; no PHI sent anywhere). We’ll download a calendar invite.</p>
      <form onSubmit={submit} aria-label="Appointment form">
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Full name
              <input required className="form-control" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
            </label>
          </div>
          <div className="col-md-6">
            <label className="form-label">Email
              <input required type="email" className="form-control" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label className="form-label">Counselor
              <select className="form-select" value={form.counselor} onChange={e=>setForm({...form,counselor:e.target.value})}>
                <option>Any</option><option>Dr. Lee</option><option>Ms. Patel</option><option>Mr. Jones</option>
              </select>
            </label>
          </div>
          <div className="col-md-4">
            <label className="form-label">Date
              <input required type="date" className="form-control" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
            </label>
          </div>
          <div className="col-md-4">
            <label className="form-label">Time
              <select required className="form-select" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}>
                <option value="">Select</option>
                {times.map(t=><option key={t}>{t}</option>)}
              </select>
            </label>
          </div>
        </div>
        <label className="form-label">Notes (optional)
          <textarea className="form-control" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/>
        </label>
        <button className="btn btn-primary mt-2">Book</button>
      </form>
      {confirmed && <div className="alert alert-success mt-3" role="status">Booked! Check your downloads for the calendar file.</div>}
    </section>
  )
}
