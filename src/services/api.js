import axios from 'axios'

const RAPID_KEY = import.meta.env.VITE_RAPIDAPI_KEY
const API_HOST = import.meta.env.VITE_FLIGHT_API_HOST
const API_URL  = import.meta.env.VITE_FLIGHT_API_URL

export async function fetchFlights({ from, to, date }) {
  if (!RAPID_KEY || !API_HOST || !API_URL) {
    const res = await fetch('/mock/flights.json')
    return await res.json()
  }

  const options = {
    method: 'GET',
    url: API_URL,
    params: {
      fromId: `${from}.AIRPORT`,
      toId: `${to}.AIRPORT`,
      stops: 'none',
      pageNo: '1',
      adults: '1',
      children: '0,17',
      sort: 'BEST',
      cabinClass: 'ECONOMY',
      currency_code: 'INR',
      departDate:date,
    },
    headers: {
      'X-RapidAPI-Key': RAPID_KEY,
      'X-RapidAPI-Host': API_HOST,
    },
  }

  const { data } = await axios.request(options)
  // console.log("Api data",data)
  // console.log("formated",JSON.stringify(data, null, 2));
  // console.log("Airlines",JSON.stringify(data.data.aggregation.airlines, null, 2));
  console.log("Flight offers",JSON.stringify(data.data.flightOffers, null, 2));
  // console.log("formated",JSON.stringify(data, null, 2));
  // console.log("formated",JSON.stringify(data, null, 2));
  // console.log("formated",JSON.stringify(data, null, 2));


  // Normalize flightOffers → itineraries
  if (!data?.data?.flightOffers) return { itineraries: [] };

  // ✅ Map into your uniform structure
  const itineraries = data.data.flightOffers.map((offer, i) => {
    const seg = offer.segments?.[0] || {}
    const leg = seg.legs?.[0] || {}
    const airline = leg.carriersData?.[0] || {}

    return {
      id: offer.token || `flight-${i}`,
      airline: airline.name || "",
      airlineCode: airline.code || "",
      logo: airline.logo || "",
      from: seg.departureAirport?.code || "",
      fromName: seg.departureAirport?.name || "",
      to: seg.arrivalAirport?.code || "",
      toName: seg.arrivalAirport?.name || "",
      departure: seg.departureTime || null,
      arrival: seg.arrivalTime || null,
      durationSeconds: seg.totalTime || 0,
      price: offer.priceBreakdown?.total?.units || 0,
      currency: offer.priceBreakdown?.total?.currencyCode || "USD",
    }
  });

  return { itineraries }
}

export async function fetchGround({ type }) {
  const path = type === 'bus' ? '/mock/buses.json' : '/mock/trains.json'
  const res = await fetch(path)
  return await res.json()
}
