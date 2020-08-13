// 过滤特殊字符
export function stripscript(str) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{ }【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

// 验证手机号
export function validateTel(val) {
  let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
  return !reg.test(val) ? true : false;
}

// 验证密码
export function validatePwd(val) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,12}$/;
  return !reg.test(val) ? true : false;
}

// 验证验证码
export function validateCode(val) {
  let reg = /^[a-z0-9]{6}$/;
  return !reg.test(val) ? true : false;
}
