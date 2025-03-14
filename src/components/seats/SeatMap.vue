<template>
  <div class="seat-map"></div>
    <h1>Seat Map for Flight {{ flightId }}</h1>
    <ul class="legend">
      <li>
        <div class="seat"></div>
        <small>Available</small>
      </li>
      <li>
        <div class="seat extra legroom"></div>
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
    </ul>
    <div class="seat-container">
      <div v-for="(row, index) in seatRows" :key="index" class="seat-row">
        <div v-for="seat in row" :key="seat.id" class="seat" :class="geatSeatFeature(seat)">
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
      };
  },

  methods: {
      fetchSeatsByRow() {
          instance
              .get(`${this.api}/allSeatsByRow/${this.flightId}`)
              .then((res) => {
                  this.seatRows = res.data;
              })
              .catch((error) => {
                  console.error("Error fetching seats", error);
              });
      },
      geatSeatFeature(seat) {
        return {
        'available': seat.isAvailable,
        'extra-legroom': seat.isExtraLegRoom,
        'window': seat.isWindow,
        'exit': seat.isCloseToExit,
        'sold': !seat.isAvailable
      };
    }
 },
    
  mounted() {
      this.flightId = this.$route.query.flightId;
      this.fetchSeatsByRow();
  }
}
</script>