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
                        let i = 0;
                        items.forEach(item => {

                            const div = document.createElement("div");
                            // div.style.width = '100%'
                            // div.style.height = '100%'
                            const img = item.image
                            const key = item.key

                            div.id = key

                            $(div).addClass('swipe-time-item')
                            if (key.indexOf('0') > -1) {
                                $(div).addClass('swipe-time-item-active')
                            } else {
                                $(div).addClass('swipe-time-item-next')
                            }

                            const cls = `swipe-time-image${i}`
                            $(img).addClass(cls)
                            $(img).addClass('swipe-time-image')
                            // const res =$(img).clone()
                            $(img).clone(true).appendTo(div);
                            ref.appendChild(div)
                            // ref.appendChild(res)

                            i += 1
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

    .swipe-time-image{
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
    .swipe-time-image0{
        width: 56px;
        height: 58px;
    }
    .swipe-time-image1{
        width: 48px;
        height: 76px;
    }
    .swipe-time-image2{
        width: 59px;
        height: 67px;
    }
    .swipe-time-image3{
        width: 51px;
        height: 82px;
    }
    .swipe-time-image4{
        width: 59px;
        height: 80px;
    }
    .swipe-time-image5{
        width: 48px;
        height: 82px;
    }
    .swipe-time-image6{
        width: 46px;
        height: 67px;
    }
    .swipe-time-image7{
        width: 50px;
        height: 72px;
    }
    .swipe-time-image8{
        width: 48px;
        height: 67px;
    }
    .swipe-time-image9{
        width: 55px;
        height: 79px;
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