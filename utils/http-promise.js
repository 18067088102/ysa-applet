import {
    config
} from "../utils/config.js"

const tips = {
    1: '请求失败,请重试'
}

class HTTP {
    request({url, data={}, header={}, method='GET'}) {
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, header, method)
        })
    }

    _request(url, resolve, reject, data = {}, header={}, method = 'GET') {
        wx.request({
            url: config.api_base_url + url,
            method: method,
            data: data,
            header: header,
            success: (res) => {
                const code = res.statusCode.toString()
                if (code.startsWith('200')) {
                    resolve(res.data)
                } else {
                    reject()
                    const error_code = res.data.error_code
                    this._show_error(error_code)
                }
            },
            fail: (err) => {
                reject(err)
                this._show_error(1)
            }
        })
    }

    _show_error(error_code) {
        if (!error_code) {
            error_code = 1
        }
        const tip = tips[error_code]
        wx.showToast({
            title: tip ? tip : tips[1],
            icon: 'none',
            duration: 2000
        })
    }
}

export {
    HTTP
}