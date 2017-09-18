/*
* @Author: Administrator
* @Date:   2017-09-18 10:49:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-18 10:49:14
*/

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Released under the MIT license符合MIT软件许可协议
 * Author :SunZhiqi
 * Email:Sunzhiqi@live.com
 * Date: 2017-07-30T6:30Z
 */
(function (win, fn) {
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = fn(win);
  } else {
    fn(win);
  }
})(typeof window !== "undefined" ? window : undefined, function (window) {

  var convertMs = function convertMs(t, dateArgs) {
    var ms = t - dateArgs.dateMs;
    return {
      dd: ~~(ms / 1000 / 60 / 60 / 24) + '',
      hh: ~~(ms / 1000 / 60 / 60 % 24) + '',
      min: ~~(ms / 1000 / 60 % 60) + '',
      ss: ~~(ms / 1000 % 60) + '',
      tms: ~~(ms % 1000) + ''
    };
  },
      dateApi = function dateApi() {
    var date = new Date();
    return {
      date: date,
      dateMs: date.getTime(),
      ms: date.getMilliseconds() + '',
      ss: (date.getSeconds() + '').length < 2 ? '0' + date.getSeconds() : date.getSeconds() + '',
      min: (date.getMinutes() + '').length < 2 ? '0' + date.getMinutes() : date.getMinutes() + '',
      hh: (date.getHours() + '').length < 2 ? '0' + date.getHours() : date.getHours() + '',
      ww: function () {
        switch (date.getDay()) {
          case 0:
            return " 日";
            break;
          case 1:
            return " 一";
            break;
          case 2:
            return " 二";
            break;
          case 3:
            return " 三";
            break;
          case 4:
            return " 四";
            break;
          case 5:
            return " 五";
            break;
          case 6:
            return " 六";
            break;
        }
      }(),
      dd: date.getDate() + '',
      mo: date.getMonth() + 1 + '',
      yy: date.getFullYear() + ''
    };
  },
      type = function type(obj) {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      return 'object';
    }
    if (Object.prototype.toString.call(obj) === '[object Array]') {
      return 'array';
    }
    if (Object.prototype.toString.call(obj) === '[object String]') {
      return 'string';
    }
    if (Object.prototype.toString.call(obj) === '[object Function]') {
      return 'function';
    }
  },
      pushelem = function pushelem(st, options, markCount, tsArgs, dateArgs) {
    if (type(st) === "object" || type(options) === "object") {
      if (!markCount) {
        options = st;
      }
      for (var key in options) {
        if (key && options[key]) {
          options[key].innerText = markCount ? tsArgs[key] ? tsArgs[key].length < 2 ? '0' + tsArgs[key] : tsArgs[key].trim() : "NaN" : dateArgs[key] ? dateArgs[key].length < 2 ? '0' + dateArgs[key] : dateArgs[key].trim() : "NaN";
        } else {
          console.error(key + "\u6307\u5B9A\u5B58\u653E\u5143\u7D20\u4E0D\u5B58\u5728");
          return;
        }
      }
    }
  },
      checkFormat = function checkFormat(st) {
    if (type(st) === "object") {
      var len = 0;
      for (var key in st) {
        len++;
      }
      if (len > 0) {
        return true;
      }
    }
    if (type(st) === "array") {
      if (st.length >= 3) {
        return true;
      } else {
        console.error('设置时间至少传入年月日三个参数');
      }
    }
    if (typeof st === 'string') {
      var reg = /(\d{1,2})(d|h|m|s)/;
      return reg.test(st);
    }
    return false;
  },
      getDate = function getDate(st) {
    var len = 1,
        ret = void 0;
    if (type(st) === "string") {
      var reg = /(\d{1,2})(d|h|m|s)/g,
          s = {};
      while (ret = reg.exec(st)) {
        s[ret[2]] = ret[1];
        s.length = len++;
      }
      return s;
    }
    return st;
  },
      settime = function settime(st, dateArgs, nowTime) {
    var settime = void 0,
        stms = void 0;
    if (type(st) === "array") {
      settime = new Date(st[0] >= +dateArgs.yy ? st[0] : 0, st[1] - 1 >= 0 ? st[1] - 1 : 0, st[2] >= 0 ? st[2] : 0, st[3] >= 0 ? st[3] : 0, st[4] >= 0 ? st[4] : 0, st[5] >= 0 ? st[5] : 0, st[6] >= 0 ? st[6] : 0);
    }
    if (type(st) === "object") {
      var key = void 0;
      for (key in st) {
        if (key && st[key] && key === 'd') {
          settime = nowTime.setDate(+nowTime.getDate() + +st.d);
        }
        if (key && st[key] && key === 'h') {
          settime = nowTime.setHours(+nowTime.getHours() + +st.h);
        }
        if (key && st[key] && key === 'm') {
          settime = nowTime.setMinutes(+nowTime.getMinutes() + +st.m);
        }
        if (key && st[key] && key === 's') {
          settime = nowTime.setSeconds(+nowTime.getSeconds() + +st.s);
          settime = nowTime.setMilliseconds(0);
        }
      }
    }
    if (!settime) {
      console.error('定义倒计时时间错误');
      return;
    }
    return settime;
  };

  var CountDown = function CountDown() {
    _classCallCheck(this, CountDown);

    var conterTimer = void 0,
        markCount = void 0,
        t = void 0,
        nowTime = new Date(),
        countfn = function countfn(st, options, autoCountDown) {
      var dateArgs = dateApi(),
          tsArgs = void 0;
      if (!checkFormat(st, dateArgs)) {
        clearInterval(conterTimer);
      }
      if (type(st) !== 'object' && st != null) {
        if (!markCount) {
          st = getDate(st);
          t = settime(st, dateArgs, nowTime);
        }
        markCount = true;
      }
      if (t - dateArgs.date <= 0) {
        clearInterval(conterTimer);
        if (typeof autoCountDown === 'function') {
          autoCountDown();
        }
      }
      if (markCount) {
        tsArgs = convertMs(t, dateArgs);
      }

      pushelem(st, options, markCount, tsArgs, dateArgs);

      return markCount ? tsArgs.dd + "\u5929" + tsArgs.hh + "\u65F6" + tsArgs.min + "\u5206" + tsArgs.ss + "\u79D2" : dateArgs.yy + "-" + dateArgs.mo + "-" + dateArgs.dd + " " + dateArgs.hh + "\u65F6" + dateArgs.min + "\u5206" + dateArgs.ss + "\u79D2";
    };
    this.init = function (st, options) {
      for (var _len = arguments.length, fresh = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        fresh[_key - 2] = arguments[_key];
      }

      var autoCountDown = fresh && fresh.length == 1 ? type(fresh[0]) === 'function' ? fresh[0] : false : true || type(st) === "object";
      if (autoCountDown) {
        conterTimer = setInterval(function () {
          countfn(st, options, autoCountDown);
        }, 1000);
      }
      return countfn(st, options, autoCountDown);
    };
  };

  window.countDown = function () {
    return new CountDown();
  };
});