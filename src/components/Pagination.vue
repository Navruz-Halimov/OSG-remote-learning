<template>
  <!-- <div> -->
  <!-- <div>total</div>
    <div>
      <pre>{{ total || -1 }}</pre>
    </div>

    <div>limit</div>
    <div>
      <pre>{{ limit || -1 }}</pre>
    </div>

    <div>totalCount</div>
    <div>
      <pre>{{ totalCount }}</pre>
    </div>

    <div>btnCount</div>
    <div>
      <pre>{{ btnCount }}</pre>
    </div>

    <div>pagesSlice</div>
    <div>
      <pre>{{ pagesSlice }}</pre>
    </div> -->

  <!-- <div class="d-pagination"> -->
  <div class="d-pagination">
    <!-- prev button -->
    <div
      :class="[
        'd-pagination-btn d-pagination-btn-nav',
        { 'd-pagination-btn-disabled': (value == 1 || loading) },
      ]"
      @click="emitPage(value - 1)"
    >
      <d-icon class="icon-rotate-180" icon="angle-right" />
    </div>

    <!-- page number buttons -->
    <div
      :class="['d-pagination-btn', { active: +value == +item, 'd-pagination-btn-disabled': loading }]"
      :key="item"
      v-for="item in pagesSlice"
      @click="emitPage(item)"
    >
      {{ item }}
    </div>

    <!-- next button -->
    <div
      :class="[
        'd-pagination-btn d-pagination-btn-nav',
        { 'd-pagination-btn-disabled': (value >= totalCount || loading) },
      ]"
      @click="emitPage(value + 1)"
    >
      <d-icon icon="angle-right" />
    </div>
  </div>
</template>

<script>
import DIcon from "@/components/icons/iconWrapper";

export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    total: {
      // total count
      type: [Number, String],
      default: () => 0,
    },
    limit: {
      // per page
      type: Number,
      default: () => 10,
    },
    btnCount: {
      // size of slice
      type: [Number, String],
      default: () => 3,
    },
    value: {
      // page number
      type: [Number, String],
      default: () => -1,
    },
    navigate: {
      // use $router.push ?
      type: Boolean,
      default: () => false,
    },
    loading: {
      type: Boolean,
      default: () => false
    }
  },

  components: {
    DIcon,
  },

  computed: {
    totalCount() {
      return Math.ceil((+this.total || 0) / (+this.limit || 10));
    },

    pagesSlice() {
      const btnCount = parseInt(this.btnCount);
      const pageIndexNumber = parseInt(this.value ? this.value - 1 : 0);
      const buttonsCount = Array.from(
        { length: this.totalCount },
        (_, x) => x + 1
      );

      const offset = buttonsCount.length - this.value;

      if (offset < btnCount - 1) {
        // console.log('--', offset, btnCount);
        return buttonsCount
          .slice(buttonsCount.length - btnCount)
          .slice(0, btnCount);
      }

      if (pageIndexNumber > 0) {
        // console.log(2);
        const sliceOffset = this.value + btnCount;
        return buttonsCount
          .slice(pageIndexNumber - 1, sliceOffset)
          .slice(0, btnCount);
      }

      // console.log(3);

      return buttonsCount.slice(pageIndexNumber, pageIndexNumber + btnCount);
      // .splice( || 1, 0);
    },
  },

  methods: {
    emitPage(pageNumber) {
      if (pageNumber <= 0 || pageNumber > this.totalCount) {
        return;
      }

      this.$emit("change", pageNumber);

      if (this.navigate) {
        this.$router.push({
          query: {
            ...this.$router.query,
            page: pageNumber,
          },
        });
      }
    },
  },
};
</script>