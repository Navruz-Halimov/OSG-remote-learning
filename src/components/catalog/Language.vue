<template>
    <div>
        <d-lists >
            <template #header>
                <div class="columns">
                    <div class="column is-6" > Название</div>
                    <div class="column is-4" > Кор. Название</div>
                    <div
                        class="column pr-0 is-2 has-text-centered flex-row justify-content-end"
                    >
                        <button class="add-btn icon-btn" @click="openModal = !openModal">
                            <d-icon icon="accordion_plus" />
                            <span>
                                Добавить
                            </span>
                        </button>
                    </div>
                </div>
            </template>
            <template #content >
                <div
                    v-for="(item, index) in list"
                    :key="index"
                    class="directory__list--item"
                >
                    <div class="columns">
                        <div class="column is-6" >{{ item.name }}</div>
                        <div class="column is-4" >{{ item.code }}</div>
                        <div class="column is-2 directory__list--item__icons">
                            <div >
                                <d-icon icon="teacher-pen" @click.native.prevent="onEditClick(item)"/>
                            </div>
                            <div>
                                <d-icon icon="bin" @click.native.prevent="onDeleteClick(item)"/>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </d-lists>
        <d-modal 
            :seen="openModal" 
            size="small"
            :title="`Добавить ${title}`" 
            @closemodal="openModal = false"
        >
            <div class="add-group-modal">
                <div >
                    <div class="custom-title mt-0">
                        Название
                    </div>
                    <input 
                        class="grey rounded" 
                        placeholder="Введите текст"
                        v-model="form.name"
                    >
                </div>
                <div >
                    <div class="custom-title mt-3">
                        Кор. Название
                    </div>
                    <input 
                        class="grey rounded" 
                        placeholder="Введите текст"
                        v-model="form.code">
                </div>
                <d-button 
                    class="directory__modal-btn"
                    @click="createOrUpdate" 
                    color="blue"
                    :disabled="requesting"
                    rounded
                    text="Сохранить"
                >
                </d-button>
            </div>
        </d-modal>
    </div>
</template>

<script>
    export default {
        props: {
            list: {
                type: Array
            },
            title: {
                type: String
            }
        },
        watch: {
            '$parent.openModal': {
                handler(newVal) {
                    if(!newVal) {
                        this.openModal =false
                    }
                }
            },
            '$parent.requesting': {
                handler(newVal) {
                    console.log('iwladiii',newVal);
                    if(!newVal) this.requesting =false
                }
            },
            openModal: {
                handler(newVal) {
                    if(!newVal) {
                        this.form = {}
                        this.form = {
                            name: '',
                            id: null
                        }
                        // console.log('adadasdas', newVal);
                    }
                }
            },
        },
        data() {
            return {
                openModal: false,
                requesting: false,
                form: {
                    name: '',
                    id: null
                }
            }
        },
        components: {
            "d-lists": () => import("@/components/Lists"),
            "d-icon": () => import("@/components/icons/iconWrapper"),
            // "d-input": () => import("@/components/inputs/input"),
            "d-button": () => import("@/components/buttons/loaderButton"),
            "d-modal": () => import("@/components/Modal"),
            // "d-select": () => import("@/components/inputs/select"),
        },
        methods: {
            onDeleteClick(item) {
                this.$emit('deleteItem', item.id)
            },
            createOrUpdate() {
                let newForm = {}
                for (let item in this.form) {
                    console.log("object", item, this.form[item]);
                    if(this.form[item])
                        newForm[item] =  this.form[item]
                }
                this.$emit('createOrUpdate', {
                    name: JSON.stringify({"ru":"рус", "uz":"rus"})
                })
            },
            onEditClick(item) {
                this.openModal = true
                for(let elem in this.form) {
                    this.form[elem] = JSON.parse(JSON.stringify(item[elem]))
                }
            },
        },
    }
</script>

<style lang="scss">

</style>