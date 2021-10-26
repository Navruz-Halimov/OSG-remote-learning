<template>
  <!-- <div class="d-pagination"> -->
  <div
    class="d-pagination mt-2"
    :class="[{ 'justify-content-end ': right || null }]"
  >
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

    <div>value</div>
    <div>
      <pre>{{ value }}</pre>
    </div> -->

    <!-- page input -->
    <div class="d-pagination-input pl-2 mr-2">
      <input
        type="number"
        :value="value"
        @input="emitWithDebounce($event.target.value)"
        @focus="$refs.pageInputRef.select()"
        :readonly="loading || pending"
        ref="pageInputRef"
        @click="$refs.pageInputRef.select()"
      />
    </div>

    <div v-show="total > 1 && total > limit" class="mr-2">
      До {{ totalCount }}
    </div>

    <!-- prev button -->
    <div
      :class="[
        'd-pagination-btn d-pagination-btn-nav',
        { 'd-pagination-btn-disabled': value == 1 || loading || pending }
      ]"
      @click="emitPage(value - 1)"
    >
      <d-icon class="icon-rotate-180" icon="angle-right" />
    </div>

    <!-- next button -->
    <div
      :class="[
        'd-pagination-btn d-pagination-btn-nav',
        {
          'd-pagination-btn-disabled': value >= totalCount || loading || pending
        }
      ]"
      @click="emitPage(value + 1)"
    >
      <d-icon icon="angle-right" />
    </div>
  </div>
</template>

<script>
import DIcon from "@/components/icons/iconWrapper";

import debounce from "lodash/debounce";

export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    total: {
      // total count
      type: [Number, String],
      default: () => 0
    },
    limit: {
      // per page
      type: Number,
      default: () => 10
    },
    btnCount: {
      // size of slice
      type: [Number, String],
      default: () => 3
    },
    value: {
      // page number
      type: [Number, String],
      default: () => 1
    },
    navigate: {
      // use $router.push ?
      type: Boolean,
      default: () => false
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    right: {
      type: Boolean,
      default: () => false
    }
  },

  components: {
    DIcon
  },

  computed: {
    totalCount() {
      return Math.ceil((+this.total || 0) / (+this.limit || 10));
    }
  },

  methods: {
    emitWithDebounce: debounce(function(pageNumber) {
      this.emitPage(pageNumber);
    }, 600),
    emitPage(pageNumber) {
      this.pending = true;
      this.$refs.pageInputRef.select();

      if (+pageNumber <= 0 || +pageNumber > this.totalCount) {
        this.$emit("change", 1);
        this.$refs.pageInputRef.value = 1;
        this.$refs.pageInputRef.select();
        this.pending = false;
        return;
      }

      this.$emit("change", +pageNumber);
      this.$refs.pageInputRef.value = +pageNumber;

      if (this.navigate) {
        this.$router.push({
          query: {
            ...this.$router.query,
            page: +pageNumber
          }
        });
      }
      this.pending = false;
    }
  },

  data() {
    return {
      pending: false
    };
  }
};
</script>
