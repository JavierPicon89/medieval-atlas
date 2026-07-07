alert("NEW APP.JS LOADED");

let kingdomDatabase = {};

const state = {
  selectedYear: 500,
  selectedFeature: null,
  layers: {
    kingdoms: true
  }
};

const map = new maplibregl.Map({
  container: "map",
  style: "https://demotiles.maplibre.org/style.json",
  center: [10, 47],
  zoom: 3
});

map.addControl(new maplibregl.NavigationControl(), "top-left");

map.on("load", async () => {
  const dbResponse = await fetch("data/kingdoms.json");
  kingdomDatabase = await dbResponse.json();

  await loadGeoJsonLayer({
    id: "kingdoms",
    url: "geojson/kingdoms.geojson",
    fallbackFillColor: "#7c3aed",
    lineColor: "#2e1065"
  });

  buildInterface();
  updateVisibleLayers();
  renderInfoPanel(null);
});

async function loadGeoJsonLayer({ id, url, fallbackFillColor, lineColor }) {
  const response = await fetch(`${url}?cache=${Date.now()}`);
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
      "fill-color": ["coalesce", ["get", "color"], fallbackFillColor],
      "fill-opacity": 0.55
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
    const p = event.features[0].properties;
    const record = kingdomDatabase[p.id] || p;

    state.selectedFeature = record;
    renderInfoPanel(record);
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
      <h2>Visible historical regions</h2>
      <div id="visibleCount">Loading...</div>
    </section>

    <section class="panel-section">
      <h2>Selected feature</h2>
      <div id="infoPanel" class="info-panel"></div>
    </section>
  `;

  document.body.appendChild(panel);

  document.getElementById("yearSlider").addEventListener("input", (event) => {
    state.selectedYear = Number(event.target.value);
    document.getElementById("yearValue").textContent = `${state.selectedYear} CE`;
    updateVisibleLayers();

    if (state.selectedFeature) {
      renderInfoPanel(state.selectedFeature);
    }
  });

  document.getElementById("kingdomsToggle").addEventListener("change", (event) => {
    state.layers.kingdoms = event.target.checked;
    updateVisibleLayers();
  });
}

function renderInfoPanel(record) {
  const panel = document.getElementById("infoPanel");

  if (!panel) return;

  if (!record) {
    panel.innerHTML = `
      <p class="muted">
        Click a kingdom on the map to see historical information.
      </p>
    `;
    return;
  }

  const activeNow =
    record.startYear <= state.selectedYear &&
    record.endYear >= state.selectedYear;

  panel.innerHTML = `
    <article class="feature-card">
      <div class="feature-status ${activeNow ? "active" : "inactive"}">
        ${activeNow ? "Active in this year" : "Not active in this year"}
      </div>

      <h3>${record.name}</h3>

      <div class="fact-grid">
        <div>
          <span>Type</span>
          <strong>${record.type}</strong>
        </div>

        <div>
          <span>Years</span>
          <strong>${record.startYear}–${record.endYear}</strong>
        </div>

        <div>
          <span>Capital</span>
          <strong>${record.capital}</strong>
        </div>

        <div>
          <span>Religion</span>
          <strong>${record.religion}</strong>
        </div>

        <div>
          <span>Ruler</span>
          <strong>${record.ruler}</strong>
        </div>

        <div>
          <span>Dynasty</span>
          <strong>${record.dynasty}</strong>
        </div>
      </div>

      <p class="description">${record.description}</p>

      <h4>Important events</h4>
      <ul class="events-list">
        ${(record.importantEvents || []).map(event => `<li>${event}</li>`).join("")}
      </ul>

      <p class="notes">${record.notes || ""}</p>
    </article>
  `;
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

  updateVisibleCount();
}

function updateVisibleCount() {
  const counter = document.getElementById("visibleCount");

  if (!counter) return;

  const visibleRecords = Object.values(kingdomDatabase).filter(record => {
    return (
      record.startYear <= state.selectedYear &&
      record.endYear >= state.selectedYear
    );
  });

  counter.textContent =
    `${visibleRecords.length} regions active in ${state.selectedYear} CE`;
}