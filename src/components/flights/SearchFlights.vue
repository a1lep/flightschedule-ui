<template>
    <div class="search-container">
        <input
            type = "text"
            id="origin"
            class="search-input"
            placeholder = "From"
        />
        <input
            type = "text"
            id="destination"
            class="search-input"
            placeholder = "To"
        />
        <input type="date" v-model="selectedDate" class="search-input" />
      
        <button @click="searchFlights" class="search-button">Search</button>
    
    
    <div class="filter-container">
      <label>Search by flight duration</label>
        <select id="durationSelect" @change="findFlightByDuration">
          <option value="">Select duration</option>
          <option value="0-3">0-3 hours</option>
          <option value="3-5">3-5 hours</option>
          <option value="5-7">5-7 hours</option>
          <option value="7+">7+ hours</option>
        </select>
    </div>
    
    <div class="filter-container">
    <label>Search by price </label>
    <select id="priceSelect" @change="findFlightByPriceRange">
        <option value="">Select price range</option>
        <option value="0-100">0-100€</option>
        <option value="100-300">100-300€</option>
        <option value="300-600">300-600€</option>
        <option value="600+">600+ €</option>
    </select>
  </div>
  <div>
      <button @click="clearFields" class="clear-button">Clear Fields</button>
    </div>
</div>
</template>

<script>
import instance from '@/axiosConfig';


export default {
    data() {
        return {
            api: "http://localhost:8080/api/flights/",
            allFlights: [],
      originFlights: [],
      dateFlights: [],
      selectedDate: this.getCurrentDate(),
        }
    },
methods: {
    getCurrentDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); 
            const day = String(today.getDate()).padStart(2, '0'); 
            return `${year}-${month}-${day}`;
        },
    fetchFlightByDuration(minDuration, maxDuration) {
        instance
        .get(`${this.api}flightByDuration/${minDuration}/${maxDuration}`)
        .then((res) => {
            this.$emit("update-flights", res.data);
        })
        .catch((error) => {
            console.error("Error fetching flights by duration:", error);
          });
    },
    findFlightByDuration() {
    const value = document.getElementById("durationSelect").value.trim();

    let minDuration, maxDuration;

    if (value === "0-3") {
        minDuration = 0;
        maxDuration = 3;
    } else if (value === "3-5") {
        minDuration = 3;
        maxDuration = 5;
    } else if (value === "5-7") {
        minDuration = 5;
        maxDuration = 7;
    } else if (value === "7+") {
        minDuration = 7;
        maxDuration = 100; 
    } else {
        return;
    }

    this.fetchFlightByDuration(minDuration, maxDuration);
    },

    fetchFlightByOriginDestination(origin,destination) {
        instance
        .get(`${this.api}flightByOriginDestination/${origin}/${destination}`)
        .then((res) => {
            this.$emit("update-flights", res.data);
        })
        .catch((error) => {
            console.error("Error fetching flights by duration:", error);
          });
    },
    findFlightByOriginDestination() {
        const origin = document.getElementById("origin").value.trim();
        const destination = document.getElementById("destination").value.trim();
        this.fetchFlightByOriginDestination(origin,destination);
    },
    fetchFlightsByDate(date) {
      instance
        .get(`${this.api}flightByDate/${date}`)
        .then((res) => {
          this.dateFlights = res.data;
          this.matchFlights();
        })
        .catch((error) => {
          console.error("Error fetching flights by date:", error);
        });
    },
    fetchFlightByPriceRange(minPrice, maxPrice) {
      instance
        .get(`${this.api}flightByPrice/${minPrice}/${maxPrice}`)
        .then((res) => {
          this.$emit("update-flights", res.data);
        })
        .catch((error) => {
          console.error("Error fetching flights by price range:", error);
        });
    },
    findFlightByPriceRange() {

      const value = document.querySelector("#priceSelect").value.trim();
      console.log(value)
      let minPrice, maxPrice;

      if (value === "0-100") {
        minPrice = 0;
        maxPrice = 100;
      } else if (value === "100-300") {
        minPrice = 100;
        maxPrice = 300;
      } else if (value === "300-600") {
        minPrice = 300;
        maxPrice = 600;
      } else if (value === "600+") {
        minPrice = 600;
        maxPrice = 1000;
      } else {
        return;
      }

      this.fetchFlightByPriceRange(minPrice, maxPrice);
    },
    matchFlights() {
        const matchedFlights = this.originFlights.filter((originFlight) => {
            return this.dateFlights.some((dateFlight) => {
                return (
                    originFlight.id === dateFlight.id &&
                    originFlight.origin === dateFlight.origin &&
                    originFlight.destination === dateFlight.destination &&
                    originFlight.date === dateFlight.date
                );
            });
        });

        this.allFlights = matchedFlights;
        this.$emit("update-flights", this.allFlights);
    },
    searchFlights() {
      const origin = document.getElementById("origin").value.trim();
      const destination = document.getElementById("destination").value.trim();
      const date = this.selectedDate;

      if (origin && destination && date) {
        this.fetchFlightByOriginDestination(origin, destination);
        this.fetchFlightsByDate(date);
      } else {
        console.error("Please fill in all fields (origin, destination, and date).");
      }
    },
    clearFields() {
      document.getElementById("priceSelect").value = "";
      document.getElementById("durationSelect").value = "";
      document.getElementById("origin").value = "";
      document.getElementById("destination").value = "";
      this.$emit("reset-allFlights");
    }
}}
</script>