<template>
    <div class="layout">
        <index-loading-bar/>
        <router-view></router-view>
    </div>
</template>

<script>
    import IndexLoadingBar from "../IndexLoadingBar";
    export default {
        name: "Layout",
        components: {IndexLoadingBar}
    }
</script>

<style scoped lang="scss">
    .layout{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>
