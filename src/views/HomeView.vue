<template>
  <ParallaxBackground/>
  <div id="content">
    <div id="waves"></div>
    <div id="content-box">
      <h1>Meet the Noxtoon family!</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo integer malesuada nunc vel risus commodo viverra. A scelerisque purus semper eget duis at tellus at. Massa vitae tortor condimentum lacinia. Et netus et malesuada fames. In ante metus dictum at tempor. Amet justo donec enim diam. Justo eget magna fermentum iaculis eu. Consequat semper viverra nam libero justo laoreet sit. Est sit amet facilisis magna etiam tempor orci eu lobortis. Amet nulla facilisi morbi tempus iaculis urna. Diam maecenas sed enim ut sem viverra aliquet eget sit. Interdum consectetur libero id faucibus nisl tincidunt eget nullam non. Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. In tellus integer feugiat scelerisque varius. Ut sem nulla pharetra diam sit amet nisl. Commodo odio aenean sed adipiscing. Massa id neque aliquam vestibulum morbi blandit cursus risus at. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Sit amet volutpat consequat mauris nunc.</p>
      <p>Diam volutpat commodo sed egestas. Tristique nulla aliquet enim tortor at auctor urna. Adipiscing elit pellentesque habitant morbi tristique. Nisl pretium fusce id velit ut. Eu scelerisque felis imperdiet proin fermentum leo vel orci. At auctor urna nunc id cursus metus aliquam eleifend mi. Etiam sit amet nisl purus in mollis nunc sed id. Proin libero nunc consequat interdum varius. Eleifend quam adipiscing vitae proin. Amet facilisis magna etiam tempor. Gravida quis blandit turpis cursus. Et malesuada fames ac turpis egestas sed. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Augue eget arcu dictum varius duis at consectetur.</p>
      <p>Elit eget gravida cum sociis natoque penatibus et magnis dis. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Nec nam aliquam sem et. Vestibulum lorem sed risus ultricies tristique nulla. Est pellentesque elit ullamcorper dignissim. Libero enim sed faucibus turpis in eu mi bibendum. Nulla posuere sollicitudin aliquam ultrices sagittis orci a. Dignissim enim sit amet venenatis. Laoreet sit amet cursus sit. Vel facilisis volutpat est velit egestas. Donec adipiscing tristique risus nec feugiat. Erat nam at lectus urna duis. Nisl pretium fusce id velit ut.</p>
      <p>Nunc eget lorem dolor sed viverra ipsum nunc aliquet. Sapien nec sagittis aliquam malesuada bibendum arcu. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum. Leo vel orci porta non pulvinar neque. Sagittis aliquam malesuada bibendum arcu. Cursus sit amet dictum sit amet. Vitae suscipit tellus mauris a diam maecenas. Lorem dolor sed viverra ipsum nunc aliquet bibendum. Quam pellentesque nec nam aliquam sem et tortor consequat id. Ac orci phasellus egestas tellus rutrum tellus pellentesque. Quis vel eros donec ac. Cursus risus at ultrices mi tempus imperdiet. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Amet venenatis urna cursus eget nunc scelerisque. Egestas dui id ornare arcu odio ut sem nulla pharetra. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Urna et pharetra pharetra massa massa ultricies mi.</p>
      <p>Tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Lectus arcu bibendum at varius vel pharetra vel turpis nunc. Ut lectus arcu bibendum at. Cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla. Sed lectus vestibulum mattis ullamcorper velit. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Vitae auctor eu augue ut lectus arcu. Justo nec ultrices dui sapien eget mi proin sed. Tristique sollicitudin nibh sit amet commodo. Et tortor at risus viverra adipiscing. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Hendrerit gravida rutrum quisque non.</p>
    </div>
    <Footer/>
  </div>
</template>

<script setup>
import ParallaxBackground from "@/components/home/ParallaxBackground.vue";
import Footer from "@/components/nav/Footer.vue";
</script>

<style scoped>

#waves {
  width: 100%;
  height: 3em;
  position: relative;
  bottom: 2.6em;
  background-color: var(--nx-c-near-black);
  --mask:
      radial-gradient(54.08px at 50% 75.00px,#000 99%,#0000 101%) calc(50% - 60px) 0/120px 100%,
      radial-gradient(54.08px at 50% -45px,#0000 99%,#000 101%) 50% 30px/120px 100% repeat-x;
  -webkit-mask: var(--mask);
  mask: var(--mask);
}

#content {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 33em;
  background-color: var(--nx-c-near-black);
  text-align: center;
}

#content-box {
  width: var(--content-box-size);
}
</style>