import { createRouter, createWebHistory } from 'vue-router';

import FlightsList from "@/components/flights/FlightsList.vue";
import SearchFlights from "@/components/flights/SearchFlights.vue";
import FlightsPage from '@/pages/FlightsPage.vue';

const routes = [
    {path: '/', component: FlightsPage, name: 'FlightsPage'},
    {path: '/allflights', component: FlightsList, name: 'FlightsList'},
    {path: '/search-flights', component: SearchFlights, name: 'SearchFlights'},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;