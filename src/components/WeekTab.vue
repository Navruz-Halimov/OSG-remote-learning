<template>
    <div :class="['week-tabs', {'blocked': readOnly}]">
        <div :class="['week-tabs__item', { 'active': CheckDay(index) }]" v-for="(item, index) in weekDays" :key="index" @click="Select(index)">
            <span class="week-tabs__item--text">{{item.text}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            readOnly: Boolean,
            multiple: Boolean 
        },
        data() {
            return {
                today: 0,
                weekDays: [
                    {
                        text: 'Пн'
                    },
                    {
                        text: 'Вт'
                    },
                    {
                        text: 'Ср'
                    },
                    {
                        text: 'Чт'
                    },
                    {
                        text: 'Пт'
                    },
                    {
                        text: 'Сб'
                    },
                ],
                selected: []
            }
        },

        mounted() {
            let d = new Date()

            this.today = d.getDay() - 1
        },

        computed: {
        },

        methods: {
            Select(index) {
                if(this.multiple) {
                    if(!this.selected.includes(index)) {
                        this.selected.push(index)
                        return
                    }
                    let itemIndex = this.selected.indexOf(index)
                    this.selected.splice(itemIndex, 1);
                    return
                }
                this.today = index
            },

            CheckDay(index) {
                if(this.multiple) {
                    return this.selected.includes(index)
                }
                return this.today == index
            }
        },
    }
</script>