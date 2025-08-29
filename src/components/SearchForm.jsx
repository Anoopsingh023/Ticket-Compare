import { useState } from 'react'

export default function SearchForm({ onSearch, loading }){
  const [from, setFrom] = useState('DEL')
  const [to, setTo] = useState('BOM')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [mode, setMode] = useState('flight')

  function submit(e){
    e.preventDefault()
    onSearch({ from, to, date, mode })
  }

  return (
    <form className="card vstack" onSubmit={submit}>
      <div className="grid2">
        <div className="vstack">
          <label className="label" htmlFor="from">From</label>
          <input id="from" className="input" value={from} onChange={e=>setFrom(e.target.value.toUpperCase())} placeholder="DEL" required />
        </div>
        <div className="vstack">
          <label className="label" htmlFor="to">To</label>
          <input id="to" className="input" value={to} onChange={e=>setTo(e.target.value.toUpperCase())} placeholder="BOM" required />
        </div>
      </div>

      <div className="grid2">
        <div className="vstack">
          <label className="label" htmlFor="date">Date</label>
          <input id="date" className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} required />
        </div>
        <div className="vstack">
          <label className="label" htmlFor="mode">Travel Type</label>
          <select id="mode" className="input" value={mode} onChange={e=>setMode(e.target.value)}>
            <option value="flight">Flight</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
          </select>
        </div>
      </div>

      <div className="hstack">
        <button className="button" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
        <span className="small">Tip: Use IATA codes like <span className="kbd">DEL</span> → <span className="kbd">BOM</span></span>
      </div>
    </form>
  )
}
