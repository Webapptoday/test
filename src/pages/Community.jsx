
import React, {useEffect, useState, useRef} from 'react'
import { v4 as uuid } from 'uuid'
function get(key, def){ try{return JSON.parse(localStorage.getItem(key)) ?? def;}catch{return def;} }
function set(key, val){ localStorage.setItem(key, JSON.stringify(val)); }

export default function Community(){
  const [tab,setTab]=useState('forum')
  return (
    <section>
      <h1>Community</h1>
      <p>Peer-to-peer support spaces moderated by volunteers. Demo stores data in your browser only.</p>
      <div className="btn-group mb-3" role="tablist">
        <button className={`btn btn-outline-primary ${tab==='forum'?'active':''}`} onClick={()=>setTab('forum')} role="tab">Forum</button>
        <button className={`btn btn-outline-primary ${tab==='chat'?'active':''}`} onClick={()=>setTab('chat')} role="tab">Chat (local)</button>
      </div>
      {tab==='forum' ? <Forum/> : <LocalChat/>}
    </section>
  )
}

function Forum(){
  const [topics,setTopics]=useState(get('ym_forum', []))
  const [title,setTitle]=useState(''); const [body,setBody]=useState('')
  const add=(e)=>{e.preventDefault(); const t={id:uuid(), title, body, ts: Date.now(), replies:[]}; const next=[t, ...topics]; setTopics(next); set('ym_forum', next); setTitle(''); setBody('');};
  const reply=(id, text)=>{const next=topics.map(t=>t.id===id?{...t, replies:[...t.replies,{id:uuid(), text, ts:Date.now()}]}:t); setTopics(next); set('ym_forum', next);};
  return (<div>
    <form onSubmit={add} className="mb-3" aria-label="Create topic">
      <input required className="form-control mb-2" placeholder="Topic title" value={title} onChange={e=>setTitle(e.target.value)}/>
      <textarea required className="form-control mb-2" placeholder="Write something supportive and respectful..." value={body} onChange={e=>setBody(e.target.value)}/>
      <button className="btn btn-success">Post</button>
    </form>
    <ul className="list-group">
      {topics.map(t=>(
        <li className="list-group-item" key={t.id}>
          <h2 className="h5">{t.title}</h2>
          <p>{t.body}</p>
          <ReplyBox onReply={(txt)=>reply(t.id, txt)} />
          <ul className="mt-2">
            {t.replies.map(r=>(<li key={r.id}>{r.text}</li>))}
          </ul>
        </li>
      ))}
    </ul>
  </div>)
}

function ReplyBox({onReply}){
  const [text,setText]=useState('')
  return (<div>
    <label className="form-label">Reply
      <textarea className="form-control" value={text} onChange={e=>setText(e.target.value)}/>
    </label>
    <button className="btn btn-primary btn-sm" onClick={()=>{ if(text.trim()){onReply(text); setText('');}}}>Send</button>
  </div>)
}

function LocalChat(){
  const [messages,setMessages]=useState(get('ym_chat', []))
  const [name,setName]=useState(get('ym_name','You'))
  const [text,setText]=useState('')
  const endRef = useRef()
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}); }, [messages])
  const send=()=>{ const m={id:uuid(), name, text, ts:Date.now()}; const next=[...messages, m]; setMessages(next); set('ym_chat', next); localStorage.setItem('ym_name', JSON.stringify(name)); setText(''); };
  return (<div className="card">
    <div className="card-body" style={{height:300, overflowY:'auto'}}>
      {messages.map(m=>(<div key={m.id}><strong>{m.name}:</strong> {m.text}</div>))}
      <div ref={endRef}/>
    </div>
    <div className="card-footer">
      <div className="row g-2">
        <div className="col-3"><input className="form-control" value={name} onChange={e=>setName(e.target.value)} aria-label="Name"/></div>
        <div className="col-7"><input className="form-control" value={text} onChange={e=>setText(e.target.value)} aria-label="Message" onKeyDown={e=>{if(e.key==='Enter'){send();}}}/></div>
        <div className="col-2"><button className="btn btn-primary w-100" onClick={send}>Send</button></div>
      </div>
    </div>
  </div>)
}
