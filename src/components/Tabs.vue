<template>
    <ul class="custom-tabs">
        <li 
            :class="{'is-active': tab == item.tab}" 
            v-for="item in tabList" 
            :key="item.tab"
            @click="onTabClick(item.tab)"
        >
            <a>
                <!-- <span class="icon is-small"><i class="fas fa-image" aria-hidden="true"></i></span> -->
                <span>{{item.title}}</span>
            </a>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            tabList: {
                type: Array
            }
        },
        data() {
            return {
                tab: 1
            }
        },
        methods: {
            onTabClick(tab) {
                this.tab = tab
                this.$emit('tab',tab)
            }
        },
    }
</script>