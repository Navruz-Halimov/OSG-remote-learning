export default {
  data() {
    return {
      page: 1,
      results: [],
      count: 0,
    };
  },

  computed: {
    $_pageOffset() {
      return (this.page || 1) * this.$_perPage - this.$_perPage;
    },

    $_perPage() {
      return +this.$route.query.limit || 10;
    },
  },
};
