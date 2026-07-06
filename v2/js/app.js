const state = {
  selectedYear: 500,
  layers: {
    kingdoms: true
  }
};

const map = new maplibregl.Map({
  container: "map",
  style: "https://demotiles.maplibre.org/style.json",
  center: [12, 48],
  zoom: 3
});

map.addControl(new maplibregl.NavigationControl(), "top-left");

map.on("load", async () => {
  await loadGeoJsonLayer({
    id: "kingdoms",
    url: "geojson/kingdoms.geojson",
    fillColor: "#7c3aed",
    lineColor: "#2e1065"
  });

  buildInterface();
  updateVisibleLayers();
});

async function loadGeoJsonLayer({ id, url, fillColor, lineColor }) {
  const response = await fetch(url);
  const data = await response.json();

  map.addSource(id, {
    type: "geojson",
    data
  });

  map.addLayer({
    id: `${id}-fill`,
    type: "fill",
    source: id,
    paint: {
      "fill-color": fillColor,
      "fill-opacity": 0.45
    }
  });

  map.addLayer({
    id: `${id}-line`,
    type: "line",
    source: id,
    paint: {
      "line-color": lineColor,
      "line-width": 2
    }
  });

  map.on("click", `${id}-fill`, (event) => {
    const feature = event.features[0];
    const p = feature.properties;

    new maplibregl.Popup()
      .setLngLat(event.lngLat)
      .setHTML(`
        <h3>${p.name}</h3>
        <p><strong>Type:</strong> ${p.type}</p>
        <p><strong>Religion:</strong> ${p.religion}</p>
        <p><strong>Active:</strong> ${p.startYear}–${p.endYear}</p>
        <p><strong>Capital:</strong> ${p.capital}</p>
        <p><strong>Ruler:</strong> ${p.ruler}</p>
        <p><strong>Certainty:</strong> ${p.certainty}</p>
        <p>${p.description}</p>
      `)
      .addTo(map);
  });

  map.on("mouseenter", `${id}-fill`, () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", `${id}-fill`, () => {
    map.getCanvas().style.cursor = "";
  });
}

function buildInterface() {
  const panel = document.createElement("aside");
  panel.className = "atlas-panel";

  panel.innerHTML = `
    <h1>Medieval Atlas</h1>

    <label class="year-label" for="yearSlider">Selected year</label>
    <div id="yearValue" class="year-value">${state.selectedYear} CE</div>

    <input
      id="yearSlider"
      type="range"
      min="500"
      max="1500"
      step="1"
      value="${state.selectedYear}"
    />

    <section class="panel-section">
      <h2>Layers</h2>

      <label class="checkbox-row">
        <input id="kingdomsToggle" type="checkbox" checked />
        Kingdoms
      </label>
    </section>

    <section class="panel-section">
      <h2>Current milestone</h2>
      <p>
        This version proves that the atlas can load historical GeoJSON,
        filter it by year, and display information from data.
      </p>
    </section>
  `;

  document.body.appendChild(panel);

  document.getElementById("yearSlider").addEventListener("input", (event) => {
    state.selectedYear = Number(event.target.value);
    document.getElementById("yearValue").textContent = `${state.selectedYear} CE`;
    updateVisibleLayers();
  });

  document.getElementById("kingdomsToggle").addEventListener("change", (event) => {
    state.layers.kingdoms = event.target.checked;
    updateVisibleLayers();
  });
}

function updateVisibleLayers() {
  updateLayerVisibility("kingdoms");
}

function updateLayerVisibility(id) {
  const visible = state.layers[id] ? "visible" : "none";

  const yearFilter = [
    "all",
    ["<=", ["get", "startYear"], state.selectedYear],
    [">=", ["get", "endYear"], state.selectedYear]
  ];

  if (map.getLayer(`${id}-fill`)) {
    map.setFilter(`${id}-fill`, yearFilter);
    map.setLayoutProperty(`${id}-fill`, "visibility", visible);
  }

  if (map.getLayer(`${id}-line`)) {
    map.setFilter(`${id}-line`, yearFilter);
    map.setLayoutProperty(`${id}-line`, "visibility", visible);
  }
}