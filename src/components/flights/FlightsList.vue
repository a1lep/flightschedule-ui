<template>
    <div class="table-container">
        <table class="flight-table">
            <thead>
                <tr>
                    <th class="table-header">Flight number</th>
                    <th class="table-header">Origin</th>
                    <th class="table-header">Destination</th>
                    <th class="table-header">Date</th>
                    <th class="table-header">Time</th>
                    <th class="table-header">Duration</th>
                    <th class="table-header">Price</th>
                    <th class="table-header">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="flight in allFlights" :key="flight.id" class="table-row">
                    <td class="table-cell">{{ flight.flightNumber }}</td>
                    <td class="table-cell">{{ flight.origin }}</td>
                    <td class="table-cell">{{ flight.destination }}</td>
                    <td class="table-cell">{{ formatDate(flight.departureDate) }}</td>
                    <td class="table-cell">{{ formatTime(flight.departureTime) }}</td>
                    <td class="table-cell">{{ flight.flightDuration }} h</td>
                    <td class="table-cell">{{ flight.price }} €</td>
                    <td class="table-cell">
                        <select  v-model="selectedSeats[flight.id]"  class="amount-select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </select>
                    </td>
                    <td class="table-cell">
                        <button @click="getSeatMap(flight.id)">Select</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {

    props: {
        allFlights: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            selectedSeats: {},
        };
    },
    
    methods: {
        formatTime(time) {
            if (!time) return '';
            return time.substring(0, 5);
        },
        formatDate(date) {
            if (!date) return '';
            const d = new Date(date);
            return `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
        },
        getSeatMap(flightId) {
            const numberOfSeats = this.selectedSeats[flightId];
            if (numberOfSeats) {
                this.$router.push({ name: 'Seats', query: { flightId, numberOfSeats } });
            } else {
                alert('Please select the number of seats');
            }
        }
    },
};
</script>
