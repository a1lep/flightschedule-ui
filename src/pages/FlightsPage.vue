<template>
    <div>
        <SearchFlights @update-flights="updateFlights" />
        <FlightsList :allFlights="allFlights" />
    </div>
</template>

<script>
import FlightsList from '@/components/flights/FlightsList.vue';
import SearchFlights from '@/components/flights/SearchFlights.vue';

export default {
    components: {
        FlightsList,
        SearchFlights,
    },
    data() {
        return {
            allFlights: [],
        };
    },
    methods: {
        updateFlights(flights) {
            this.allFlights = flights; 
        },
    }
}
</script>
