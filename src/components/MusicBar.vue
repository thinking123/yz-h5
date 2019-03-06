<template>
    <div class="wrap" @click="handleMusic">
        <audio ref="music" loop="loop"  >
            <source :src="musUrl" type="audio/mpeg" >
        </audio>
        <img :src="musicIcon" class="icon" :class="{'paused':!isPlaying}"/>


    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    export default {
        name: "MusicBar",
        computed: {
            ...mapGetters(['isPlaying' , 'url']),
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
                    this.setIsPlaying(!this.isPlaying)
                    this.isPlaying ? m.play() : m.pause()
                } catch (e) {
                    console.log(e)
                }

            },
            audioAutoPlay(id) {
                const m = this.$refs.music
                this.setIsPlaying(true)
                m.play() ;
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
        animation: rotating 3s infinite linear;
        &.paused{
            animation-play-state: paused;
        }
    }

</style>