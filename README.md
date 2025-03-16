# Flight-schedule - UI
## Overview
This project is a front-end application developed in Vue.js for managing flight schedules and seat reservations. It provides an interface to display available flights, search for flights using various criteria, and book seats based on availability.

The UI is designed with a single CSS class that manages styles for flights and seats. While the project has room for improvement in terms of design and functionality, it was developed within a limited timeframe and with a focus on core features.

## Backend Dependency
In order for the UI to work, the backend service must be running, you can find the repository here: 
https://github.com/a1lep/flightschedule


## Project setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Features
### Flights

- Displays all available flights retrieved from the database.

- Allows searching for flights using multiple criteria.

- Enables flight selection to view seat availability and book seats.

- Seat recommendations are based on the number of selected seats, prioritizing seats in the same row.

- A potential improvement would be to display the total cost based on the amount of selected seats.

### Seat Map

- Displays seat availability for a selected flight.

- Includes a legend indicating recommended, available, and unavailable seats.

- Uses an algorithm to recommend seats in the same row if possible.

- Provides hover functionality to display seat features.

- Possibility to book a seat. 

## Process

The UI development took approximately 20 hours. Work was completed during weekday evenings and full days over a weekend (approximately 8 hours per day). The design was inspired by airline websites such as Ryanair and Lufthansa.

## Challenges

- UI development took significantly more time than backend development due to limited experience in front-end technologies.

- Encountered difficulties with Vue Router configuration, seat layout generation, and implementing the getClosestSeats function.

- Initial attempts to generate the getClosestSeats function with AI were unsuccessful. Assistance from a software engineer friend helped resolve key issues.

- Used a previous project as a reference for overcoming UI challenges: https://github.com/a1lep/boardgame-ui.
- While AI assistance was used for CSS generation, significant modifications were made manually to improve the design.