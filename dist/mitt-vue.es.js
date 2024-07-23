import * as u from "vue";
import { onMounted as f, onUnmounted as r } from "vue";
function c(t) {
  return { all: t = t || /* @__PURE__ */ new Map(), on: function(n, e) {
    var o = t.get(n);
    o ? o.push(e) : t.set(n, [e]);
  }, off: function(n, e) {
    var o = t.get(n);
    o && (e ? o.splice(o.indexOf(e) >>> 0, 1) : t.set(n, []));
  }, emit: function(n, e) {
    var o = t.get(n);
    o && o.slice().map(function(s) {
      s(e);
    }), (o = t.get("*")) && o.slice().map(function(s) {
      s(n, e);
    });
  } };
}
const i = c();
function a(t, n) {
  i.emit(t, n);
}
function m(t, n) {
  return {
    mounted() {
      i.on(t, n);
    },
    destroyed() {
      i.off(t, n);
    }
  };
}
function p(t, n) {
  f(() => {
    i.on(t, n);
  }), r(() => {
    i.off(t, n);
  });
}
const d = u.version && u.version.startsWith("2.") ? m : p;
export {
  a as eventEmit,
  d as useEventListener
};
