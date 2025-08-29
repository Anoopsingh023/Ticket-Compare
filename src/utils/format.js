export const formatCurrency = (n, curr='INR') => new Intl.NumberFormat('en-IN',{style:'currency',currency:curr,maximumFractionDigits:0}).format(n)
export const minutesToHhmm = (m) => {
  const h = Math.floor(m/60).toString().padStart(2,'0')
  const mm = (m%60).toString().padStart(2,'0')
  return `${h}h ${mm}m`
}
export const fmtTime = (iso) => new Date(iso).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
