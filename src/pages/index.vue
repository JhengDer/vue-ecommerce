<script setup>
import { useDataStore } from "../stores/data";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper";
const { datares } = useDataStore();
const modules = [Pagination];

</script>

<template>
  <main>
    <n-grid class="home container" cols="1 600:2">
      <n-gi class="home-grid">
        <div class="home-content">
          <span class="home-subtitle">促銷活動中</span>
          <h1 class="home-title">時尚潮流<span>優質收藏</span></h1>
          <p class="home-description">全館商品8折起</p>
          <a href="" class="btn">即刻購買</a>
        </div>
      </n-gi>
      <n-gi class="home-grid home-bg">
        <SvgIcons name="image/home_bg" />
      </n-gi>
    </n-grid>
    <Category />
    <ProductTab />
    <DealEvent />
  </main>
</template>
<style lang="scss" scoped>
.home-grid {
  height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.home-bg {
  display: flex;
  justify-content: flex-end;
}
.home-description{
  margin-bottom: 3rem;
}
.btn{
  background-color: $first-color-alt;
  padding: 1rem;
  border-radius: 10px;
  border: 1px $first-color solid;
  transition: .5s all;
}
.btn:hover{
  background-color: $first-color;
  color: #ffffff;
}
@media screen and (max-width: 480px) {
  .home {
    .home-content{
      z-index: 10;
    }
    position: relative;
  }
  .home-bg {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0.4;
    left: 0;
  }
  .home-grid {
    height: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
