<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Flight number</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="flight in allFlights" :key="flight.id">
                    <td>{{ flight.flightNumber }}</td>
                    <td>{{ flight.origin }}</td>
                    <td>{{ flight.destination }}</td>
                    <td>{{ flight.departureDate }}</td>
                    <td>{{ flight.departureTime }}</td>
                    <td>{{ flight.flightDuration }}</td>
                    <td>{{ flight.price }}</td>
                    <td>
                        <button @click="getSeatMap(flight.id)">Select</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
import instance from '@/axiosConfig';

export default {
    data() {
        return {
            api: "http://localhost:8080/api/flights",
            allFlights: [],
        }
    },
methods: {
    fetchFlights() {
        instance
            .get(`${this.api}/allFlights`)
            .then((res) => {
                this.allFlights = res.data;
            })
            .catch((error) => {
            console.error("Error fetching all flights", error);
          });
    },
    getSeatMap(flightId) {
        this.$router.push({ name: 'Seats', query: { flightId }});
    },
},
mounted() {
    this.fetchFlights();
    }
}
</script>