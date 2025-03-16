<template>
    <div>
        <SearchFlights @update-flights="updateFlights" />
        <FlightsList :allFlights="allFlights" />
    </div>
</template>

<script>
import FlightsList from '@/components/flights/FlightsList.vue';
import SearchFlights from '@/components/flights/SearchFlights.vue';
import instance from '@/axiosConfig';

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
        fetchAllFlights() {
            instance.get("http://localhost:8080/api/flights/allFlights")
                .then((res) => {
                    this.allFlights = res.data;
                })
                .catch((error) => {
                    console.error("Error fetching all flights:", error);
                });
        },

        updateFlights(flights) {
            console.log("Updated flights:", flights);
            this.allFlights = flights; 
        },
    },
    mounted() {
        this.fetchAllFlights();
    },
};
</script>
