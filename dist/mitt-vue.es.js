import * as r from "vue";
import { onMounted as f, onUnmounted as u } from "vue";
function m(t) {
  return { all: t = t || /* @__PURE__ */ new Map(), on: function(e, i) {
    var n = t.get(e);
    n ? n.push(i) : t.set(e, [i]);
  }, off: function(e, i) {
    var n = t.get(e);
    n && (i ? n.splice(n.indexOf(i) >>> 0, 1) : t.set(e, []));
  }, emit: function(e, i) {
    var n = t.get(e);
    n && n.slice().map(function(s) {
      s(i);
    }), (n = t.get("*")) && n.slice().map(function(s) {
      s(e, i);
    });
  } };
}
const o = m();
function c(t, e) {
  o.emit(t, e);
}
function p(t, e) {
  return {
    created() {
      o.on(t, e.bind(this));
    },
    beforeDestroy() {
      o.off(t, e.bind(this));
    }
  };
}
function v(t, e) {
  f(() => {
    o.on(t, e);
  }), u(() => {
    o.off(t, e);
  });
}
const d = r.version && r.version.startsWith("3.") ? v : p, E = c;
export {
  c as eventEmit,
  E as useEventEmit,
  d as useEventListener
};
