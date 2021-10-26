<template>
    <div class="card search-card">
        <div class="search-card-header">
            <div class="columns">
                <div class="column">
                    Регион
                </div>
                <div class="column">
                    Район
                </div>
                <div class="column">
                    Организация
                </div>
                <div class="column is-1">
                </div>
                <div class="column is-1">
                </div>
            </div>
        </div>
        <div class="search-card-body">
            <div class="columns">
                <div class="column">
                    <d-select 
                        class="grey rounded" 
                        placeholder="Введите текст" 
                        :options="options"
                        label="title"
                        v-model="id"
                        :reduce="item => item.id"
                    ></d-select>
                </div>
                <div class="column">
                    <d-select 
                        class="grey rounded" 
                        placeholder="Введите текст" 
                        :options="options" 
                        label="title"
                        v-model="id"
                        :reduce="item => item.id"
                    ></d-select>
                </div>
                <div class="column">
                    <d-select 
                        class="grey rounded" 
                        placeholder="Введите текст" 
                        :options="options" 
                        label="title"
                        v-model="id"
                        :reduce="item => item.id"
                    ></d-select>
                </div>
                <div class="column is-1">
                    <d-button color="custom-btn-info is-link" @click="clickArrow">
                        <d-icon icon="left-arrow"></d-icon>
                    </d-button>
                </div>
                <div class="column is-1">
                    <d-button color="custom-btn-info is-link" @click="clickSearch">
                        <d-icon icon="search"></d-icon>
                    </d-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Select from './inputs/select'
    import loaderButton from './buttons/loaderButton'
    import iconWrapper from './icons/iconWrapper'
    export default {
        components: {
            'd-select': Select,
            'd-button': loaderButton,
            'd-icon': iconWrapper
        },
        data() {
            return {
                id: 1,
                options: [
                    {
                        title: 'lyuboy',
                        id: 1,
                    },
                    {
                        title: 'big_master',
                        id: 2,
                    },
                    {
                        title: 'Zikoi5',
                        id: 3,
                    },
                    {
                        title: 'hhexio',
                        id: 4,
                    },
                ],
            }
        },
        methods: {
            clickArrow() {

            },

            clickSearch() {
                
            }
        },
    }
</script>

<style lang="scss">
    .card {
        &.search-card {
            padding: $paddingCards;
            border-radius: 4px;
            .search-card-header {

            }

            .search-card-body {
                button {
                    width: 100%;

                    svg {
                        fill: white;
                        stroke: white;
                        height: 15px;
                    }
                }
            }
        }
    }
</style>