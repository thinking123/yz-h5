<template>
    <div class="layout">
        <index-loading-bar/>
        <music-bar class="music-bar"/>
        <router-view></router-view>
    </div>
</template>

<script>
    import IndexLoadingBar from "../IndexLoadingBar";
    import MusicBar from "../MusicBar";
    export default {
        name: "Layout",
        components: {MusicBar, IndexLoadingBar}
    }
</script>

<style scoped lang="scss">
    .layout{
        width: 100%;
        height: 100%;
        position: relative;

        .music-bar{
            position: absolute;
            top:26px;
            left: 333px;
            z-index: 3000;
        }
    }
</style>
