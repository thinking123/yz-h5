<template>
    <div class="swiper-year">
        <div class="swipe-pre  swiper-button-prev " @click="pre"
        ></div>
        <swiper class="swipe-time-wrap " :options="swiperOption"   ref="mySwiper"
                @slideChange="handleChange">
            <swiper-slide class="swipe-time-wrap" v-for="(url, index) in urls" :key="index">
                <div class="swipe-time-item ">
                    <img :src="url.u" :class="url.cs"/>
                </div>
            </swiper-slide>

        </swiper>
        <div class="swipe-next swiper-button-next"  @click="next"></div>


    </div>


</template>

<script>
    import {mapGetters} from 'vuex'
    import {px} from "../utils/common";
    import Hammer from 'hammerjs'
    // import Swiper from 'swiper'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        name: "SwipeYear",
        computed: {
            ...mapGetters(['images' , 'url']),
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        methods: {
            handleChange(e){
                this.$emit('selected',   this.$refs.mySwiper.swiper.activeIndex)

            },
            pre(){
                this.swiper.slidePrev()
            },
            next(){
                this.swiper.slideNext()
            }
        },
        props: {
            cls: {
                type: String
            },
        },
        mounted(){

            for(let i = 0 ; i< 10 ; i++){
                const u = `${this.url}yz-num-${i}.png`
                const cs = `swipe-time-image${i}`
                this.urls.push({
                    u,
                    cs
                })
            }
        },
        data() {
            return {
                active: 0,
                urls:[],
                swiperOption: {
                    direction: 'vertical', // 垂直切换选项
                    loop: true,

                }
            }
        }
    }
</script>
<style scoped>

    .swiper-wrapper > div{
        width: 100%;
        /*height: 101px;*/
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .swipe-time-item {
        /*width: calpx(251-178);*/
        width: 100%;
        /*height: 101px;*/
        height: 100%;

        /*position: absolute;*/
        top:0;
        left: 0;
        transition: all 0.5s ease-in-out;

        display: flex;
        align-items: center;
        justify-content: center;
        /*border:1px solid seagreen;*/
    }

    .swipe-time-item-pre {
        /*transform: translateY(-100%);*/
    }

    .swipe-time-item-active {
        transform: translateY(0);
    }

    .swipe-time-item-next {
        /*transform: translateY(100%);*/
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

    .swiper-year {
        width: calpx(251-178);
        height: 150px;
        position: absolute;
        overflow: hidden;
        .swipe-pre {
            /*position: absolute;*/
            top: 0;
            left: 0;
            width: 100%;
            height: 27px;
            z-index: 1;
            transform: translateY(-0%);
            /*border:1px solid red;*/
        }

        .swipe-next {
            width: 100%;
            height: 27px;
            /*position: absolute;*/
            bottom: 0;
            left: 0;
            z-index: 1;
            transform: translateY(0%);
            /*border:1px solid red;*/
        }

        .swipe-time-wrap {
            /*margin: 27px 0 ;*/
            height: 96px;
            width: 100%;
            /*position: absolute;*/
            overflow: hidden;
            top: 50%;
            /*border:1px solid saddlebrown;*/
        }
    }


</style>