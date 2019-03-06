<template>
    <div class="page-wrap">
        <div class="bg" ref="bg">

        </div>
        <!--<img src="http://pnx7zyyrl.bkt.clouddn.com/yz-bg.png" ref="bg-img" class="clip-img"/>-->
        <div class="border" ref="page-border" v-show="showBorder">

        </div>
        <div id="flipbook" class="flipbook" ref="flipbook">
            <div class="hard" ref="cover">

            </div>

            <div class="page page1" ref="page1-left">

            </div>
            <div class=" page page1" ref="page1">

            </div>

            <div class="page page1" ref="page2-left">

            </div>
            <div class=" page page1" ref="page2">

            </div>

            <div class="page page1" ref="page3-left">

            </div>
            <div class=" page page1" ref="page3">

            </div>

            <div class="page page1" ref="page4-left">

            </div>
            <div class=" page page1" ref="page4">

            </div>

            <div class="page page1" ref="page5-left">

            </div>
            <div class=" page page1" ref="page5">

            </div>

            <div class="page page1" ref="page6-left">

            </div>
            <div class=" page page1" ref="page6">
                <div class="page6-photo" ref="page6-photo">
                    <input ref="file" type="file" @change="handleChangePhoto"/>
                    <!--<img :src="photeImg" ref="img" v-if="photeImg"/>-->
                </div>
                <div @click="handleCreate" ref="page6-btn" class="page6-btn">

                </div>
                <swipe-year @selected="handleSelectedTen" class="swipe-year-ten"/>
                <swipe-year @selected="handleSelectedUnit" class="swipe-year-unit"/>
            </div>


        </div>
        <div class="clip-broad" v-show="showClip" ref="clip-broad">

        </div>
    </div>
</template>

<script>
    import Hammer from 'hammerjs'
    import Cropper from 'cropperjs'
    import {downLoadAllImg, loadImg} from "../utils/common";
    import {mapGetters, mapMutations} from 'vuex'
    import '../turn'
    import SwipeYear from "../components/SwipeYear";

    export default {
        name: "PageFlip",
        components: {SwipeYear},
        computed: {
            ...mapGetters(['url', 'keys']),
            bg() {
                return `${this.url}yz-bg.png`;
            },
            showBorder() {
                console.log('showBorder', this.page)
                return this.page > 1
            }
        },
        methods: {
            ...mapMutations(['setShowIndexLoadingBar', 'setLoadingProgress', 'setImages']),
            handleSelectedTen(selected){
              console.log("handleSelectedTen" , selected)
            },
            handleSelectedUnit(selected){
                console.log("handleSelectedUnit" , selected)
            },
             async handleChangePhoto() {
                try {
                    this.showClip = true
                    const file = this.$refs.file.files[0]
                    // const clip = this.$refs['clip-broad']
                    const clip = this.$refs['page6-photo']
                    const img = await loadImg(file)
                    // img.style.width = '100%'
                    // img.style.height = '100%'
                    $(img).addClass('clip-img')
                    console.log(img)
                    clip.appendChild(img)

                    // let $image = $(img);
                    // $image.cropper({
                    //     aspectRatio: 16 / 9,
                    //     crop: function(event) {
                    //         console.log(event.detail.x);
                    //         console.log(event.detail.y);
                    //         console.log(event.detail.width);
                    //         console.log(event.detail.height);
                    //         console.log(event.detail.rotate);
                    //         console.log(event.detail.scaleX);
                    //         console.log(event.detail.scaleY);
                    //     }
                    // });
                    // let cropper = $image.data('cropper');
                    // console.log('cropper' , cropper)
                    // let mg = this.$refs['bg-img']
                    // console.log(mg)
                    // new Cropper(
                    //     mg,
                    //     {
                    //         viewMode: 1,
                    //         zoomable:false,
                    //         crop(event) {
                    //             console.log(event.detail.x);
                    //             console.log(event.detail.y);
                    //             console.log(event.detail.width);
                    //             console.log(event.detail.height);
                    //             console.log(event.detail.rotate);
                    //             console.log(event.detail.scaleX);
                    //             console.log(event.detail.scaleY);
                    //         },
                    //     }
                    //
                    //     )
                    // this.$nextTick(() => {
                    //     new Cropper(img,
                    //         {
                    //             viewMode: 1,
                    //             zoomable:false
                    //         })
                    // })
                    // new Cropper(img)

                } catch (e) {
                    console.error('clip', e)
                }
            },
            handleCreate() {


            },
            async init() {
                try {
                    const urls = this.keys.map(key => `${this.url}${key}.png`)
                    console.log('urls', urls)
                    this.setShowIndexLoadingBar(true)
                    const images = await downLoadAllImg(urls, progress => {
                        this.setLoadingProgress(Math.floor(progress / urls.length * 100) + '%')
                    })

                    this.setImages(images)

                    this.initImage(images)
                    this.initBook()
                } catch (e) {
                    console.error('init', e)
                } finally {
                    this.setShowIndexLoadingBar(false)
                }
            },
            initImage(images) {
                const ref = this.$refs
                images.forEach(({key, image}) => {
                    const dom = ref[key]
                    if (dom) {
                        image.style.width = '100%'
                        image.style.height = '100%'
                        dom.appendChild(image)

                    } else {
                        // console.error(' exit dom' , key)
                    }
                })
            },
            initBook() {
                const flipbook = this.$refs.flipbook

                this.manager = new Hammer.Manager(flipbook);
                const Swipe = new Hammer.Swipe();
                this.manager.add(Swipe);

                this.manager.on('swipe', function (e) {
                    const direction = e.offsetDirection;

                    if (direction === 4) {

                        $("#flipbook").turn('previous')
                        // console.log('you swipe' , direction)
                        // e.target.innerText =  deltaX;
                        // e.target.style.transform = translate3d;
                    } else if (direction === 2) {


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
                    width: px(275 * 2),
                    height: px(380),

                    duration: 2000,
                    when: {
                        first: function (e, page, pageObject) {
                            // console.log('pxTorem page', e, page, pageObject)
                        },
                        turning: function (e, page, pageObject) {
                            // console.log('pxTorem page turning',  page,pageObject)

                            that.page = page

                            console.log('turning', this.page)
                            if (page == 2) {
                                $('#flipbook').turn('size', px(292 * 2), px(526));
                                console.log('add class')
                                $('#flipbook').addClass('inner-page');
                            } else if (page == 1) {
                                console.log('add class')
                                $('#flipbook').turn('size', px(275 * 2), px(380));

                                $('#flipbook').removeClass('inner-page');
                            }


                        },
                        start: function (e, page, pageObject) {
                            // console.log('pxTorem page start', page, pageObject)
                            if (page.page == 1) {

                            }
                            // if()
                        }

                    }

                })
            }
        },
        data() {
            return {
                page: 1,
                images: null,
                photeImg: null,
                showClip: false
            }
        },
        mounted() {

            this.init()


        }
    }
</script>
<style>
    .clip-img {
        height: 100%;
        max-width: 100% !important;
    }

    .page6-photo-img {
        height: 100%;
        width: 100%;
        left: 0;
        position: absolute;
        background-color: white;
    }
</style>
<style scoped lang="scss">


    .page-wrap {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;

        .clip-broad {
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 2000;
            background-color: white;
            /*opacity: 0.5;*/
        }

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
            /*border: 2px solid yellow;*/
            top: 43px !important;

            /*transform: translateX(42px-292px);   left: -250px;*/
            height: 380px;
            width: 275*2px;
            margin: 0 !important;
            transition: all 0.3 ease-in-out;
            left: -221px;

            .page {
                /*border: 2px solid red;*/
                height: 526px;
                width: 292px;

                > img {
                    width: 100%;
                    height: 100%;
                }
            }

            &.inner-page {
                height: 526px;
                width: 292*2px;
                left: -250px;
            }


            .page6-photo {
                position: absolute;
                top: #{323-43}px;
                left: #{137-43}px;
                height: 108px;
                width: 108px;
                border-radius: 108px;
                /*border: 1px solid red;*/
                overflow: hidden;

                input {
                    position: relative;
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 2000;
                }


            }

            .swipe-year-ten{
                position: absolute;
                top: #{131-43}px;
                left: #{113-43}px;
                z-index: 2;
            }
            .swipe-year-unit{
                position: absolute;
                top: #{131-43}px;
                left: #{185-43}px;
                z-index: 2;
            }
            .page6-btn {
                position: absolute;
                top: calpx(517-43);
                left: calpx(135-43);
                height: calpx(537-517);
                width: calpx(235-135);
                border-radius: 10px;
                /*border: 1px solid red;*/
            }
        }

        .flipbook .shadow {
            box-shadow: 0 40px 100px black;
        }
    }
</style>