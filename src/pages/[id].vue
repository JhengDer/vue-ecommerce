<script setup>
import { useRoute } from "vue-router";
import { useDataStore } from "../stores/data";
import { useCartStore } from "../stores/cart";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";

const dataStore = useDataStore();
const authStore = useAuthStore();
const cartStore = useCartStore();
const { allArr } = dataStore;
const { addCart } = cartStore;
const { loggedIn } = storeToRefs(authStore);
const route = useRoute();
const choseData = ref({});
const choseImg = ref("");
const selectImg = ref(0);
const loading = ref(true);

// 尺寸按鈕
const size = ref([
  {
    value: "S",
    label: "S",
  },
  {
    value: "M",
    label: "M",
  },
  {
    value: "L",
    label: "L",
  },
  {
    value: "XL",
    label: "XL",
  },
]);
const choseSize = ref("");

//篩選清單並顯示該頁資訊
const choseItem = (choseID) => {
  allArr.forEach((item) => {
    if (item.id == choseID) {
      choseData.value = item;
      loading.value = false;
      choseImg.value = item.preimage;
    }
  });
};
choseItem(route.params.id);

// 切換預覽圖片
const changeImg = (targetImg, index) => {
  choseImg.value = targetImg;
  selectImg.value = index;
};

// 狀態class顯示判定
const getClassByStatus = (status) => {
  switch (status) {
    case "new":
      return "product__badge light-pink";
    case "hot":
      return "product__badge light-orange";
    case "sale":
      return "product__badge light-green";
  }
};

const addCartBtn = () => {
  console.log(loggedIn.value);
  if (loggedIn.value == false) {
    alert("請先登入");
  } else {
    if (choseSize.value == "") {
      alert("尚未選擇尺寸");
    } else {
      addCart(choseData, choseSize.value);
    }
  }
};
</script>
<template>
  <div class="container">
    <div class="" v-if="loading">123</div>
    <div v-else>
      <n-grid x-gap="20" y-gap="20" cols="1 600:2">
        <n-gi>
          <n-space justify="center"><img class="showImg" :src="choseImg" alt="" /></n-space>
          <n-space>
            <div
              @click="changeImg(img, index)"
              v-for="(img, index) in choseData.images"
              :key="img"
              :class="['smallImg', { active: selectImg === index }]"
            >
              <img :src="img" alt="" />
            </div>
          </n-space>
        </n-gi>
        <n-gi
          ><n-grid x-gap="20" y-gap="20" cols="2 500:1">
            <n-gi>
              <h3>
                {{ choseData.name }}
                <span :class="getClassByStatus(choseData.status)">
                  {{ choseData.status }}
                </span>
              </h3>
              <div class="product__rating">
                <n-rate readonly :default-value="choseData.rate" allow-half />
              </div>
              <div v-if="choseData.issale" class="product__price flex">
                <span class="new__price">${{ choseData.price }}</span>
                <span class="old__price">${{ choseData.sale }}</span>
              </div>
              <div v-else class="product__price flex">
                <span class="new__price">${{ choseData.price }}</span>
              </div>
            </n-gi>
            <n-gi>
              <h5>尺寸</h5>
              <n-space>
                <n-radio-group
                  v-model:value="choseSize"
                  name="radiobuttongroup1"
                >
                  <n-radio-button
                    v-for="item in size"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  />
                </n-radio-group>
              </n-space>
            </n-gi>
          </n-grid>
          <n-space class="buy">
            <n-button
              class="buyButton"
              size="large"
              type="success"
              strong
              @click="addCartBtn"
            >
              放入購物車
            </n-button>
          </n-space>
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.buy {
  margin-top: 2rem;
  position: relative;
  margin-bottom: 4rem;
  .buyButton {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
.showImg {
  height: 700px;
}
.smallImg {
  max-width: 100px;
}
.active {
  padding: 0 1px;
  border: 2px solid red;
}
.product__badge {
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
@media screen and (max-width: 480px) {
  .showImg {
    height: 400px;
  }
}
</style>
