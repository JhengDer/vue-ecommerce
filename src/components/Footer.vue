<script setup>
const email = ref("");
</script>
<template>
  <n-divider></n-divider>
  <div class="container">
    <n-grid cols="1 600:2">
      <n-grid-item>
        <n-space justify="space-around" size="large">
          <n-space vertical>
            <h4>公司簡介</h4>
            <p>關於XX</p>
            <p>時尚博主</p>
            <p>社會責任</p>
            <p>職業生涯</p>
          </n-space>
          <n-space vertical>
            <h4>常見問題</h4>
            <p>實名認證</p>
            <p>尺碼指南</p>
            <p>如何訂購</p>
            <p>追蹤訂單</p>
            <p>物流資訊</p>
            <p>退貨</p>
            <p>退款</p>
            <p>XX VIP</p>
          </n-space>
          <n-space vertical>
            <h4>客戶服務</h4>
            <p>聯絡我們</p>
            <p>支付方式</p>
            <p>積分獎勵</p>
          </n-space>
        </n-space>
      </n-grid-item>
      <n-grid-item>
        <n-space vertical>
          <h4>訂閱電子報</h4>
          <p>訂閱電子報，搶先了解新品速遞，熱賣品補貨及優惠資訊!</p>
          <n-input-group>
            <n-input
              v-model:value="email"
              type="text"
              placeholder="基本的 Input"
            />
            <n-button>訂閱</n-button>
          </n-input-group>
          <p>付款方式/接受的付款類型</p>
          <n-space class="payway">
            <SvgIcons name="IconVisa" class="svg-small-icon" color="white" />
            <SvgIcons name="IconPaypal" class="svg-small-icon" color="white" />
            <SvgIcons name="IconJcb" class="svg-small-icon" color="white" />
          </n-space>
        </n-space>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style scoped>
p {
  margin: 0;
}
</style>
