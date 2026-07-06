const map = new maplibregl.Map({
  container: "map",
  style: "https://demotiles.maplibre.org/style.json",
  center: [15, 48],
  zoom: 3
});

map.addControl(new maplibregl.NavigationControl(), "top-left");