<script setup>
import { useAuthStore } from "@/stores/authStore.js";
import { useCartStore } from "../../stores/cart";
import { storeToRefs } from "pinia";

const useAuth = useAuthStore();
const { userName, loggedIn } = storeToRefs(useAuth);

const useCart = useCartStore();
const { showItems } = useCart;
const { removeCart } = useCart;
const islog = computed(() => {
  return useAuth.loggedIn;
});
const isMenuopen = ref(false);
const menuToggle = () => {
  isMenuopen.value = !isMenuopen.value;
  // console.log(isMenuopen.value);
};
const resetMenu = () => {
  isMenuopen.value = false;
};

const isShowItem = ref(false);
const itemList = ref(null);
const isItem = ref(false);
const nonItem = ref("目前尚無商品");
const isShowMember = ref(false);

// 按下購物車觸發
const showCart = async () => {
  isShowItem.value = !isShowItem.value;
  if (isShowItem.value == true) {
    if (loggedIn.value == false) {
      nonItem.value = "請先登入會員";
    } else {
      await showItems().then((res) => {
        if (res == 0) {
          nonItem.value = "目前尚無商品";
          isItem.value = false;
        } else {
          itemList.value = res;
          isItem.value = true;
          isShowMember.value = false;
          // console.log(itemList.value);
        }
      });
    }
  }
};
const showMember = () => {
  isShowMember.value = !isShowMember.value;
  isShowItem.value = false;
};

const menuClose=ref(null);
const shopClose = ref(null);
const memberClose = ref(null);


const handleClickOutside = (event) => {
  if (!shopClose.value.contains(event.target)) {
    isShowItem.value = false;
  }
  if (loggedIn.value == true) {
    if (!memberClose.value.contains(event.target)) {
      isShowMember.value = false;
    }
  }
  if (!menuClose.value.contains(event.target)) {
    isMenuopen.value = false;
  }
};

const removeItem = (itemID) => {
  removeCart(itemID);
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
<template>
  <div class="navbar container">
    <div class="logo">
      <h1>J.D.</h1>
    </div>
    <button ref="menuClose" class="menu-btn" @click="menuToggle">
      <SvgIcons name="IconMenu" />
    </button>
    <div :class="['menu', { 'menu-open': isMenuopen }]">
      <RouterLink @click="resetMenu" to="/">首頁</RouterLink>
      <RouterLink @click="resetMenu" to="/shop">商店</RouterLink>
      <RouterLink @click="resetMenu" to="/account">帳戶</RouterLink>
    </div>
    <div class="search">
      <n-input round placeholder="Search...." />
      <SvgIcons class="search-img" name="IconSearch" />
    </div>
    <div class="profile" justify="space-between">
      <div
        ref="shopClose"
        @click="showCart"
        :class="['shopping-cart', { active: isShowItem }]"
      >
        <SvgIcons name="IconShopCart" />
        <div v-show="isShowItem">
          <div class="itemList" v-if="isItem">
            <div class="itemList-content" v-for="item in itemList">
              <div class="itemImg">
                <img :src="item.preimage" alt="" />
              </div>
              <div class="itemDesc">
                <div class="itemName">{{ item.name }}</div>
                <div class="itemSize">{{ item.size }}</div>
                <!-- <div class="itemPrice">NT $ {{ item.price }}</div> -->
                <div v-if="item.issale" class="product__price">
                  <span class="new__price">${{ item.price }}</span>
                  <span class="old__price">${{ item.sale }}</span>
                </div>
                <div v-else class="product__price">
                  <span class="new__price">${{ item.price }}</span>
                </div>
                <div class="itemCol">數量：{{ item.itemcol }}</div>
              </div>
              <div class="itemRemove">
                <button @click="removeItem(item.id)" class="removeItem">
                  刪除
                </button>
              </div>
            </div>
          </div>
          <div class="itemList" v-else>
            <div class="nonItem">
              {{ nonItem }}
            </div>
          </div>
        </div>
      </div>
      <RouterLink v-if="!islog" to="/login">登入</RouterLink>
      <div
        ref="memberClose"
        @click="showMember"
        v-if="islog"
        :class="['member', { active: isShowMember }]"
      >
        <SvgIcons name="IconAccount" />
        <div v-if="isShowMember" class="memberProfile">
          <div>會員名稱：{{ userName }}</div>
          <button class="logout" @click="useAuth.logout">登出</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin: 2rem auto;
  .logo {
    display: flex;
    align-items: center;
    height: 60px;
  }

  .menu-btn {
    display: none;
  }
  .menu {
    padding: 0 0 0 5rem;
    margin-right: 10rem;
    flex-grow: 0.5;
    // width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    gap: 8px 12px;
    height: 60px;
  }
  .search {
    flex-grow: 1;
    // width: 100%;
    position: relative;
    margin-right: 1rem;
    :deep(.search-img) {
      width: 40px;
      position: absolute;
      right: 1rem;
    }
  }
  .profile {
    height: 60px;
    align-items: center;
    margin-left: 1rem;
    flex-grow: 0.05;
    display: flex;
    justify-content: space-between;
    .active {
      background-color: $first-color-alt;
    }
    .favorite,
    .shopping-cart,
    .member {
      z-index: 10;
      width: 3rem;
      padding: 0 10px;
      height: 60px;
      position: relative;
      cursor: pointer;
      .itemList {
        z-index: 15;
        background-color: $first-color-alt;
        // border: 1px $first-color solid;
        position: absolute;
        top: 60px;
        right: 0;
        width: fit-content;
        padding: 0.5rem 1rem;
        white-space: nowrap;
        box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
        .itemList-content {
          align-items: center;
          display: flex;
          .itemImg {
            width: 80px;
          }
          .itemDesc {
            flex-grow: 1;
            padding: 0.5rem 1rem;
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
          .itemRemove {
            .removeItem {
              background-color: rgb(255, 165, 165);
              cursor: pointer;
            }
          }
        }
      }
      .memberProfile {
        position: absolute;
        top: 60px;
        right: 0;
        background-color: $first-color-alt;
        white-space: nowrap;
        padding: 1rem;
        box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
        .logout {
          background-color: rgb(255, 165, 165);
          width: 100%;
          cursor: pointer;
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .logo {
    h1 {
      display: none;
    }
  }

  .navbar {
    position: relative;
    .menu-btn {
      display: block;
      width: 40px;
      z-index: 10;
    }
    .menu {
      display: none;
      position: absolute;
    }
    .menu-open {
      justify-content: space-evenly;
      text-align: center;
      padding: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      z-index: 11;
      height: 150px;
      top: 60px;
      left: 0;
      background-color: $first-color;
      opacity: 0.8;
      a {
        color: #ffffff;
      }
    }
    .profile {
      flex-grow: 0.1;
      .favorite,
      .shopping-cart,
      .member {
        z-index: 10;
        width: 3rem;
        padding: 0 10px;
        height: 60px;
        position: relative;
        .itemList {
          background-color: $first-color-alt;
          // border: 1px $first-color solid;
          position: absolute;
          top: 60px;
          right: 0;
          width: fit-content;
          padding: 0.5rem 1rem;
          white-space: nowrap;
          .itemList-content {
            align-items: center;
            display: flex;
            .itemImg {
              width: 80px;
            }
            .itemDesc {
              flex-grow: 1;
              padding: 0.5rem 1rem;
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
          }
        }
        .memberProfile {
          position: absolute;
          top: 60px;
          right: 0;
          background-color: $first-color-alt;
          white-space: nowrap;
          padding: 1rem;
        }
      }
    }
  }
}
</style>
