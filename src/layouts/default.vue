<template>
  <div class="wrapper">
    <d-sidebar />

    <div class="content">
      <d-header />

      <div class="content-main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import DSidebar from "@/components/Sidebar";
import DHeader from "@/components/Header";
export default {
  components: {
    DSidebar,
    DHeader,
  },
};
</script>

<style lang="scss" scoped>
</style>