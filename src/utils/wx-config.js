export function wx_config(appId , timestamp , nonceStr , signature , jsApiList , imgUrl) {
    return new Promise((resolve, reject) => {
        wx.config({
            debug: false,
            appId,
            timestamp,
            nonceStr,
            signature,
            jsApiList
        })

        wx.ready(function () {
            resolve()
        })
        wx.error(reject)
    })
}
/*
* H5标题：今天，我为邮储女性代言；内容简介：快来编写专属你的邮储女性“代言海报”
* */
//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
export function onMenuShareTimeline(title, link, imgUrl) {
    wx.onMenuShareTimeline({
        title,
        link,
        imgUrl,
        success:res=>{
            console.log('分享到朋友圈 即将废弃 success')

        },
        fail:err=>{
            console.log('分享到朋友圈 即将废弃 fail')

        },
        cancel:res=>{
            console.log('分享到朋友圈 即将废弃 fail')
        },
    })
}
//获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
export function onMenuShareAppMessage(title, desc , link, imgUrl) {
    wx.onMenuShareAppMessage({
        title,
        desc,
        link,
        imgUrl,
        success:res=>{
            console.log('分享给朋友 即将废弃 success')
        },
        fail:err=>{
            console.log('分享给朋友 即将废弃 fail')
        },
        cancel:res=>{
            console.log('分享给朋友 即将废弃 fail')
        },
    })
}

//获取“分享到QQ”按钮点击状态及自定义分享内容接口（即将废弃）
export function onMenuShareQQ(title, desc , link, imgUrl) {
    return new Promise((resolve, reject) => {
        wx.onMenuShareQQ({
            title,
            desc,
            link,
            imgUrl,
            success:res=>{
                console.log('分享到QQ success')
                resolve(res)
            },
            fail:err=>{
                console.log('分享到QQ fail')
                reject(err)
            },
            cancel:res=>reject(new Error('用户取消分享')),
        })
    })
}

//获取“分享到QQ空间”按钮点击状态及自定义分享内容接口（即将废弃）
export function onMenuShareQZone(title, desc , link, imgUrl) {
    return new Promise((resolve, reject) => {
        wx.onMenuShareQZone({
            title,
            desc,
            link,
            imgUrl,
            success:res=>{
                console.log('分享到QQ空间 success')
                resolve(res)
            },
            fail:err=>{
                console.log('分享到QQ空间 fail')
                reject(err)
            },
            cancel:res=>reject(new Error('用户取消分享')),
        })
    })
}



//定义分享到朋友圈内容
export function wx_timelineShare(title, link, imgUrl) {
    return new Promise((resolve, reject) => {
        wx.updateTimelineShareData({
            title,
            link,
            imgUrl,
            success:res=>{
                console.log('定义分享到朋友圈内容 success')
                resolve(res)
            },
            fail:err=>{
                console.log('定义分享到朋友圈内容 fail')
                reject(err)
            },
            cancel:res=>reject(new Error('用户取消分享')),
        })
    })
}

//定义“分享给朋友”及“分享到QQ”按钮的分享内容
export function wx_appMessageShare(title, desc , link, imgUrl) {
    return new Promise((resolve, reject) => {
        wx.updateAppMessageShareData({
            title,
            desc,
            link,
            imgUrl,
            success:res=>{
                console.log('分享给朋友 success')
                resolve(res)
            },
            fail:err=>{
                console.log('分享给朋友 fail')
                reject(err)
            },
            cancel:res=>reject(new Error('用户取消分享')),
        })
    })
}
