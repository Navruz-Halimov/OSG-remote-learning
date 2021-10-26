<template>
    <nav class="breadcrumb custom-breadcrumb">
        <ul>
            <li v-for="(item, index) in menuList" :key="index" :class="{'is-active': !item.link}">
                <router-link v-if="item.link" :to="item.link">{{item.title}}</router-link>
                <router-link v-else to="#">{{item.title}}</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        props: {
            menuList: Array
        }
    }
</script>