import { createRouter, createWebHistory } from 'vue-router';

import FlightsList from "@/components/flights/FlightsList.vue";
import SearchFlights from "@/components/flights/SearchFlights.vue";
import FlightsPage from '@/pages/FlightsPage.vue';
import SeatMap from '@/components/seats/SeatMap.vue';
import SeatsPage from '@/pages/SeatsPage.vue';

const routes = [
    {path: '/', component: FlightsPage, name: 'Flights Page'},
    {path: '/all-flights', component: FlightsList, name: 'Flights List'},
    {path: '/search-flights', component: SearchFlights, name: 'Search Flights'},
    {path: '/seats-page', component: SeatsPage, name: 'Seats'},
    {path: '/all-seats/:flightId', component: SeatMap, name: 'Seatmap', props: true}

]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;