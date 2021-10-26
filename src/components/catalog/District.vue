<template>
    <div>
        
        
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
                currLang: '',
                mainLang: '',
                
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
            // "d-lists": () => import("@/components/Lists"),
            // "d-icon": () => import("@/components/icons/iconWrapper"),
            // "d-input": () => import("@/components/inputs/input"),
            // "d-button": () => import("@/components/buttons/loaderButton"),
            // "d-modal": () => import("@/components/Modal"),
            // "d-loader": () => import("@/components/loaders/spinner"),
            // "d-select": () => import("@/components/inputs/select"),
        },
        methods: {
            onCreateClick() {
                if(!this.langOptions.length) {
                    this.$emit('enterLang')
                    return
                }
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

</style>