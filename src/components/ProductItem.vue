<script setup>
import { useDataStore } from "../stores/data";
const { datares, fetchData,storeAllArr} = useDataStore();
const props = defineProps({
  activeTab: {
    type: String,
    default: "",
  },
});
const loading = ref(true);
const arrFilter = computed(() => {
  const clothArr = datares.data.cloth.item;
  const pantArr = datares.data.pant.item;
  const jacketArr = datares.data.jacket.item;
  const allArr = clothArr.concat(pantArr, jacketArr);
  storeAllArr(allArr);
  return allArr.filter((item) => {
    return item.status == props.activeTab;
  });
});

const getClassByStatus=(status)=>{
  switch(status){
    case 'new':
      return 'product__badge light-pink';
    case 'hot':
      return 'product__badge light-orange';
    case 'sale':
      return 'product__badge light-green';
  }
}


onMounted(async () => {
  await fetchData(); // 等待資料取得完成
  // 定義 computed 屬性 arrFilter
  loading.value = false;
});
</script>
<template>
  <div v-if="loading"></div>
  <div class="productList" v-else>
    <n-grid x-gap="20" y-gap="20" cols="2 600:4">
      <n-gi v-for="item in arrFilter" :key="item.id">
        <div class="product__item">
          <div class="product__banner">
            <router-link :to="`/${item.id}`" class="product__images">
              <img :src="item.preimage" alt="" class="product__img default" />
              <img :src="item.hoverimage" alt="" class="product__img hover" />
            </router-link>
            <div class="product__actions">
              <a href="#" class="action__btn" aria-label="Quick View">
                <i class="fa-regular fa-eye"></i>
              </a>
              <a href="#" class="action__btn" aria-label="Add To Wishlist">
                <i class="fa-regular fa-heart"></i>
              </a>
              <a href="#" class="action__btn" aria-label="Compare">
                <i class="fa-solid fa-shuffle"></i>
              </a>
            </div>
            <div :class="getClassByStatus(item.status)">{{ item.status }}</div>
          </div>
          <div class="product__content">
            <span class="product__category"> {{ item.cate }} </span>
            <a href="">
              <h3 class="product__title">{{ item.name }}</h3>
            </a>
            <div class="product__rating">
              <n-rate readonly :default-value="item.rate" allow-half />
            </div>
            <div v-if="item.issale" class="product__price">
              <span class="new__price">${{ item.price }}</span>
              <span class="old__price">${{ item.sale }}</span>
            </div>
            <div v-else class="product__price">
              <span class="new__price">${{ item.price }}</span>
            </div>
            <!-- <a href="#" class="action__btn cart__btn" aria-label="Add To Cart">
              <i class="fa-solid fa-cart-plus"></i>
            </a> -->
          </div>
        </div>
      </n-gi>
    </n-grid>
  </div>
</template>
<style lang="scss" scoped>
.productList{
  padding-bottom: 2rem;
}
.product__item {
  overflow: hidden;
  border: 1px solid $border-color;
  border-radius: 1.5rem;
  transition: all 0.2s $transition;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .product__banner {
    padding: 0.625rem 0.75rem 0.75rem;
    position: relative;

    .product__images {
      display: block;
      position: relative;
      overflow: hidden;
      border-radius: 1.25rem;

      .product__img {
        vertical-align: middle;
        transition: all 1.5s $transition;
      }

      .product__img.hover {
        position: absolute;
        top: 0;
        left: 0;
        transition: 0.5s all;
      }
    }

    .product__badge {
      position: absolute;
      left: 1.25rem;
      top: 1.25rem;
      background-color: $first-color;
      color: $body-color;
      padding: 0.25rem 0.625rem;
      border-radius: 2.5rem;
      font-size: $tiny-font-size;

      &.light-pink {
        background-color: rgb(255, 117, 161);
      }

      &.light-green {
        background-color: hsl(155, 20%, 67%);
      }

      &.light-orange {
        background-color: hsl(24, 100%, 73%);
      }

      &.light-blue {
        background-color: hsl(202, 53%, 76%);
      }
    }

    .product__actions {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      column-gap: 0.5rem;
    }
  }

  .product__content {
    padding: 0 1.25rem 1.125rem;
    position: relative;

    .product__category {
      color: $text-color-light;
      font-size: $smaller-font-size;
    }

    .product__title {
      font-size: $normal-font-size;
      margin-block: 0.75rem 0.5rem;
    }

    .product__rating {
      color: hsl(42, 100%, 50%);
      font-size: $small-font-size;
      margin-bottom: 0.75rem;
    }

    .cart__btn {
      position: absolute;
      bottom: 1.6rem;
      right: 1.25rem;
    }
  }
}

.new__price {
  font-size: $large-font-size;
  color: $first-color;
  font-weight: $weight-600;
}

.old__price {
  font-size: $smaller-font-size;
  color: $text-color-light;
  text-decoration: line-through;
  padding-block: 0.875rem;
}

.action__btn {
  text-align: center;
  line-height: 40px;
  width: 40px;
  height: 40px;
  background-color: $first-color-alt;
  border: 1px solid $border-color;
  color: $text-color;
  font-size: $small-font-size;
  border-radius: 50%;
  position: relative;
  transition: 0.2s all $transition;

  &::before,
  &::after {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  &::before {
    content: "";
    top: -5px;
    border: 0.5rem solid transparent;
    border-top-color: $first-color;
  }

  &::after {
    content: attr(aria-label);
    background-color: $first-color;
    color: $body-color;
    font-size: $tiny-font-size;
    font-weight: $weight-500;
    bottom: 105%;
    white-space: nowrap;
    padding-inline: 0.625rem;
    border-radius: 0.625rem;
  }
}

.product__img.hover,
.product__actions,
.action__btn::before,
.action__btn::after,
.product__item:hover .product__img.default {
  opacity: 0;
}

.product__item:hover .product__img.hover,
.product__item:hover .product__actions,
.action__btn:hover::before,
.action__btn:hover::after {
  opacity: 1;
}

.action__btn:hover {
  background-color: $first-color;
  border-color: $first-color;
  color: $body-color;
}

.product__item:hover .product__img {
  transform: scale(1.1);
}
</style>
