<template>
    <div id='slider' class='swipe-time' ref='slider'>
        <div class='swipe-time-wrap' ref="swipe-wrap">

        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "SwipeTime",
        computed: {
            ...mapGetters(['images'])
        },
        watch: {
            images(v) {
                if(v){
                    const items = v.filter(f=>f.key.indexOf('num') > -1)
                    const ref = this.$refs['swipe-wrap']
                    const swipe = this.$refs['swipe']
                    if(ref){
                        items.forEach(item=>{
                            const img = item.image
                            const key = item.key

                            img.id = key
                            image.style.width = '100%'
                            image.style.height = '20px'
                            ref.appendChild(image)
                        })

                        window.mySwipe = Swipe(swipe);

                    }
                }
            }
        },
    }
</script>

<style>
    .swipe-time {
        overflow: hidden;
        visibility: hidden;
        position: relative;
    }
    .swipe-time-wrap {
        overflow: hidden;
        position: relative;
    }

    .swipe-time-wrap > img{
        float:left;
        width:100%;
        position: relative;
    }
</style>