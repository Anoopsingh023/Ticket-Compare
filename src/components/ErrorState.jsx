export default function ErrorState({ message }){
  return (
    <div className="card" role="alert">
      <strong>Something went wrong</strong>
      <div className="small">{message || 'Please try again.'}</div>
    </div>
  )
}
