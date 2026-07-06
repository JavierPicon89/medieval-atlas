# Medieval Atlas

## Vision

Build an interactive historical atlas of Europe, North Africa, and the Middle East from 500–1500 CE.

The goal is to become a “Google Maps of Medieval History”: map, timeline, rulers, religions, wars, cities, and people all connected.

## Core Features

- Interactive map with zoom and pan
- Year slider from 500 to 1500
- Historical political borders
- Religious control layers
- Popes, kings, emperors, caliphs, and sultans by year
- Battles, crusades, treaties, councils, and major events
- Cities, castles, cathedrals, universities, and trade routes
- Search for people, places, battles, kingdoms, and events

## Tech Stack

- HTML/CSS/JavaScript for now
- MapLibre GL for the map
- GeoJSON for borders and map layers
- JSON for historical data
- GitHub for version control
- GitHub Pages for hosting

## Data Model

Each historical object should have:

- id
- name
- type
- startYear
- endYear
- location or geometry
- religion
- rulers
- events
- sources
- notes

## Map Layers

Planned layers:

- Political borders
- Religion
- Battles
- Crusades
- Viking activity
- Reconquista
- Ottoman expansion
- Trade routes
- Cities
- Castles
- Cathedrals
- Universities

## Historical Categories

People:

- Popes
- Kings
- Queens
- Emperors
- Caliphs
- Sultans
- Generals
- Explorers
- Theologians
- Scholars

Events:

- Battles
- Crusades
- Treaties
- Church councils
- Dynastic changes
- Conquests
- Plagues
- Discoveries

## Development Phases

### Phase 1: Foundation

- MapLibre map
- Historical-looking basemap
- Year slider
- Basic layer system
- JSON data structure

### Phase 2: Political History

- First historical borders
- Kingdom visibility by year
- Clickable territories
- Basic ruler panels

### Phase 3: Religion

- Christian, Muslim, Orthodox, Pagan, Jewish layers
- Religious control changes by year

### Phase 4: Historical Database

- Popes
- Rulers
- Battles
- Major events
- Important people

### Phase 5: Search and Encyclopedia

- Search bar
- Biography panels
- Event pages
- Related people and places

### Phase 6: Polish

- Historical atlas styling
- Animations
- Mobile support
- Performance improvements
- Sources and citations

## Principles

- Accuracy over speed
- Clearly mark uncertain borders
- Use real GIS data where possible
- Keep historical sources visible
- Build one feature well before adding many
- Keep the website working after every update

## Current Status

Version 1 is a proof of concept.

Version 2 begins the real atlas foundation using MapLibre GL.