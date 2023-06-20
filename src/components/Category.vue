<script setup>
import { useDataStore } from "../stores/data";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const { datares } = useDataStore();
const modules = [Pagination];
</script>
<template>
  <section class="categories container section">
    <h3 class="section__title"><span>熱門</span>種類</h3>
    <swiper
      class="categories-content"
      :slidesPerView="2"
      :spaceBetween="10"
      :pagination="{
        clickable: true,
      }"
      :breakpoints="{
        '400': {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        '768': {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        '1024': {
          slidesPerView: 6,
          spaceBetween: 20,
        },
      }"
      :modules="modules"
    >
      <swiper-slide v-for="item in datares.category.item"
        ><a href="#">
          <div class="content">
            <div class="carousel-imgbox">
              <img class="carousel-img" :src="item.preimage" />
            </div>
            <h3>{{ item.name }}</h3>
          </div>
        </a></swiper-slide
      >
    </swiper>
  </section>
</template>

<style scoped>
:deep(.swiper){
    overflow: initial;
}
.categories-content:deep(.swiper-pagination) {
  bottom: -25px;
}
</style>

<style lang="scss" scoped>
.categories{
    padding: 2rem 0rem;
    overflow: hidden;
}
.categories-content {
  a {
    .content {
      border: 1px solid green;
      border-radius: 20px;
      padding: 1rem;
      text-align: center;
      .carousel-imgbox {
        height: 160px;
        .carousel-img {
          border-radius: 15%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
