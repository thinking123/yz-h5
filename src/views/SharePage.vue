<template>
    <div ref="wrap" class="wrap" id="share-wrap"     >

        <move-arrow  class="arrow"/>
        <img :src="bg" class="bg"
        />
        <div class="line line1" :class="cls">
            这是我工作的第<span>
                {{year}}
            </span>年，
        </div>
        <div class="line line2" :class="cls">
            我在<span>
                {{city}}，
            </span>
        </div>
        <div class="line line3" :class="cls">
            我为邮储女性代言。
        </div>
        <img :src="qr" class="qr"/>
        <!--<div class="share"  v-if="!preview">-->
            <!--<img :src="share"/>-->
        <!--</div>-->

        <div class="head-wrap" :style="hStyle">
            <img class="head-wrap-img" :src="headWrap"
               />
            <div class="head"   :style="ihStyle">
                <img :src="head" />
            </div>

        </div>
        <div class='tip'>
            截图保存海报
        </div>
        <div class='qr-tip'>
            <div>
                扫描二维码
            </div>
            <div>
                生成海报
            </div>
        </div>
        <div class='tip2'>
            <span v-for="item in items">
                {{item}}
            </span>
        </div>

        <!--<img :src="play" class="play"  @touchstart="handlePlay" v-if="isFromShow"/>-->
        <img :src="previewurl" v-if="preview" class="preview" @click="handleEndPreview"/>
    </div>
</template>

<script>
    /*
    * 海报一：（在邮储银行5年以下，包括5年）

“时不我待，青春尚好；惟愿前行有光，求索不辍；只问理想，无问西东。”

海报二：（在邮储银行6-10年，包括10年）


“敬业而乐群，厚积而薄发；心向暖阳，踏歌而行；无惧风雨，只争朝夕。”


海报三：（11-20年，包括20年）

“光而不耀，举重若轻，看静水流深；活出自我，看见自己。”


海报四：（20年以上）

“丈量时光芳华，撷取岁月凝香；优雅从容，无悔担当。”
    * */

    import {mapGetters , mapMutations} from 'vuex'
    import html2canvas from 'html2canvas';

    import {px} from "../utils/common";
    import {getSignInfo} from "../utils/http";
    import {wx_config , wx_appMessageShare , wx_timelineShare , onMenuShareAppMessage , onMenuShareTimeline} from "../utils/wx-config";
    import MoveArrow from "../components/MoveArrow";

    export default {
        name: "SharePage",
        components: {MoveArrow},
        data() {
            return {
                type: 1,
                year: '',
                city: '',
                previewurl:'',
                w:'',
                h:'',
                ih:'',
                isFromShow:false
            }
        },
        computed: {
            ...mapGetters(['images', 'head', 'url' , 'preview' , 'openid']),
            items() {
                const str = '邮储银行微工会2019女神节特别策划'
                return str.split('')
            },
            qr() {
                return `${this.url}yz-qr.png`
            },
            play() {
                return `${this.url}yz-play-btn.png`
            },
            share() {
                return `${this.url}yz-share-btn.png`
            },
            headWrap() {
                return `${this.url}yz-share${this.type}-c.png`
            },
            bg() {
                return `${this.url}yz-share${this.type}-bg.png`
            },
            cls() {
                return {
                    'color1': this.type == 1,
                    'color2': this.type == 2,
                    'color3': this.type == 3,
                    'color4': this.type == 4,
                }
            },
            hStyle(){
                return {
                    width:this.w + 'px',
                    height:this.h + 'px',
                    left:this.left + 'px',
                    top:this.top + 'px',
                }
            },
            ihStyle(){
                return {
                    width:this.ih + 'px',
                    height:this.ih + 'px',
                    borderRadius:this.ih + 'px',
                }
            }
        },
        methods: {
            ...mapMutations(['setPreview' , 'setOpenid', 'setHead',
            'setIsShare']),
            handlePlay(){
                console.log('goto home')
                this.$router.replace({
                    name: 'page'
                })

            },
            handleEndPreview(){
                this.setPreview(false)
            },
            handleTouchStart(e){


                return
                if(this.preview){
                    console.log('handleTouchStart preview')
                }else{
                    e.preventDefault()

                    console.log('handleTouchStart')
                    clearTimeout(this.timeOutEvent);
                    // 开启延时定时器
                    this.timeOutEvent = setTimeout(()=> {
                        console.log("longpress start saveImage")
                        // alert('longpress')
                        this.saveImage()
                    }, 300);
                }

                // return false
            },
            handleTouchMove(){
                console.log("handleTouchMove clearTimeout")
                // alert('handleTouchMove clearTimeout')
                // clearTimeout(this.timeOutEvent);
            },
            handleTouchEnd(){
                console.log("handleTouchEnd clearTimeout")
                // alert('handleTouchEnd clearTimeout')
                clearTimeout(this.timeOutEvent);
            },
            saveImage() {
                const that = this
                this.setPreview(true)

                const dest = this.$refs['share-wrap']
                html2canvas(document.body , {
                    letterRendering: 1, useCORS: true,
                }).then(canvas => {
                    // document.body.appendChild(canvas);
                    const previewurl = canvas.toDataURL()
                    that.previewurl = previewurl

                    // alert('preview')
                }).catch(err=>{
                    this.setPreview(false)
                    console.log('error screen shot')
                    // alert('screen errror')
                });
            },
            async init() {
                try {
                    console.log('initShare')
                    const {
                        appid,
                        noncestr,
                        signature,
                        timestamp
                    } = await getSignInfo()
                    const title = '今天，我为邮储女性代言'
                    const desc = '快来编写专属你的邮储女性“代言海报”'
                    const imgUrl = `${this.url}yz-share-bg.jpg`
                    const jsApiList = [
                        'updateAppMessageShareData',
                        'updateTimelineShareData',
                        //下面这两个api，虽然已经废弃，但是android必须调用，否则不能分享
                        'onMenuShareAppMessage',
                        'onMenuShareTimeline'
                    ]
                    let link = window.location.href.split('#')[0]


                    console.log('share link' , link)
                    await wx_config(appid, timestamp, noncestr, signature, jsApiList, imgUrl)
                    console.log('分享结束1')
                    await wx_appMessageShare(title, desc, link, imgUrl)
                    console.log('分享结束2')
                    await wx_timelineShare(title, link, imgUrl)
                    console.log('分享结束3')
                    onMenuShareTimeline(title, link, imgUrl)
                    console.log('分享结束4')
                    onMenuShareAppMessage(title, desc, link, imgUrl)
                } catch (e) {
                    console.error(e)
                }
            }
            // async init(){
            //     try {
            //         const {
            //             appid,
            //             noncestr,
            //             signature,
            //             timestamp
            //         } = await getSignInfo(link)
            //         const title = '今天，我为邮储女性代言'
            //         const desc = '快来编写专属你的邮储女性“代言海报”'
            //         const imgUrl = `${this.url}yz-share${this.type}-bg.png`
            //         const jsApiList = [
            //             'updateAppMessageShareData',
            //             'updateTimelineShareData',
            //             //下面这两个api，虽然已经废弃，但是android必须调用，否则不能分享
            //             'onMenuShareAppMessage',
            //             'onMenuShareTimeline'
            //         ]
            //
            //
            //         console.log('imgurl' , imgUrl)
            //         let link = window.location.href.split('#')[0]
            //
            //
            //         let u = this.head.split('com/')[1]
            //         u = u.split('.')[0]
            //         link = `${link}?#/share?openid=${this.openid}&city=${encodeURI(this.city)}&year=${this.year}&head=${u}`
            //         console.log('link' , link)
            //         await wx_config(appid, timestamp, noncestr, signature, jsApiList , imgUrl)
            //         console.log('分享结束1')
            //         await wx_appMessageShare(title, desc, link, imgUrl)
            //         console.log('分享结束2')
            //         await wx_timelineShare(title, link, imgUrl)
            //         console.log('分享结束3')
            //         onMenuShareTimeline(title, link, imgUrl)
            //         console.log('分享结束4')
            //         onMenuShareAppMessage(title, desc, link, imgUrl)
            //     }catch (e) {
            //         console.log(e)
            //     }
            // }
        },
        beforeDestroy(){
            // document.removeEventListener('touchstart' , this.handleTouchStart)
            // document.removeEventListener('touchmove' , this.handleTouchMove)
            // document.removeEventListener('touchend' , this.handleTouchEnd)
        },
        mounted() {
            let { city , year} = this.$route.query
            // if(openid && head){
            //     head = decodeURI(head)
            //     head = `https://cdnpepsi.ysmine.com/${head}.png`
            //     city=decodeURI(city)
            //     this.isFromShow = true
            //     this.setOpenid(openid)
            //     this.setHead(head)
            //     //set head
            // }
            this.year = year
            console.log('year' , year)
            this.city = city
            if (year <= 5) {
                this.type = 1
            } else if (year <= 10) {
                this.type = 2
            } else if (year <= 20) {
                this.type = 3
            } else {
                this.type = 4
            }


            this.init()
            this.setIsShare(true)

            // document.addEventListener('touchstart' , this.handleTouchStart)
            // document.addEventListener('touchmove' , this.handleTouchMove)
            // document.addEventListener('touchend' , this.handleTouchEnd)

            setTimeout(()=>{
                this.$nextTick(()=>{
                    // console.log('this.$route.query', this.$route.query)
                    // const {year, city} = this.$route.query



                    const ph = 259/667 , wh = window.innerHeight - 64

                    const oh = (71 + 259/2)/667
                    const ow = (89 + 272/2)/375
                    let wpx = px(272)
                    let hpx = px(259)
                    let w , h , ih
                    let pw = wpx / wh

                    let np = hpx / wh
                    if(np > ph){
                        //height比例过大
                        h = ph * wh
                        w = 272/259 * h
                        ih = 0.946 * h
                    }else{
                        //不用调整
                        h = hpx
                        w = wpx
                        ih = 0.946 * h
                    }

                    // if(w/px(375) < 0.5){
                    //     w = wpx;
                    //     h = hpx;
                    //     ih = 0.946 * h
                    // }

                    let top = oh * wh - h /2
                    let left = ow * window.innerWidth - w/2


                    // console.log('wh' , wh)
                    //  h = ph * wh
                    //  w = 272/259 * h
                    // const ih = 0.946 * h
                    this.h = h
                    this.w = w
                    this.ih = ih
                    this.top = top
                    this.left = left
                })
            } , 300)


            // const key = `share${this.type}-bg`
            // const {image} = this.images.find(f => f.key == key)
            // image.style.width = '100%'
            // image.style.height = '100%'
            // const wrap = this.$refs.wrap

            // wrap.appendChild(image)


            // wrap.addEventListener('long-press', this.saveImage);
        },
        beforeRouteEnter(to, from, next) {
            next()
        },
        beforeRouteUpdate(to, from, next) {
            next()
        },
        beforeRouteLeave(to, from, next) {
            this.setIsShare(false)
            // window.location.href = window.location.host
            // next({ name: 'page' })
            next()
        }
    }
</script>
<style>

</style>
<style scoped lang="scss">
    .arrow {

        top: 16px;
        right: 16px;

    }

    .wrap {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        .bg{
            width: 100%;
            height: 100%;
            pointer-events: none;
        }

        .tip{
            position: absolute;
            white-space: nowrap;
            font-size: 12px;
            bottom: 10px;
            left: 294px;
        }

        .tip2 {
            position: absolute;
            font-size: 10px;
            /*top: 32px;*/
            top: 4.8%;
            left: 30px;

            >span{
                /*margin: 1px 0;*/
                display: block;
                text-align: center;
                margin: -1.5px 0;
            }
        }

        .qr {
            position: absolute;
            width: 50px;
            height: 50px;
            bottom: 4.8%;
            left: 30px;
            font-size: 10px;
        }

        .qr-tip {
            position: absolute;
            bottom: 4.8%;
            width: 71px;
            /*height: 71px;*/
            left: 94px;
        }
        .share {
            position: absolute;
            top: 63px;
            left: 333px;
            width: calpx(49-26);
            height: calpx(49-26);
            border-radius: calpx(49-26);
            overflow: hidden;

            > img {
                width: 100%;
                height: 100%;
            }
        }

        .head-wrap {
            position: absolute;
            height: 259px;
            width: 272px;

            top: 10.49%;
            left: 89px;
            /*overflow: hidden;*/

            z-index: 2;
            .head-wrap-img {
                width: 100%;
                height: 100%;
            }

            $h:245px;
            .head{
                position: absolute;
                height: $h;
                width: $h;
                border-radius: $h;
                left:50%;
                top: 50%;
                transform: translate(-50%,-50%);
                overflow: hidden;
                >img{
                    width: 100%;
                    height: 100%;
                }
            }
        }

        /**/
        .color1 {
            color: #489E9C;
        }

        .color2 {
            color: #E64963;
        }

        .color3 {
            color: #9B005D;
        }

        .color4 {
            color: #A47849;
        }

        $fs: 25px;

        .line {
            position: absolute;
            font-size: 18px;
            left: 32px;
            position: absolute;
            /*font-family: myfont2;*/
        }

        .line1 {
            top: 68.82%;


            > span {
                font-size: $fs;
            }
        }

        .line2 {
            top: 73.76%;

            > span {
                font-size: $fs;
            }
        }

        .line3 {
            top: 80.81%;
        }

        .preview{
            position: absolute;
            left:0;
            top:0;
            width: 100%;
            height: 100%;
            z-index: 20000;
        }

        .play{
            right: 20px;
            width: 95px;
            height: 36px;
            border-radius: 95px;
            overflow: hidden;

            position: absolute;
            bottom: 6.6%;
            z-index: 100;
        }
    }
</style>