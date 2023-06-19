<script setup></script>
<template>
<div class="headerBar">
    <div class="headerBar-content container">
        <div class="contact">聯絡方式</div>
        <div class="event">優惠方式</div>
    </div>
</div>
</template>
<style lang="scss" scoped>
.headerBar{
    width: 100%;
    padding: 1rem 0;
    background-color: $first-color-alt;
    border-bottom: 1px solid $first-color;
    .headerBar-content{
        color: $text-color-light;
        display: flex;
        justify-content: space-between;
    }
}
</style>
