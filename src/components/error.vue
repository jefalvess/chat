<template>
  <div class="page-wrap">
    <h1 style="  padding-top: 15%;">503</h1>
    <h2 style="padding-top: 2rem;">Unavailable</h2>
    <p class="espaço">Well, what to say. Hmm? Sorry ...</p>

    <p>Contact our support sending your problem to us.</p>
  </div>
</template>

<style scoped>
body {
  background: dimgray;
  font-family: 'IBM Plex Sans', serif;
  color: #fff;
  margin: 0;
  padding: 0;
}

.page-wrap {
  margin: 0 auto;
  width: 100%;
  text-align: center;
}

p,
a {
  font-size: 1em;
}

h2,
a {
  text-transform: uppercase;
}

a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  padding: 10px 20px;
  height: 44px;
  line-height: 44px;
  border-radius: 5px;
  border: 2px solid #fff;
  transition: all 0.5s ease;
}

a:hover {
  background: dimgray;
  border: 2px solid gray;
}

@media (min-width: 320px) {
  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.5em;
  }
}

@media (min-width: 480px) {
  h1 {
    font-size: 3em;
  }
  h2 {
    font-size: 1.75em;
  }
}

@media (min-width: 600px) {
  h1 {
    font-size: 4em;
  }
  h2 {
    font-size: 2em;
  }
}

@media (min-width: 801px) {
  h1 {
    font-size: 5em;
  }
  h2 {
    font-size: 3em;
  }
}

@media (min-width: 1025px) {
  h1 {
    font-size: 6em;
  }
  h2 {
    font-size: 4em;
  }
}

@media (min-width: 1281px) {
  h1 {
    font-size: 7em;
  }
  h2 {
    font-size: 5em;
  }
}

.espaço {
  padding-top: 1rem;
}
</style>