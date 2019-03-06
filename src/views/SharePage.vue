<template>
    <div ref="wrap" class="wrap" id="share-wrap"      @touchstart="handleTouchStart"
         @touchmove="handleTouchMove"
         @touchend="handleTouchEnd">
        <img :src="bg" class="bg"
        />
        <div class="line line1" :class="cls">
            这是我工作的第<span>
                {{year}}
            </span>年
        </div>
        <div class="line line2" :class="cls">
            我在<span>
                {{city}}
            </span>
        </div>
        <div class="line line3" :class="cls">
            我为邮储女性代言。
        </div>
        <img :src="qr" class="qr"/>
        <div class="share"  v-if="!preview">
            <img :src="share"/>
        </div>

        <div class="head-wrap">
            <img class="head-wrap-img" :src="headWrap"/>
            <div class="head">
                <img :src="head" />
            </div>

        </div>
        <div class='tip'>
            长按保存图片
        </div>
        <div class='tip2'>
            <span v-for="item in items">
                {{item}}
            </span>
        </div>

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
    export default {
        name: "SharePage",
        data() {
            return {
                type: 1,
                year: '',
                city: '',
                previewurl:''
            }
        },
        computed: {
            ...mapGetters(['images', 'head', 'url' , 'preview']),
            items() {
                const str = '邮储银行微工会2019女神节特别策划'
                return str.split('')
            },
            qr() {
                return `${this.url}yz-qr.png`
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
            }
        },
        methods: {
            ...mapMutations(['setPreview']),
            handleEndPreview(){
                this.setPreview(false)
            },
            handleTouchStart(e){
                if(this.preview){

                }else{
                    e.preventDefault()

                    console.log('handleTouchStart')
                    clearTimeout(this.timeOutEvent);
                    // 开启延时定时器
                    this.timeOutEvent = setTimeout(()=> {
                        console.log("longpress")
                        this.saveImage()
                    }, 1500);
                }

                // return false
            },
            handleTouchMove(){
                // console.log("clearTimeout")
                // alert('clearTimeout')
                clearTimeout(this.timeOutEvent);
            },
            handleTouchEnd(){
                // console.log("clearTimeout")
                // alert('clearTimeout')
                clearTimeout(this.timeOutEvent);
            },
            saveImage() {
                const that = this
                this.setPreview(true)
                html2canvas(document.body , {
                    letterRendering: 1, useCORS: true,
                }).then(canvas => {
                    // document.body.appendChild(canvas);
                    const previewurl = canvas.toDataURL()
                    that.previewurl = previewurl

                    // alert('preview')
                }).catch(err=>{
                    this.setPreview(false)
                    console.error('error screen shot')
                });
            }
        },
        mounted() {

            console.log('this.$route.query', this.$route.query)
            const {year, city} = this.$route.query

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

            const key = `share${this.type}-bg`
            const {image} = this.images.find(f => f.key == key)
            image.style.width = '100%'
            image.style.height = '100%'
            const wrap = this.$refs.wrap

            // wrap.appendChild(image)


            // wrap.addEventListener('long-press', this.saveImage);
        }
    }
</script>
<style>

</style>
<style scoped lang="scss">
    .wrap {
        width: 100%;
        height: 100%;
        position: relative;

        .bg{
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        .tip {
            position: absolute;
            white-space: nowrap;
            font-size: 12px;
            bottom: 10px;
            left: 294px;
        }

        .tip2 {
            position: absolute;
            font-size: 10px;
            top: 32px;
            left: 30px;

            >span{
                /*margin: 1px 0;*/
                display: block;
                text-align: center;
            }
        }

        .qr {
            position: absolute;
            width: 71px;
            height: 71px;
            top: 87.26%;
            left: 32px;
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

            $h:210px;
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
            font-family: myfont2;
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
    }
</style>