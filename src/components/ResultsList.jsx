import ResultCard from './ResultCard'
import EmptyState from './EmptyState'

export default function ResultsList({ items }){
  if (!items?.length) return <EmptyState />
  return (
    <div className="vstack" style={{gap:16}}>
      {items.map(x => <ResultCard key={x.id} item={x} />)}
    </div>
  )
}
