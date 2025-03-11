<template>
    <div>
        <SearchFlights />
    </div>
    <div>
        <FlightsList />
    </div>

</template>
<script>
import FlightsList from '@/components/flights/FlightsList.vue';
import SearchFlights from '@/components/flights/SearchFlights.vue';

export default {
    components: {
        FlightsList,
        SearchFlights,
    }
}
</script>