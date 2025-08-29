import { formatCurrency, minutesToHhmm, fmtTime } from '../utils/format'

export default function ResultCard({ item }){
  return (
    <div className="card vstack" aria-label={`Itinerary ${item.id}`} key={item.id}>
      <div className="row">
        <div className="hstack">
          <span className="badge">{item.from} → {item.to}</span>
          <span className="badge">{item.stops === 0 ? 'Non‑stop' : `${item.stops} stop${item.stops>1?'s':''}`}</span>
        </div>
        <div className="price">{formatCurrency(item.price, item.currency)}</div>
      </div>
      <div className="hstack" style={{justifyContent:'space-between'}}>
        <div className="vstack">
          <div className="brand">{item.carrier || item.operator}</div>
          <div className="small">Duration: {minutesToHhmm(item.durationMinutes)}</div>
        </div>
        <div className="vstack" style={{textAlign:'right'}}>
          <div>{fmtTime(item.departure)} → {fmtTime(item.arrival)}</div>
          <div className="small">{new Date(item.departure).toDateString()}</div>
        </div>
      </div>
    </div>
  )
}
