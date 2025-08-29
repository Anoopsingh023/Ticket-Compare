export default function SortBar({ sort, setSort, stops, setStops }){
  return (
    <div className="hstack card" role="region" aria-label="Sorting and filters">
      <div className="hstack" style={{gap:8}}>
        <span className="label">Sort</span>
        <select className="input" aria-label="Sort by" value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="price">Lowest Price</option>
          <option value="duration">Shortest Duration</option>
          <option value="depart">Earliest Departure</option>
        </select>
      </div>
      <div className="hstack" style={{gap:8, marginLeft:'auto'}}>
        <span className="label">Stops</span>
        <select className="input" aria-label="Stops filter" value={stops} onChange={e=>setStops(e.target.value)}>
          <option value="any">Any</option>
          <option value="nonstop">Non‑stop</option>
          <option value="1+">1+ stops</option>
          <option value="2+">2+ stops</option>
        </select>
      </div>
    </div>
  )
}
