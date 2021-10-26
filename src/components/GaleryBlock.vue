<template>
    <div class="column is-3">
        <div class="card galery-card">
            <div class="galery-card__header" :style="`background-image: url(${galeryItem.picture});`">
                <div class="overlay"></div>
                <a class="galery-card__header--share" :href="galeryItem.shareLink">
                    <span> Поделиться </span>
                    <d-icon icon="share"></d-icon>
                </a>
                <a class="galery-card__header--play" :href="galeryItem.playLink">
                     <d-icon icon="play"></d-icon>
                </a>
            </div>
            <div class="galery-card__body">
                <span>{{galeryItem.title}}</span>
            </div>
        </div>
    </div>
</template>

<script>

import iconWrapper from "../components/icons/iconWrapper";
    export default {
        props: {
            galeryItem: {
                type: Object
            }
        },
        components: {
            'd-icon': iconWrapper,
        },
    }
</script>
