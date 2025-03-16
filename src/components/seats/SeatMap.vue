<template>
  <div class="seat-map"></div>
    <h1>Seat Map for the selected flight</h1>
    <ul class="legend">
      <li>
        <div class="seat available"></div>
        <small>Available</small>
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
    <div class="book-btn-container">
    <button v-if="selectedSeat" @click="bookSeat" class="book-btn">
      Book selected seat
    </button>
  </div>
    <div class="seat-container">
      <div v-for="(row, index) in seatRows" :key="index" class="seat-row">
        <div v-for="seat in row" 
        :key="seat.id" 
        class="seat" 
        :class="getSeatFeature(seat)"
        @mouseover="showSeatInfo(seat, $event)"
        @mouseleave="hideSeatInfo"
        @click="selectSeat(seat)">
             {{ seat.row }}
             {{ seat.seatNumber}}
        </div>
      </div>
    <div v-if="tooltip.visible" class="tooltip" :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }">
        {{ tooltip.text }}
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
          numberOfSeats: null,
          flightId: null,
          selectedSeat: null,
          tooltip: {
            visible: false,
            text: "",
            x: 0,
            y:0          
          }
      };
  },

  methods: {
    
   showSeatInfo(seat, event) {
      const features = [seat.seatClass];

      if (seat.isExtraLegroom) features.push("EXTRA LEGROOM");
      if (seat.isWindow) features.push("WINDOW");
      if (seat.isCloseToExit) features.push("CLOSE TO EXIT");
      this.tooltip.text = features.join("\n");  
      this.tooltip.x = event.clientX + 10;
      this.tooltip.y = event.clientY + 10;
      this.tooltip.visible = true;
    },

    hideSeatInfo() {
      this.tooltip.visible = false;
    },

    fetchSeatsByRow() {
      instance
        .get(`${this.api}/allSeatsByRow/${this.flightId}`)
        .then((res) => {
          this.seatRows = res.data;
          const availableSeats = res.data.flat().filter(seat => seat.isAvailable);
          this.recommendedSeatNumbers = this.getClosestSeats(availableSeats, this.numberOfSeats);
          })
        .catch((error) => {
          console.error("Error fetching seats", error);
          });
      },

    getClosestSeats(availableSeats, numberOfSeats) {
      const economySeats = availableSeats.filter(seat => seat.seatClass === 'ECONOMY');
      const seatsByRow = {};

      economySeats.forEach(seat => {
        if (!seatsByRow[seat.row]) {
          seatsByRow[seat.row] = [];
        }
        seatsByRow[seat.row].push(seat);
      });
      
      for (const row in seatsByRow) {
        const sortedSeats = seatsByRow[row].sort((a, b) => a.seatNumber.localeCompare(b.seatNumber));
        for (let i = 0; i <= sortedSeats.length - numberOfSeats; i++) {
          const potentialSeats = sortedSeats.slice(i, i + numberOfSeats);
          if (potentialSeats.length >= numberOfSeats) {
            let consecutive = true;
            for (let j = 1; j < numberOfSeats; j++) {
              if (potentialSeats[j].seatNumber.charCodeAt(0) - potentialSeats[j - 1].seatNumber.charCodeAt(0) !== 1) {
                consecutive = false;
                break;
              }
            }
            if (consecutive) {           
              return  potentialSeats.slice(0, numberOfSeats).map(seat => `${row}${seat.seatNumber}`);
            }
          }
        }
      }
      return [];
    },

    getSeatFeature(seat) {
      return {
      'sold': !seat.isAvailable,
      'recommended': this.recommendedSeatNumbers.includes(`${seat.row}${seat.seatNumber}`),
      'available': seat.isAvailable,
      'selected': this.selectedSeat === seat.id,  
      };
    },

    selectSeat(seat) {
      if (!seat.isAvailable) return;
        this.selectedSeat = seat.id; 
    },

    bookSeat() {
      if (!this.selectedSeat) return;

      instance
        .put(`${this.api}/bookSeat/${this.selectedSeat}`)
        .then(() => {
          alert("Your seat is booked!");
          this.selectedSeat = null; 
          this.fetchSeatsByRow(); 
        })
        .catch((error) => {
          console.error("Error trying to book a seat:", error);
        });
    },
    },
    
  mounted() {
      this.flightId = this.$route.query.flightId;
      this.numberOfSeats = this.$route.query.numberOfSeats;
      this.fetchSeatsByRow();
  }
}
</script>