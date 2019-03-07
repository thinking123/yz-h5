<template>
    <div class="loading-bar" @touchstart="touch" v-if="loading">
        <spinner type="fading-circle" class="center" color="rgb(38, 162, 255);">

        </spinner>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import { Spinner } from 'mint-ui';
    export default {
        name: "LoadingBar",
        components:{Spinner},
        computed: {
            ...mapGetters(['loading'])
        },
        methods: {
            touch(e) {
                e.preventDefault()
                e.stopPropagation()
            }
        },
    }
</script>

<style scoped>
.loading-bar{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 9999;
}
.center{
    position: absolute;

    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
}
</style>