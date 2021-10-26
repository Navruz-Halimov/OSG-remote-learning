<template>
    <div>
        <d-lists >
            <template #header>
                <div class="columns">
                    <div class="column is-6" > Название</div>
                    <div class="column is-4" > Язык</div>
                    <div
                        class="column pr-0 is-2 has-text-centered flex-row justify-content-end"
                    >
                        <button class="add-btn icon-btn" @click="onCreateClick">
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
                        <div class="column is-6" >{{ item && item.name[mainLang] || 'Нет названия' }}</div>
                        <div class="column is-4" >{{ mainLang || 'Нет данных' }}</div>
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
            @closemodal="openModal = false, isEditing = false"
        >
            <div class="add-group-modal">
                <d-input 
                    class="grey rounded" 
                    placeholder="Введите текст"
                    v-model="form.name[currLang]"
                ></d-input>
                <div class="lang-row">
                    <div class="lang-row__item" v-for="(item, index) in langOptions" :key="item.code" @click="onLangClick(item)">
                        <div class="lang-row__item__circle" v-if="item.code != currLang">
                            {{index + 1}}
                        </div>
                        <d-icon v-else icon="check" />
                        <div class="lang-row__item__code">
                            {{item.code}}
                        </div>
                    </div>
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
            },
            createResponse: {
                type: [Object, Array]
            }
        },
        watch: {
            '$parent.openModal': {
                handler(newVal) {
                    if(!newVal) {
                        if(this.isEditing) {
                            this.isEditing = false
                        }

                        this.openModal = false
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
                            name: {},
                            id: null
                        }
                        this.getLists()
                        // console.log('adadasdas', newVal);
                    }
                }
            },
        },
        mounted() {
            this.getLists()
        },
        data() {
            return {
                currLang: 'ru',
                mainLang: 'ru',
                
                // selectedObjList: [],
                // isCreating: false,
                isEditing: false,
                openModal: false,
                // fetching: false,
                requesting: false,
                form: {
                    name: {},
                    id: null
                },
                langOptions: [],
            }
        },
        components: {
            "d-lists": () => import("@/components/Lists"),
            "d-icon": () => import("@/components/icons/iconWrapper"),
            "d-input": () => import("@/components/inputs/input"),
            "d-button": () => import("@/components/buttons/loaderButton"),
            "d-modal": () => import("@/components/Modal"),
            // "d-loader": () => import("@/components/loaders/spinner"),
            // "d-select": () => import("@/components/inputs/select"),
        },
        methods: {
            onCreateClick() {
                // if(!this.langOptions.length) {
                //     this.$emit('enterLang')
                //     return
                // }
                this.isEditing = true
                this.openModal = true
            },
            onLangClick(langItem) {
                this.currLang = langItem.code
            },
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
                this.$emit('createOrUpdate', newForm)
            },
            getLists() {
                this.$store.dispatch(`catalog/get`, "language")
                    .then((res) => {
                        if(res.results && res.results.length) {
                            this.langOptions = res.results
                            this.currLang = this.langOptions[0].code
                            this.mainLang = this.langOptions[0].code
                            for(let item of this.langOptions) {
                                this.form.name = {
                                    ...this.form.name,
                                    [item.code]: '',
                                }
                            }
                        }
                    })
            },
            onEditClick(item) {
                this.openModal = true
                this.isEditing = true

                const langPrefixes = this.langOptions.map( item => item.code )

                for(let elem in this.form) {
                    this.form[elem] =  JSON.parse(JSON.stringify(item[elem]))
                }

                langPrefixes.forEach( lang => {
                  if(!(lang in this.form.name)) {
                      this.form.name[lang] = ''
                  }
                })
            },
        },
    }
</script>

<style lang="scss">
.lang-row {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;

    &::after {
        content: "";
        position: absolute;
        top: 16px;
        bottom: 0;
        left: 0;
        right: 0;
        border-top: 1px dashed #BDC7D8;
        z-index: -1;
    }

    &__item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;

        svg {
            fill: $blue;
            width: 32px;
            height: 32px;
            background-color: white;
        }

        &__circle {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            background-color: #e4e9f1;
            border-radius: 50%;
            text-align: center;
            cursor: pointer;
    
            // &.active {
    
            // }
        }

        &__code {
            margin-top: 5px;
            color: #9aa6bb;
            text-transform: capitalize;
        }
    }
}
</style>