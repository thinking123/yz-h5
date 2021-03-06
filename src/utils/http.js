import http from './axios'

const HTTP_OK = '200';

function parseRes(res, errMsg ='请求失败') {
    if (!!res && res.status && res.status.indexOf('2') > -1) {
        // return res.rows ? res.rows : res
        return res.rows
    } else {
        const msg = res && res.message ? res.message : errMsg
        throw new Error(msg ? msg : 'error')
    }
}

export async function getSignInfo() {

    let signUrl = ''

    signUrl = location.href.split('#')[0]  //hash后面的部分如果带上ios中config会不对
    signUrl = encodeURIComponent(signUrl)

    const url = `/api/signature?url=${signUrl}`
    const data = {
        url: signUrl
    }
    return http.post(url, {}, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(parseRes)
}

export async function uploadFile(formData) {
    const url = `/api/uploadImg`
    console.log('form data' , formData)
    const headers =  {
        //只能使用这个header
        'Content-Type': 'multipart/form-data'
    }
    return http.post(url, formData, {headers}).then(parseRes)
}



export function register(openId , city, workYear) {
    const url = '/api/'
    const data = {
        openId , city,  workYear
    }
    return http.post(url, data).then(res => parseRes(res))
}