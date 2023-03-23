<script setup>
const banner1 = 'images/image.png'
const banner2 = 'images/image2.png'
const banner3 = 'images/image3.png'
const banner4 = 'images/image4.png'

</script>

<template>

  <div class="bg-white font-sans leading-normal tracking-normal">

    <div class="carousel relative shadow-2xl bg-white">
      <div class="carousel-inner relative overflow-hidden w-full">
        <!--Slide 1-->
        <input class="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden="true" hidden=""
               checked="checked">
        <div class="carousel-item absolute opacity-0 height">
          <div class="block h-full w-full">
            <img :src="banner1" alt="hello" class="w-full">
          </div>
        </div>
        <label for="carousel-4"
               class="prev control-1 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
        <label for="carousel-2"
               class="next control-1 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>

        <!--Slide 2-->
        <input class="carousel-open" type="radio" id="carousel-2" name="carousel" aria-hidden="true" hidden="">
        <div class="carousel-item absolute opacity-0 height">
          <div class="block h-full w-full">
            <img :src="banner2" alt="hello" class="w-full">
          </div>
        </div>
        <label for="carousel-1"
               class="prev control-2 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
        <label for="carousel-3"
               class="next control-2 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>

        <!--Slide 3-->
        <input class="carousel-open" type="radio" id="carousel-3" name="carousel" aria-hidden="true" hidden="">
        <div class="carousel-item absolute opacity-0 height">
          <div class="block h-full w-full">
            <img :src="banner3" alt="hello" class="w-full">
          </div>
        </div>

        <label for="carousel-2"
               class="prev control-3 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
        <label for="carousel-4"
               class="next control-3 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>
        <!--Slide 4-->
        <input class="carousel-open" type="radio" id="carousel-4" name="carousel" aria-hidden="true" hidden="">
        <div class="carousel-item absolute opacity-0 height">
          <div class="block h-full w-full">
            <img :src="banner4" alt="hello" class="w-full">
          </div>
        </div>
        <label for="carousel-3"
               class="prev control-4 w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 left-0 my-auto">‹</label>
        <label for="carousel-1"
               class="next control-4 w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-blue-700 leading-tight text-center z-10 inset-y-0 right-0 my-auto">›</label>

        <!-- Add additional indicators for each slide-->
        <ol class="carousel-indicators">
          <li class="inline-block mr-3">
            <label for="carousel-1"
                   class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-blue-700">•</label>
          </li>
          <li class="inline-block mr-3">
            <label for="carousel-2"
                   class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-blue-700">•</label>
          </li>
          <li class="inline-block mr-3">
            <label for="carousel-3"
                   class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-blue-700">•</label>
          </li>
          <li class="inline-block mr-3">
            <label for="carousel-4"
                   class="carousel-bullet cursor-pointer block text-4xl text-white hover:text-blue-700">•</label>
          </li>
        </ol>

      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-open:checked + .carousel-item {
  position: static;
  opacity: 100;
}

.carousel-item {
  -webkit-transition: opacity 0.6s ease-out;
  transition: opacity 0.6s ease-out;

}

#carousel-1:checked ~ .control-1,
#carousel-2:checked ~ .control-2,
#carousel-3:checked ~ .control-3,
#carousel-4:checked ~ .control-4 {
  display: block;
}

.carousel-indicators {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 2%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 10;
}

#carousel-1:checked ~ .control-1 ~ .carousel-indicators li:nth-child(1) .carousel-bullet,
#carousel-2:checked ~ .control-2 ~ .carousel-indicators li:nth-child(2) .carousel-bullet,
#carousel-3:checked ~ .control-3 ~ .carousel-indicators li:nth-child(3) .carousel-bullet,
#carousel-4:checked ~ .control-4 ~ .carousel-indicators li:nth-child(4) .carousel-bullet {
  color: #2b6cb0; /*Set to match the Tailwind colour you want the active one to be */
}

.height {
  height: 50vh;
}

@media screen and (max-width: 1350px) {
  .height {
    height: 25vh;
  }
}

@media screen and (max-width: 670px) {
  .height {
    height: 19vh;
  }
}

@media screen and (max-width: 390px) {
  .height {
    height: 15vh;
  }
}
</style>