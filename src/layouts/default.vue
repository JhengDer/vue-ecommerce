<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <TopBar />
  <NavBar />
  <RouterView />
  <Footer />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap");
* {
  box-sizing: border-box;
}
input,
textarea,
body {
  color: $text-color;
  font-family: $body-font;
  font-size: $normal-font-size;
  font-weight: $weight-400;
}
body {
  background-color: $body-color;
}

h1,
h2,
h3,
h4 {
  font-family: $second-font;
  color: $title-color;
  font-weight: $weight-700;
}

a {
  text-decoration: none;
}

p {
  line-height: 1.5rem;
}

img {
  max-width: 100%;
  object-fit: cover;
}

button,
textarea,
input {
  background-color: transparent;
  border: none;
  outline: none;
}
.container {
  max-width: 1320px;
  margin-inline: auto;
}
@media screen and (max-width: 480px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
