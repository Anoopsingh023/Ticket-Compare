import { useMemo, useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import SortBar from "./components/SortBar";
import ResultsList from "./components/ResultsList";
import Loader from "./components/Loader";
import ErrorState from "./components/ErrorState";
import { fetchFlights, fetchGround } from "./services/api";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [criteria, setCriteria] = useState(null);
  const [sort, setSort] = useState("price");
  const [stops, setStops] = useState("any");

  useEffect(()=>{
    const dark = localStorage.getItem('theme') === 'dark'
    document.documentElement.classList.toggle('dark', dark)
  }, [])
// console.log("api data on app",import.meta.env)
  async function onSearch({ from, to, date, mode }) {
    setLoading(true);
    setError("");
    setItems([]);
    setCriteria({ from, to, date, mode });
    try {
      let data;
      if (mode === "flight") data = await fetchFlights({ from, to, date });
      else data = await fetchGround({ type: mode });

      // Normalize ground trips to flight-like items for a uniform list
      const normalized = (data.itineraries || data.trips || []).map((x, i) => ({
        id: x.id || `${mode}-${i}`,
        price: x.price,
        currency: x.currency || "INR",
        carrier: x.carrier,
        operator: x.operator,
        stops: Number(x.stops ?? 0),
        durationMinutes: Number(x.durationMinutes ?? 0),
        departure: x.departure,
        arrival: x.arrival,
        from: x.from,
        to: x.to,
      }));

      setItems(normalized);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || err.message || "Failed to fetch"
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredSorted = useMemo(() => {
  let list = [...items];

  // ✅ Filtering
  if (stops === "nonstop") list = list.filter((x) => x.stops === 0);
  if (stops === "1+") list = list.filter((x) => x.stops >= 1);
  if (stops === "2+") list = list.filter((x) => x.stops >= 2);

  // ✅ Sorting (non-mutating)
  if (sort === "price") return list =  [...list].sort((a, b) => a.price - b.price);
  if (sort === "duration") return list = [...list].sort((a, b) => a.durationMinutes - b.durationMinutes);
  if (sort === "depart") return list = [...list].sort((a, b) => new Date(a.departure) - new Date(b.departure));

  return list;
}, [items, sort, stops]);


  return (
    <>
      <header>
        <div
          className="container hstack"
          style={{ justifyContent: "space-between" }}
        >
          <div className="brand">✈️ Ticket Compare</div>
          {/* <div className="small">React • RapidAPI • Mock fallback</div> */}
          <ThemeToggle/>
        </div>
      </header>

      <main className="container vstack" style={{ gap: 16, paddingTop: 24 }}>
        <SearchForm onSearch={onSearch} loading={loading} />

        {criteria && (
          <div className="small">
            Showing results for <strong>{criteria.from}</strong> →{" "}
            <strong>{criteria.to}</strong> on <strong>{criteria.date}</strong> [
            {criteria.mode}]
          </div>
        )}

        <SortBar
          sort={sort}
          setSort={setSort}
          stops={stops}
          setStops={setStops}
        />

        {loading && <Loader />}
        {error && <ErrorState message={error} />}
        {!loading && !error && <ResultsList items={filteredSorted} />}
      </main>
    </>
  );
}
