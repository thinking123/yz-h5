<template>
    <div class="page-wrap">
        <img src="http://pnx7zyyrl.bkt.clouddn.com/yz-bg.png" class="bg"/>
        <img src="./yz-page-border.png" class="border" v-if="showBorder"/>
        <div id="flipbook" class="flipbook" ref="flipbook">
            <div class="hard">
                <img src="./yz-cover.png"/>
            </div>

            <div class="page page1" id="page1-left">
                <img src="./yz-left-page.png"/>
            </div>
            <div class=" page page1" id="page1">
                <img src="./yz-page1-page.png"/>
            </div>

            <div class="page page1" id="page2-left">
                <img src="./yz-left-page.png" id="page2"/>
            </div>
            <div class=" page page1">
                <img src="./yz-page1-page.png"/>
            </div>

            <div class="page page1" id="page3-left">
                <img src="./yz-left-page.png"/>
            </div>
            <div class=" page page1" id="page3">
                <img src="./yz-page1-page.png"/>
            </div>

            <div class="page page1" id="page4-left">
                <img src="./yz-left-page.png"/>
            </div>
            <div class=" page page1" id="page4">
                <img src="./yz-page3-page.png"/>
            </div>

            <div class="page page1" id="page5-left">
                <img src="./yz-left-page.png"/>
            </div>
            <div class=" page page1" id="page5">
                <img src="./yz-page3-page.png"/>
            </div>

            <div class="page page1" id="page6-left">
                <img src="./yz-left-page.png"/>
            </div>
            <div class=" page page1" id="page6">
                <img src="./yz-page3-page.png"/>
            </div>


        </div>
    </div>
</template>

<script>
    import Hammer from 'hammerjs'
    import {downLoadAllImg} from "../utils/common";
    import {mapGetters , mapMutations} from 'vuex'
    import '../turn'

    export default {
        name: "PageFlip",
        computed: {
            ...mapGetters(['url']),
            bg() {
                return `${this.url}yz-bg.png`;
            },
            showBorder(){
                console.log('showBorder' , this.page)
                return this.page > 1
            }
        },
        methods:{
          ...mapMutations(['setShowIndexLoadingBar' , 'setLoadingProgress']),
            async init(){
              try {
                  const base = this.url
                  const keys = [
                      'yz-cover-shadow',
                      'yz-music-btn',
                      'yz-share-btn',
                      'yz-qr',
                      'yz-cover-shadow',
                      'yz-cover',
                      'yz-page-border',
                      'yz-num-0',
                      'yz-num-1',
                      'yz-num-2',
                      'yz-num-3',
                      'yz-num-4',
                      'yz-num-5',
                      'yz-num-6',
                      'yz-num-7',
                      'yz-num-8',
                      'yz-num-9',
                      'yz-page1',
                      'yz-page2',
                      'yz-page3',
                      'yz-page4',
                      'yz-page5',
                      'yz-page6',
                      'yz-page1-left',
                      'yz-page2-left',
                      'yz-page3-left',
                      'yz-page4-left',
                      'yz-page5-left',
                      'yz-page6-left',
                      'yz-page6-btn',
                      'yz-share1-bg',
                      'yz-share2-bg',
                      'yz-share3-bg',
                      'yz-share4-bg',
                  ]
                  const urls = keys.map(key=>`${this.url}${key}.png`)
                  console.log('urls' , urls)
                  this.setShowIndexLoadingBar(true)
                  const images = await downLoadAllImg(urls , progress=>{
                      this.setLoadingProgress(Math.floor(progress/urls.length * 100) + '%')
                  })
              }catch (e) {
                  console.error('init' , e)
              }finally {
                  this.setShowIndexLoadingBar(false)
              }
            }
        },
        data(){
          return {
              page:1
          }
        },
        mounted() {

            this.init()
            const flipbook = this.$refs.flipbook

            this.manager = new Hammer.Manager(flipbook);
            const Swipe = new Hammer.Swipe();
            this.manager.add(Swipe);

            this.manager.on('swipe', function(e) {
                const direction = e.offsetDirection;

                if (direction === 4) {

                    $("#flipbook").turn('previous')
                    // console.log('you swipe' , direction)
                    // e.target.innerText =  deltaX;
                    // e.target.style.transform = translate3d;
                }else if(direction === 2){


                    $("#flipbook").turn('next')
                }
            });


            function px(v) {
                const pxTorem = window.innerWidth / 10
                const p = v / 37.5 * pxTorem
                console.log('p', p, pxTorem, v)
                return p
            }
            const that = this

            const w = 292 * 2, h = 526, pxTorem = window.innerWidth / 100
            console.log('pxTorem', pxTorem)
            this.book = $("#flipbook")
            this.book.turn({
                autoCenter: true,
                width:px(275*2),
                height:px(380),

                duration:2000,
                when:{
                    first: function(e, page, pageObject) {
                        // console.log('pxTorem page', e, page, pageObject)
                    },
                    turning: function(e, page, pageObject) {
                        // console.log('pxTorem page turning',  page,pageObject)

                        that.page = page

                        console.log('turning' , this.page)
                        if(page == 2){
                            $('#flipbook').turn('size', px(292*2), px(526));
                            console.log('add class')
                            $('#flipbook').addClass('inner-page');
                        }else if(page == 1){
                            console.log('add class')
                            $('#flipbook').turn('size', px(275*2), px(380));

                            $('#flipbook').removeClass('inner-page');
                        }


                    },
                    start: function(e, page, pageObject) {
                        // console.log('pxTorem page start', page, pageObject)
                        if(page.page == 1){

                        }
                        // if()
                    }

                }

            })

        }
    }
</script>

<style scoped lang="scss">

    .page-wrap {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;

        .bg {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }

        .border {
            position: absolute;
            width: 342px;
            height: 545px;
            left: 0;
            top: 33px;
        }

        .flipbook {
            position: absolute !important;
            border: 2px solid yellow;
            top: 43px !important;

            /*transform: translateX(42px-292px);   left: -250px;*/
            height: 380px;
            width: 275*2px;
            margin: 0 !important;
            transition: all 0.3 ease-in-out;
            left: -221px;

            .page {
                border: 2px solid red;
                height: 526px;
                width: 292px;

                > img {
                    width: 100%;
                    height: 100%;
                }
            }

            &.inner-page{
                height: 526px;
                width: 292*2px;
                left: -250px;
            }
        }

        .flipbook .shadow {
            box-shadow: 0 40px 100px green;
        }
    }
</style>