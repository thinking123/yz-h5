<template>
    <div class="page-wrap" >
        <div class="bg" ref="bg">

        </div>
        <!--<img src="http://pnx7zyyrl.bkt.clouddn.com/yz-bg.png" ref="bg-img" class="clip-img"/>-->
        <div class="border" ref="page-border" v-show="showBorder">

        </div>
        <div id="flipbook" class="flipbook center-page" ref="flipbook">
            <div class="hard" ref="cover">

            </div>

            <div class="page page1" ref="page1-left">

            </div>
            <div class=" page page1" ref="page1">
                <next-button @next="handleNext" class="next1"/>
            </div>

            <div class="page page1" ref="page2-left">

            </div>
            <div class=" page page1" ref="page2">
                <next-button @next="handleNext" class="next2"/>
            </div>

            <div class="page page1" ref="page3-left">

            </div>
            <div class=" page page1" ref="page3">
                <next-button @next="handleNext" class="next3"/>
            </div>

            <div class="page page1" ref="page4-left">

            </div>
            <div class=" page page1" ref="page4">
                <next-button @next="handleNext" class="next4"/>
            </div>

            <div class="page page1" ref="page5-left">

            </div>
            <div class=" page page1" ref="page5">
                <next-button @next="handleNext" class="next5"/>
            </div>

            <div class="page page1" ref="page6-left">

            </div>
            <div class=" page page1" ref="page6">

                <div class="page6-photo" ref="page6-photo">
                    <img :src="photoHead" class="photo-head" />
                    <input ref="file" type="file" @change="handleChangePhoto"/>
                    <img :src="clipDataBase64" ref="img" v-if="clipDataBase64" class="preview"/>
                </div>
                <div @click="handleCreate" ref="page6-btn" class="page6-btn">

                </div>
                <swipe-year @selected="handleSelectedTen" class="swipe-year-ten"/>
                <swipe-year @selected="handleSelectedUnit" class="swipe-year-unit"/>

                <div class="input-wrap">
                    <div class="line1">
                        <div>
                            我在
                        </div>
                        <input type="text" v-model="inputCity"
                               placeholder=" (填写你所在城市)"/>
                    </div>
                    <div class="line2">
                        我为邮储女性代言
                    </div>
                </div>
            </div>


        </div>
        <section v-show="showClip" ref="clip-broad" class="clip-broad">
            <div class="edit-box" ref="edit-box">

            </div>

            <div class="btn-wrap">
                <div class="btn cancel" @click="handleNot">取消</div>
                <div class="btn done" @click="handleOk">完成</div>
            </div>

        </section>
    </div>
</template>

<script>
    import Hammer from 'hammerjs'
    // import Cropper from 'cropperjs'
    import {downLoadAllImg, loadImg , px} from "../utils/common";
    import {mapGetters, mapMutations} from 'vuex'
    import '../turn'
    import SwipeYear from "../components/SwipeYear";
    import NextButton from "../components/NextButton";

    export default {
        name: "PageFlip",
        components: {NextButton, SwipeYear},
        computed: {
            ...mapGetters(['url', 'keys']),
            bg() {
                return `${this.url}yz-bg.png`;
            },
            photoHead() {
                return `${this.url}yz-page6-head-wrap.png`;
            },
            showBorder() {
                console.log('showBorder', this.page)
                return this.page > 1
            }
        },
        methods: {
            ...mapMutations(['setShowIndexLoadingBar', 'setLoadingProgress', 'setImages' , 'setHead','setIsShare']),

            handleSelectedTen(selected){
                this.ten = selected
              console.log("handleSelectedTen" , selected)
            },
            handleSelectedUnit(selected){
                this.unit = selected
                console.log("handleSelectedUnit" , selected)
            },
            handleNext(){
                $("#flipbook").turn('next')
            },
            handleNot(){
                this.showClip = false
            },
            handleOk(){

                const $image = $(document.getElementById('clipImage'))
                var result = $image.cropper('getCroppedCanvas', {
                    width: 1280,
                    height: 1280
                });
                this.clipDataBase64 = result.toDataURL()

                console.log(' this.clipDataBase64' ,  this.clipDataBase64)

                this.showClip = false
            },
            edit(){
                // var winW = 5.6 * 37.5;
                var winW = px(328/2);

                console.log('winW' , winW)
                var options = {
                    viewMode: 3,
                    dragMode: 'crop',

                    minCanvasWidth: winW,
                    minCanvasHeight: winW,
                    minCropBoxWidth: winW,
                    minCropBoxHeight: winW,
                    minContainerWidth: winW,
                    minContainerHeight: winW,

                    crop: function (data) {
                    }
                };
                var $wrap = $(this.$refs['edit-box']);
                var img = new Image()
                img.id = 'clipImage'
                img.style.maxHeight='100%';
                var $image = $(img)
                img.src = this.dataBase64
                $wrap.append(img)
                img.onload = function () {
                    $image.cropper(options);
                }
            },
             async handleChangePhoto() {
                try {

                    const reader = new FileReader()
                    const file = this.$refs.file.files[0]
                    const options = {
                        maxWidth: 1280,
                        canvas: true
                    };

                    const that = this
                    loadImage.parseMetaData(file, function (data) {
                        if (data.exif) {
                            options.orientation = data.exif.get('Orientation');
                        }
                        loadImage(file, function (data) {
                            var url = data.toDataURL();
                            that.dataBase64 = url;
                            that.showClip = true
                            that.edit()
                        }, options);
                    });

                } catch (e) {
                    console.error('clip', e)
                }
            },
            handleCreate() {

                const reg = /^\d{2}$/
                const year = this.ten == 0 ? '' : this.ten + '' + this.unit

                this.setHead(this.clipDataBase64)
                this.setIsShare(true)
                this.$router.push({
                    name: 'share',
                    query: {
                        year: year,
                        city:this.inputCity
                    }
                })
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

                    setTimeout(()=>{
                        $("#flipbook").turn('next')
                    } , 1000)

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
                                $('#flipbook').addClass('inner-page').removeClass('center-page');
                            } else if (page == 1) {
                                console.log('add class')
                                $('#flipbook').turn('size', px(275 * 2), px(380));

                                $('#flipbook').removeClass('inner-page').addClass('center-page');
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
                showClip: false,
                inputCity:'',
                imgPhoto:'',
                clipDataBase64:'',
                ten:0,
                unit:0
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
            opacity: 1;
            display: block;
            background: #000;
            z-index: 22999;

            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            position: absolute;
            overflow: hidden;

            .edit-box{
                width: 5.6rem;
                height: 5.6rem;
                left: 50%;
                top:50%;
                transform: translate(-50%,-50%);
                position: absolute;
                border: 1px solid #ccc;
                overflow: hidden;
            }
            .btn-wrap {
                width: 90%;
                bottom: 0;
                left: 5%;
                height: 40px;
                text-align: center;
                position: absolute;
                z-index: 2;
                font-size: 0.33rem;
                border-top: 1px solid #111111;
                overflow: hidden;
                color: #ebebeb;
                display: flex;
                flex-direction: row;
                >div{
                    flex:1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
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


            &.center-page{
                top:50%  !important;
                transform: translateY(-50%)  !important;
            }
            .next1{
                position: absolute;
                top:calpx(481-43);
                left:50%;
                transform: translateX(-50%);
            }
            .next2{
                position: absolute;
                top:calpx(500-43);
                left:50%;
                transform: translateX(-50%);
            }
            .next3{
                position: absolute;
                top:calpx(500-43);
                left:50%;
                transform: translateX(-50%);
            }
            .next4{
                position: absolute;
                top:calpx(490-43);
                left:50%;
                transform: translateX(-50%);
            }
            .next5{
                position: absolute;
                top:calpx(500-43);
                left:50%;
                transform: translateX(-50%);
            }
            .page {
                /*border: 2px solid red;*/
                height: 526px;
                width: 292px;
                position: relative;
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
                top: 45.43%;
                left: #{106-43}px;
                height: calpx(435-303);
                width: calpx(272-106);
                border-radius: 108px;
                /*border: 1px solid red;*/
                overflow: hidden;


                input {
                    position: relative;
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 2000;
                    background-color: transparent;
                }

                .preview{
                    position: absolute;
                    height: calpx(431-324);
                    width: calpx(243-136);
                    left:50%;
                    top:50%;
                    transform: translate(-50%,-43%);
                    z-index: 100;
                    border-radius:calpx(243-136) ;
                    overflow: hidden;

                }

                .photo-head{
                    position:absolute;
                    width: 100%;
                    height: 100%;
                    left:0;
                    top:0;
                    z-index: 1;
                }


            }
            .input-wrap{
                $cls:#8B78B1;
                $fsize:15px;
                position: absolute;
                top: #{454-43}px;
                left: #{124-43}px;
                font-size: 10px;
                letter-spacing: 2px;
                input::placeholder {
                    color: $cls;
                    font-size: $fsize;
                    font-weight: bolder;
                }

                input{
                    color:$cls;
                    font-size: $fsize;
                    font-weight: bolder;
                    width: 138px;
                    outline: none;
                    border: 0;
                    background-color: transparent;
                    margin-left: 2px;
                }
                .line1{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
                .line2{
                    text-align: center;
                    margin-top: 2px;
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