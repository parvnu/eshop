//基础路径
let baseUrl = 'http://localhost:3000'
//注册页面
//发送验证码
let sendCaptcha = baseUrl + '/captcha/sent'
//验证手机号码是否被注册
let checkPhone = baseUrl + '/cellphone/existence/check'
//验证验证码
let checkCaptcha = baseUrl + '/captcha/verify'
//注册
let sign = baseUrl + '/register/cellphone'
//登录页面
//登录
let login = baseUrl + '/login/cellphone'
//首页
let index = 'http://yd.msword.top/getIndexData'
//分类
let sort = 'http://yd.msword.top/getClassify'
//商品详情
let detail = 'http://yd.msword.top/getDetails'
//退出登录
let logout = baseUrl + '/logout'
export default{
    sendCaptcha,
    checkPhone,
    checkCaptcha,
    sign,
    login,
    index,
    sort,
    detail,
    logout
}