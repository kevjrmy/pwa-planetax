<template>
  <div id="planetax">
    <AppHeader />
    <NuxtPage />
    <AppNavBar />
  </div>
</template>

<style>
/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  min-height: fit-content;
  height: 100svh;
  width: 100svw;
  max-width: 768px;
  margin: auto;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    Roboto,
    "Segoe UI",
    Helvetica,
    Arial,
    sans-serif;
  font-size: 1.06em;
  color: whitesmoke;
  background-color: black;
}

/* Global sizing + padding */
#planetax {
  padding: 3rem 1rem;
  background: url('/img/background.png') no-repeat center center fixed;
  background-size: cover;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  min-height: calc(100svh - 80px - 90px - 3rem);
  padding-bottom: 90px;
}

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin */
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}


/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul:where([role="list"]) {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Clear links default style */
a {
  color: inherit;
  text-decoration: none;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Cancel default CSS for buttons */
button {
  background-color: transparent;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

@media (min-width: 600px) {
  #planetax {
    background-size: contain;
  }
}
</style>