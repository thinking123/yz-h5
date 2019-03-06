<template>
    <div class="wrap" @click="handleNext">

    </div>
</template>

<script>
    export default {
        name: "NextButton",
        methods: {
            handleNext() {
                this.$emit('next')
            }
        },
    }
</script>

<style scoped lang="scss">
.wrap{
    width: calpx(235-139);
    height: calpx(518-481);
    /*border: 1px solid red;*/
}
</style>