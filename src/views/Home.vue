<template>
    <div class="con-wrap">


        <div class='hold'>
            <div class='shadow'></div>
            <div id='lower' class='page-holder'>
                <div class='page'>
                    <div class='front'
                         style="background-image: url('https://scontent-arn2-1.cdninstagram.com/vp/7e1d347df4507221661f290d53e5c92c/5C7D557B/t51.2885-15/e35/41367665_2062001547164520_6765080747769703169_n.jpg')">
                        <div class='back-holder'>
                            <div class='back'
                                 style="background-image: url('https://scontent-arn2-1.cdninstagram.com/vp/003e561e17e4bd8da3ad7951f956846b/5C75FBDC/t51.2885-15/e35/39118543_280321152770112_7076353727086460928_n.jpg')"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='upper' class='page-holder'>
                <div class='page'>
                    <div class='front'
                         style="background-image: url('https://scontent-arn2-1.cdninstagram.com/vp/172aae82cb1b354635a3fabe1293be5e/5C6DF19D/t51.2885-15/e35/35617668_156361315237639_4150058879004180480_n.jpg')">
                        <div class='back-holder'>
                            <div class='back'
                                 style="background-image: url('https://scontent-arn2-1.cdninstagram.com/vp/003e561e17e4bd8da3ad7951f956846b/5C75FBDC/t51.2885-15/e35/39118543_280321152770112_7076353727086460928_n.jpg')"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>

</template>

<script>
    export default {
        name: "Home",
        methods: {
            handlePushPage() {

            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/css/mixin";

    .con-wrap {
        width: 100%;
        height: 100%;
    }

    .page {
        display: flex;
        height: 100%;
        align-items: center;
        flex-direction: column;
        margin: 0 46px;
        position: relative;
    }

    .hold {
        width: 1000px;
        margin: auto;
        position: relative;
        display: block;
        height: 600px;
    }

    .shadow {
        position: absolute;
        width: 500px;
        left: 50%;
        top: 150px;
        height: 300px;
        box-shadow: 6px 4px 10px 0px rgba(0, 0, 0, 0.7);
    }

    .page-holder {
        height: 600px;
        width: 1000px;
        position: absolute;
        overflow: hidden;
        cursor: pointer;
        /*   background: yellow; */
    }

    a.link {
        text-decoration: none;
        color: white;
        background: black;
        padding: 10px 20px;
        float: right;
        right: 400px;
        position: relative;
    }

    .page {
        height: 200%;
        width: 100%;
        top: -50%;
        left: 0%;
        position: absolute;
        overflow: hidden;
        transform: rotateZ(-30deg);
        transition: transform 1s, left 1s;
        transform-origin: 100% 37.5%;
    }

    .page > .front,
    .page .back-holder,
    .page .back {
        height: 300px;
        width: 500px;
        position: absolute;
        background-size: cover;
        transition: transform 1s, left 1s;
        background-color: black;
        color: white;
    }

    .page > .front {
        top: 37.5%;
        left: 50%;
        transform: rotateZ(30deg) translateX(0);
        transform-origin: 100% 0%;
        box-shadow: inset 10px 0 10px -8px #000000;
    }

    .page .back-holder {
        left: 100%;
        top: 0;
        transition: left 1s, transform 1s;
        transform-origin: 0% 0%;
        transform: rotateZ(-60deg);
    }

    .page .back {
        left: 0%;
        top: 0;
        transform: rotateZ(0deg);
        transform-origin: 0% 0%;
        transition: top 1s, left 1s;
        box-shadow: inset -15px 0 22px -10px #000000;
    }

    .page .back:after {
        content: ' ';
        position: absolute;
        height: 100%;
        transform: rotateZ(-0.7deg);
        transform-origin: 0% 100%;
        width: 100%;
        box-shadow: 10px 8px 10px -1px rgba(0, 0, 0, 0.8);
    }

    .page-holder:hover .page {
        transform: rotateZ(-0deg);
        left: -50%;
    }

    .page-holder:hover .page > .front {
        transform: rotateZ(0deg) translateX(100%);
    }

    .page-holder:hover .back-holder {
        left: 0%;
        transform: rotateZ(0deg);
        /*   transform: rotateZ(0deg);
          top: 0; */
    }

    .page-holder:hover .back {
        left: -100%;
    }


    #insta {
        position: fixed;
        top: 50px;
        right: 80px;
        height: 80px;
        width: 80px;
        border-radius: 51px;
        overflow: hidden;
        box-shadow: 0 1px 12px -1px;
    }

    #insta a {
        display: block;
    }

    #insta img {
        width: 100%;
    }

</style>
