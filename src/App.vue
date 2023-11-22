<script setup lang="ts"></script>

<template>
  <div class="vx-main">
    <span>5</span>
    <span>3</span>
    <span>1</span>
  </div>
</template>
<style lang="scss">
@import "./styles/namespace.scss";
.#{$vx-prefix}-main {
  @include flex(start);

  color: var(--theme-color);
}
</style>
