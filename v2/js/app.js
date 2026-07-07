let kingdomDatabase = {};
let timelineEvents = [];

const state = {
  selectedYear: 500,
  selectedFeature: null,
  isPlaying: false,
  playInterval: null,
  playSpeed: 250,
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

  const eventsResponse = await fetch("data/events.json");
  timelineEvents = await eventsResponse.json();

  await loadGeoJsonLayer({
    id: "kingdoms",
    url: "geojson/kingdoms.geojson",
    fallbackFillColor: "#7c3aed",
    lineColor: "#2e1065"
  });

  buildInterface();
  updateVisibleLayers();
  renderEventsForYear();
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

    <div class="timeline-controls">
      <button id="playButton">▶ Play</button>
    </div>

    <input
      id="yearSlider"
      type="range"
      min="500"
      max="1500"
      step="1"
      value="${state.selectedYear}"
    />

    <div id="timelineMarkers" class="timeline-markers"></div>

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
      <h2>Events this year</h2>
      <div id="eventsThisYear" class="events-this-year"></div>
    </section>

    <section class="panel-section">
      <h2>Selected feature</h2>
      <div id="infoPanel" class="info-panel"></div>
    </section>
  `;

  document.body.appendChild(panel);

  document.getElementById("playButton").addEventListener("click", toggleTimelinePlayback);

  document.getElementById("yearSlider").addEventListener("input", (event) => {
    state.selectedYear = Number(event.target.value);
    document.getElementById("yearValue").textContent = `${state.selectedYear} CE`;

    updateVisibleLayers();
    renderEventsForYear();

    if (state.selectedFeature) {
      renderInfoPanel(state.selectedFeature);
    }
  });

  document.getElementById("kingdomsToggle").addEventListener("change", (event) => {
    state.layers.kingdoms = event.target.checked;
    updateVisibleLayers();
  });

  renderTimelineMarkers();
}



function renderInfoPanel(record) {
  const panel = document.getElementById("infoPanel");

  if (!panel) return;

  if (!record) {
    panel.innerHTML = `
      <p class="muted">Click a kingdom on the map to see historical information.</p>
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
        <div><span>Type</span><strong>${record.type}</strong></div>
        <div><span>Years</span><strong>${record.startYear}–${record.endYear}</strong></div>
        <div><span>Capital</span><strong>${record.capital}</strong></div>
        <div><span>Religion</span><strong>${record.religion}</strong></div>
        <div><span>Ruler</span><strong>${record.ruler}</strong></div>
        <div><span>Dynasty</span><strong>${record.dynasty}</strong></div>
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

function renderEventsForYear() {
  const container = document.getElementById("eventsThisYear");

  if (!container) return;

  const events = timelineEvents.filter(event => event.year === state.selectedYear);

  if (events.length === 0) {
    container.innerHTML = `<p class="muted">No major event listed for this year yet.</p>`;
    return;
  }

  container.innerHTML = events.map(event => `
    <article class="timeline-event">
      <div class="event-type">${event.type}</div>
      <strong>${event.year}: ${event.title}</strong>
    </article>
  `).join("");
}

function hasEventForYear(year) {
  return timelineEvents.some(event => event.year === year);
}

function renderTimelineMarkers() {
  const container = document.getElementById("timelineMarkers");

  if (!container) return;

  container.innerHTML = timelineEvents.map(event => {
    const position = ((event.year - 500) / 1000) * 100;

    return `
      <button
        class="timeline-marker"
        style="left: ${position}%"
        title="${event.year}: ${event.title}"
        onclick="jumpToYear(${event.year})"
      >
        ${event.year}
      </button>
    `;
  }).join("");
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
    return record.startYear <= state.selectedYear && record.endYear >= state.selectedYear;
  });

  counter.textContent =
    `${visibleRecords.length} regions active in ${state.selectedYear} CE`;
}


function jumpToYear(year) {
  state.selectedYear = year;

  document.getElementById("yearSlider").value = year;
  document.getElementById("yearValue").textContent = `${year} CE`;

  updateVisibleLayers();
  renderEventsForYear();

  if (state.selectedFeature) {
    renderInfoPanel(state.selectedFeature);
  }
}

function toggleTimelinePlayback() {
  const button = document.getElementById("playButton");

  if (state.isPlaying) {
    state.isPlaying = false;
    state.playRunId = (state.playRunId || 0) + 1;
    clearTimeout(state.playInterval);
    state.playInterval = null;
    button.textContent = "▶ Play";
    return;
  }

  state.isPlaying = true;
  button.textContent = "⏸ Pause";

  state.playRunId = (state.playRunId || 0) + 1;
  runTimeline(state.playRunId);
}

function runTimeline(runId) {
  if (!state.isPlaying || runId !== state.playRunId) return;

  advanceTimelineYear();

  const delay = hasEventForYear(state.selectedYear)
    ? 3000
    : state.playSpeed;

  state.playInterval = setTimeout(() => {
    runTimeline(runId);
  }, delay);
}

function advanceTimelineYear() {
  state.selectedYear++;

  if (state.selectedYear > 1500) {
    state.selectedYear = 500;
  }

  document.getElementById("yearSlider").value = state.selectedYear;
  document.getElementById("yearValue").textContent = `${state.selectedYear} CE`;

  updateVisibleLayers();
  renderEventsForYear();

  if (state.selectedFeature) {
    renderInfoPanel(state.selectedFeature);
  }
}