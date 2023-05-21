<template>
  <div id="about">
    <h1>Welcome to</h1>
    <img id="logo" src="../assets/img/parallax/logo-wide.png">
    <hr>

    <div class="para-image">
      <p>
        <b>Noxtoon</b> is your ultimate destination for <i>all things cartoons</i>, providing you with an extensive database of
        cartoons that you can easily browse and explore. Our user-friendly interface allows you to find your favorite
        cartoons <u>quickly and easily</u>, and get information on them including summaries, ratings, and reviews.
      </p>
      <img src="../assets/img/misc/bonkers1.png"/>
    </div>

    <div class="para-image">
      <img src="../assets/img/misc/bonkers2.png"/>
      <p>
        Whether you're looking to revisit <i>classic cartoons</i> from your childhood or discover <i>the latest</i> trends in
        the world of animation, <b>Noxtoon</b> has got you covered. Our database is constantly updated with new and exciting
        cartoons, and our community of users is always sharing their favorite picks and recommendations.
      </p>
    </div>

    <div class="para-image">
      <p>
        <u>So, what are you waiting for?</u> Start browsing our collection of cartoons, create your own watchlist, and join
        the Noxtoon community today!
      </p>
      <img src="../assets/img/misc/bonkers3.png"/>
    </div>

    <Footer/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import Footer from "@/components/nav/Footer.vue";
import Header from "@/App.vue";

export default defineComponent({
  components: {Header, Footer}
})
</script>

<style scoped>
#footer-container {
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
}

#about {
  padding-top: 5em;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--content-box-width);
  transition: all 500ms ease-in-out;
}

hr {
  margin-top: 5em;
  margin-bottom: 5em;
  width: var(--content-box-width);
  border: 1px solid var(--nx-c-orange);
}

h1 {
  font-size: 3em;
}

p {
  font-size: 1.5em;
}

.para-image {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
}

div > img {
  width: 25em;
}

#logo {
  transition: all 500ms ease-in-out;
}

#logo:hover {
  transform: rotate(25deg);
}

@keyframes wiggle {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
