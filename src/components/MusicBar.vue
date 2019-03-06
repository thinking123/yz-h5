<template>
    <div ref="wrap" class="wrap" @click="handleMusic"

         v-show="!preview">
        <audio ref="music" loop="loop"  >
            <source :src="musUrl" type="audio/mpeg" >
        </audio>
        <img :src="musicIcon" class="icon" ref="img"/>


    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    export default {
        name: "MusicBar",
        computed: {
            ...mapGetters(['isPlaying' , 'url' , 'preview' , 'isShare']),
            musUrl(){
                return `${this.url}yz-music.mp3`
            },
            musicIcon(){
                return `${this.url}yz-music-btn.png`
            }
        },
        mounted() {
            document.addEventListener("WeixinJSBridgeReady", this.audioAutoPlay, false)
        },
        methods: {
            ...mapMutations([
                'setIsPlaying'
            ]),
            handleMusic() {
                try {
                    const m = this.$refs.music
                    console.log('this.isPlaying' ,this.isPlaying)
                    this.setIsPlaying(!this.isPlaying)
                    this.isPlaying ? this.play(m) : this.pause(m)
                } catch (e) {
                    console.log(e)
                }

            },
            pause(m){
                console.log('this.pause' ,this.isPlaying)
                const $img = $(this.$refs.img)
                const $wrap = $(this.$refs.wrap)
                let siteWp = $($wrap).css('transform')
                let siteImg = $img.css('transform')

                $wrap.css('transform',siteWp === 'none' ? siteImg : siteImg.concat('',siteWp))
                $img.removeClass('playing')
                m.pause()
            },
            play(m){
                console.log('this.play' ,this.isPlaying)
                const $img = $(this.$refs.img)
                $img.addClass('playing')
                m.play()
            },
            audioAutoPlay(id) {
                const m = this.$refs.music
                this.setIsPlaying(true)
                this.play(m)
            },
        }
    }
</script>

<style scoped lang="scss">
    .wrap {
        position: fixed;
        width: calpx(49-26);
        height: calpx(49-26);
        border-radius: calpx(49-26);
        overflow: hidden;
    }



    @keyframes rotating {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    div>img{
        width: 100%;
        height: 100%;

        /*&.paused{*/
            /*animation-play-state: paused;*/
        /*}*/
    }

    .playing{
        animation: rotating 3s infinite linear;
    }

</style>