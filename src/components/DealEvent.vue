<script setup>
import { useDataStore } from "../stores/data";
const { datares, fetchData } = useDataStore();

const calData = (endDate) => {
  const start = new Date();
  const end = new Date(endDate);
  const remainingSec = end - start;
  return remainingSec;
};
const timeArr = ref([]);
const eventData = reactive({});
const event = computed(() => {
  eventData.data = datares.deadline.item;
  eventData.data.forEach((item, index) => {
    const dealtime = calData(item.deadline);
    timeArr.value.push(dealtime);
    eventData.data[index].timeLeft = dealtime;
  });
  return eventData;
});
const loading = ref(true);
onMounted(async () => {
  await fetchData();
  loading.value = !loading.value;
});
</script>
<template>
  <div v-if="loading"></div>
  <section v-else class="deals section">
    <n-grid cols="1 600:2" :x-gap="20" :y-gap="20" class="deals__container container grid">
      <n-grid-item v-for="items in event.data" class="deals__item">
        <div class="deals__group">
          <h3 class="deals__brand">{{items.name}}</h3>
          <!-- <span class="deals__category"></span> -->
        </div>
        <h4 class="deals__title">{{ items.desc }}</h4>
        <!-- <div class="deals__price flex">
          <span class="new__price">$479</span>
          <span class="old__price">$530</span>
        </div> -->
        <div class="deals__group">
          <div class="deals__countdown-text">優惠倒數</div>
          <div class="countdown">
            <n-space>
              <span style="font-variant-numeric: tabular-nums">
                <n-countdown :duration="items.timeLeft" :active="true" />
              </span>
            </n-space>
          </div>
        </div>
        <div class="deals__btn">
          <a href="" class="btn btn--md">立即購買</a>
        </div>
      </n-grid-item>
    </n-grid>
  </section>
</template>
<style lang="scss" scoped>
.deals__container {
  z-index: 3;

  .deals__item {
    padding: 3rem;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
    position: relative;

    .deals__brand {
      color: $first-color;
      font-size: $h3-font-size;
      margin-bottom: 0.25rem;

      .deals__category {
        font-family: $second-font;
        font-size: $smaller-font-size;
      }
    }

    .deals__title {
      min-width: 240px;
      font-size: $large-font-size;
      font-weight: $weight-500;
      line-height: 1.3;
    }

    .deals__group {
      .deals__countdown-text {
        margin-bottom: 0.25rem;
      }

      .countdown {
        display: flex;
        column-gap: 1.5rem;
        font-size: 2rem;

        .countdown__amount {
          position: relative;

          &::after {
            content: ":";
            color: $title-color;
            font-size: $large-font-size;
            position: absolute;
            right: -25%;
            top: 20%;
          }

          &:last-child::after {
            display: none;
          }

          .countdown__period {
            width: 60px;
            height: 50px;
            text-align: center;
            background-color: $first-color;
            color: $body-color;
            line-height: 50px;
            border-radius: 0.25rem;
            font-weight: $weight-600;
            margin-bottom: 0.5rem;
          }

          .unit {
            font-size: $small-font-size;
            text-align: center;
            display: block;
          }
        }
      }
    }

    .deals__btn {
      .btn {
        padding: 1rem;
        background-color: transparent;
        color: $first-color;
        transition: 0.3s all $transition;

        &:hover {
          background-color: $first-color;
          color: $body-color;
        }
      }
    }

    &:nth-child(1)::before {
      z-index: -1;
      content: "";
      background-image: url("@/assets/img/bg/bg1.jpg");
      background-size: cover;
      opacity: 0.3;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      position: absolute;
    }

    &:nth-child(2)::before {
      z-index: -1;
      content: "";
      background-image: url("@/assets/img/bg/bg3.jpg");
      background-size: cover;
      opacity: 0.3;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      position: absolute;
    }
  }
}
</style>
