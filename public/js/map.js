mapboxgl.accessToken = mapToken;

if (listing && listing.geometry && listing.geometry.coordinates) {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listing.geometry.coordinates, // [lng, lat]
    zoom: 9
  });

  new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>${listing.title}</h3><p>Location will be provided after booking</p>`
      )
    )
    .addTo(map);
} else {
  console.error("Map coordinates are missing or invalid.");
}
