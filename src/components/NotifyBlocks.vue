<template>
    <div class="column is-one-quarter">
        <div class="card notify-card">
            <div class="notify-card-header">
                <!-- etot title bar dlya 'materiali' tab -->
                <p class="notify-card-header__title">
                    Тема № {{item}}
                </p>
                <div class="notify-card-header__item">
                    <d-icon icon="more" />
                </div>
            </div>
            <div class="notify-card-content">
                asf;malgkas;dgjn;alkdsnf aka;lfkna;l na ;alknf
                alknfg;lakns asfn l'nasnafnnan asnkflasfnafnafnasnasfna alk
                ;fna;lsfna;slknf ;asf;l asf; lan
            </div>
            <div class="notify-card-footer">
                <div class="notify-card-footer__number">
                    Получатели: {{ '25' }} человек
                </div>
                <div class="notify-card-footer__avatars">
                    <div class="notify-card-footer__avatars--item" v-for="(item, index) in sortedImages" :key="index">
                        <d-avatar cover :item="item" ></d-avatar>
                    </div>
                    <div class="notify-card-footer__avatars--item">
                        <d-icon icon="more" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import iconWrapper from "./icons/iconWrapper";
    import Avatar from "./Avatar";
    export default {
        props: ['item'],
        components: {
            'd-icon': iconWrapper,
            'd-avatar': Avatar,
        },
        data() {
            return {
                imageList: [
                    {
                        src: require('@/assets/images/IMG_26561.png'),
                        width: 41,
                        height: 41,
                    },
                    {
                        src: require('@/assets/images/HiA9GLT.jpg'),
                        width: 41,
                        height: 41,
                    },
                    {
                        src: require('@/assets/images/HiA9GLT.jpg'),
                        width: 41,
                        height: 41,
                    },
                    {
                        src: require('@/assets/images/HiA9GLT.jpg'),
                        width: 41,
                        height: 41,
                    },
                    {
                        src: require('@/assets/images/HiA9GLT.jpg'),
                        width: 41,
                        height: 41,
                    },
                    {
                        src: require('@/assets/images/HiA9GLT.jpg'),
                        width: 41,
                        height: 41,
                    },
                    {
                        src: require('@/assets/images/unnamed.jpg'),
                        width: 41,
                        height: 41,
                    }
                ],
            }
        },
        computed: {
            sortedImages() {
                // console.log('asfda');
                if (this.imageList.length > 5) {
                    let newList = this.imageList.slice(0, 5)
                    return newList
                }

                return this.imageList
            }
        },
        methods: {
            
        },
    }
</script>
