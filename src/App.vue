<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>

export default {
  mounted() {
    document.addEventListener("click", function (event) {
      // console.log('click detail', event.target.tagName);
      if (!event.target.classList.contains("custom-dropdown__trigger"))
        document.dispatchEvent(
          new CustomEvent("hello", {
            detail: { open: false },
          })
        );
    });
  },
};
</script>
