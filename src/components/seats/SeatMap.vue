<template>
  <div class="seat-map"></div>
    <h1>Seat Map for Flight {{ flightId }}</h1>
    <ul class="legend">
      <div>
      <li>
        <div class="seat economy"></div>
        <small>Economy</small>
      </li>
      <li>
        <div class="seat first "></div>
        <small>First Class</small>
      </li>
      <li>
        <div class="seat business "></div>
        <small>Business Class</small>
      </li>
    </div>
      <li>
        <div class="seat extra-legroom"></div>
        <small>Extra Legroom</small>
      </li>
      <li>
        <div class="seat window"></div>
        <small>Window</small>
      </li>
      <li>
        <div class="seat exit"></div>
        <small>Close to exit</small>
      </li>
      <li>
        <div class="seat sold "></div>
        <small>Unavailable</small>
      </li>
      <li v-if="recommendedSeatNumbers.length">
        <div class="seat recommended"></div>
        <small>Recommended Seat(s): {{ recommendedSeatNumbers.join(' - ') }}</small>
      </li>
    </ul>
    <div class="seat-container">
      <div v-for="(row, index) in seatRows" :key="index" class="seat-row">
        <div v-for="seat in row" :key="seat.id" class="seat" :class="getSeatFeature(seat)">
             {{ seat.row }}
             {{ seat.seatNumber}}
        </div>
      </div>
    </div> 
</template>

<script>
import instance from '@/axiosConfig';

export default {
  data() {
      return {
          api: "http://localhost:8080/api/seats",
          seatRows: [], 
          recommendedSeatNumbers: [],
          numberOFSeats: null,
          flightId: null,
      };
  },

  methods: {
      fetchSeatsByRow() {
          instance
              .get(`${this.api}/allSeatsByRow/${this.flightId}`)
              .then((res) => {
                console.log("Fetched seat data:", res.data);
                  this.seatRows = res.data;
                  const availableSeats = res.data.flat().filter(seat => seat.isAvailable);
                  this.recommendedSeatNumbers = this.getClosestSeats(availableSeats, this.numberOFSeats);

              })
              .catch((error) => {
                  console.error("Error fetching seats", error);
              });
      },
      getClosestSeats(availableSeats, numberOFSeats) {
        const seatsByRow = {};

        const economySeats = availableSeats.filter(seat => seat.seatClass === 'ECONOMY');

    economySeats.forEach(seat => {
        if (!seatsByRow[seat.row]) {
            seatsByRow[seat.row] = [];
        }
        seatsByRow[seat.row].push(seat);
    });

        let selectedSeats = [];

        for (let row in seatsByRow) {
            let seats = seatsByRow[row];

            for (let i = 0; i < seats.length - numberOFSeats + 1; i++) {
                let consecutiveSeats = seats.slice(i, i + numberOFSeats);
                if (consecutiveSeats.length === numberOFSeats && consecutiveSeats.every(seat => seat.isAvailable)) {
                selectedSeats = consecutiveSeats;
                break;
                }
            }
            if (selectedSeats.length > 0) {
                break;
            }
        }
        if (selectedSeats.length === 0) {
            selectedSeats = economySeats.slice(0, numberOFSeats);
        }

        return selectedSeats.map(seat => `${seat.row}${seat.seatNumber}`);
    },
      getSeatFeature(seat) {
        return {
        'extra-legroom': seat.isExtraLegRoom,
        'window': seat.isWindow,
        'exit': seat.isCloseToExit,
        'sold': !seat.isAvailable,
        'recommended': this.recommendedSeatNumbers.includes(`${seat.row}${seat.seatNumber}`),
        'economy': seat.seatClass === 'ECONOMY' && seat.isAvailable,  
        'business': seat.seatClass === 'BUSINESS' && seat.isAvailable,
        'first': seat.seatClass === 'FIRST' && seat.isAvailable
      };
    }
 },
    
  mounted() {
      this.flightId = this.$route.query.flightId;
      this.numberOFSeats = this.$route.query.numberOFSeats;
      this.fetchSeatsByRow();
  }
}
</script>