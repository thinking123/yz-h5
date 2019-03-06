<template>
    <div class="wrap">
        <div class="swipe-pre" @click="handlePre"/>
        <div class='swipe-time-wrap' ref="swipe-wrap">

        </div>
        <div class="swipe-next" @click="handleNext"/>
    </div>

</template>

<script>
    import {mapGetters} from 'vuex'
    import {px} from "../utils/common";

    export default {
        name: "SwipeYear",
        computed: {
            ...mapGetters(['images'])
        },
        methods: {
            handlePre() {
                const wrap = $(this.$refs['swipe-wrap'])
                // const pre = this.active > 0 ? wrap.children().eq(this.active - 1) : null;
                const cur = this.active >= 0 ? wrap.children().eq(this.active) : null;

                const pre = $(cur).prev()
                const next = $(cur).next()
                // const next = this.active < wrap.children().length - 1 ? wrap.children().eq(this.active + 1) : null;

                console.log('handlePre')
                if (pre.length > 0) {
                    this.active--
                    this.$emit('selected', this.active)
                    $(cur).removeClass('swipe-time-item-active').addClass('swipe-time-item-next')
                    $(pre).removeClass('swipe-time-item-next').addClass('swipe-time-item-active')
                    // next.removeClass('swipe-time-item-pre').addClass('swipe-time-item-active')
                }
            },
            handleNext() {
                console.log('handleNext')
                const wrap = $(this.$refs['swipe-wrap'])
                // const pre = this.active > 0 ? wrap.children().eq(this.active - 1) : null;
                const cur = this.active >= 0 ? wrap.children().eq(this.active) : null;
                // const next = this.active < wrap.children().length - 1 ? wrap.children().eq(this.active + 1) : null;
                const pre = $(cur).prev()
                const next = $(cur).next()
                if (next.length > 0) {
                    this.active++
                    this.$emit('selected', this.active)
                    $(next).removeClass('swipe-time-item-next').addClass('swipe-time-item-active')
                    $(cur).removeClass('swipe-time-item-active').addClass('swipe-time-item-pre')
                    // next.removeClass('swipe-time-item-pre').addClass('swipe-time-item-active')
                }
            }
        },
        data() {
            return {
                active: 0
            }
        },
        watch: {
            images(v) {
                if (v) {
                    const items = v.filter(f => f.key.indexOf('num') > -1)
                    const ref = this.$refs['swipe-wrap']
                    if (ref) {
                        items.forEach(item => {
                            const img = item.image
                            const key = item.key

                            img.id = key

                            $(img).addClass('swipe-time-item')
                            if (key.indexOf('0') > -1) {
                                $(img).addClass('swipe-time-item-active')
                            } else {
                                $(img).addClass('swipe-time-item-next')
                            }
                            // const res =$(img).clone()
                            $(img).clone(true).appendTo(ref);
                            // ref.appendChild(res)
                        })


                        this.active = 0
                    }
                }
            }
        },
    }
</script>
<style>

    .swipe-time-item {
        /*width: calpx(251-178);*/
        width: 100%;
        /*height: 101px;*/
        height: 100%;

        position: absolute;
        top:0;
        left: 0;
        transition: all 0.5s ease-in-out;

        /*border:1px solid seagreen;*/
    }

    .swipe-time-item-pre {
        transform: translateY(-100%);
    }

    .swipe-time-item-active {
        transform: translateY(0);
    }

    .swipe-time-item-next {
        transform: translateY(100%);
    }
</style>
<style scoped lang="scss">

    .wrap {
        width: calpx(251-178);
        height: 150px;
        position: absolute;
        overflow: hidden;

        .swipe-pre {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 27px;
            z-index: 1;
            /*border:1px solid red;*/
        }

        .swipe-next {
            width: 100%;
            height: 27px;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 1;
            /*border:1px solid red;*/
        }

        .swipe-time-wrap {
            height: 96px;
            width: 100%;
            position: absolute;
            overflow: hidden;
            top: 50%;
            transform: translateY(-50%);
            /*border:1px solid saddlebrown;*/
        }
    }


</style>