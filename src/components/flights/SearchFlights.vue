<template>
    <div>
        <input
            type = "text"
            placeholder = "From"
        />
        <input
            type = "text"
            placeholder = "To"
        />
        <button>Search</button>
    </div>
    <br>
    <select>
        <option>Select flight duration</option>
        <option>1-3 hours</option>
        <option>3-5 hours</option>
        <option>5-7 hours</option>
        <option>7+ hours</option>
    </select>
    <br>
    <select>
        <option>Select price range</option>
        <option>0-100€</option>
        <option>100-300€</option>
        <option>300-600€</option>
        <option>600+ €</option>
    </select>
    <br>
    <input
        type="date"
        v-model = "date"
    />
</template>

<script>
</script>