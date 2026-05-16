import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-_ixL3x3g.js";
import { j as useSize, A as AppLayout, T as ToggleRight, d as Badge } from "./AppLayout--GaIKNag.js";
import { X as useComposedRefs, _ as useControllableState, V as Primitive, a0 as composeEventHandlers, Y as createContextScope, i as cn, B as Button, P as Plus, ac as Search, I as Input, C as Card } from "./router-DMGhHKXf.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./api-ySu1tSp5.js";
function usePrevious(value) {
  const ref = reactExports.useRef({ value, previous: value });
  return reactExports.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Root.displayName;
const FLAGS = [{
  key: "ai_lease_summary",
  name: "AI lease summary",
  description: "Generate plain-English lease summaries for tenants.",
  env: "Production",
  rollout: 35,
  enabled: true,
  category: "AI"
}, {
  key: "tenant_chat",
  name: "Tenant chat",
  description: "Realtime messaging between tenants and landlords.",
  env: "Production",
  rollout: 100,
  enabled: true,
  category: "Tenant portal"
}, {
  key: "stripe_payouts",
  name: "Stripe Connect payouts",
  description: "Direct payouts to landlord bank accounts.",
  env: "Production",
  rollout: 80,
  enabled: true,
  category: "Billing"
}, {
  key: "mobile_v2",
  name: "Mobile app v2",
  description: "Redesigned tenant mobile experience.",
  env: "Staging",
  rollout: 25,
  enabled: false,
  category: "Mobile"
}, {
  key: "advanced_reports",
  name: "Advanced reports",
  description: "Cohort and segment-based reporting.",
  env: "Production",
  rollout: 60,
  enabled: true,
  category: "Reporting"
}, {
  key: "ai_arrears",
  name: "AI arrears prediction",
  description: "Predict likelihood of late payment per tenant.",
  env: "Staging",
  rollout: 10,
  enabled: false,
  category: "AI"
}, {
  key: "sso_scim",
  name: "SSO + SCIM",
  description: "Enterprise SSO via SAML and SCIM provisioning.",
  env: "Production",
  rollout: 100,
  enabled: true,
  category: "Billing"
}];
function AdminFeatures() {
  const [flags, setFlags] = reactExports.useState(FLAGS);
  const [q, setQ] = reactExports.useState("");
  const toggle = (key) => setFlags((fs) => fs.map((f) => f.key === key ? {
    ...f,
    enabled: !f.enabled
  } : f));
  const setRollout = (key, rollout) => setFlags((fs) => fs.map((f) => f.key === key ? {
    ...f,
    rollout
  } : f));
  const filtered = flags.filter((f) => [f.name, f.key, f.description, f.category].some((v) => v.toLowerCase().includes(q.toLowerCase())));
  const grouped = filtered.reduce((acc, f) => {
    (acc[f.category] ||= []).push(f);
    return acc;
  }, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { allow: ["super_admin"], children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Feature flags" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Roll out features gradually across workspaces." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " New flag"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search flags…", className: "pl-9 bg-secondary/60 border-0" })
    ] }),
    Object.entries(grouped).map(([cat, items]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRight, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground", children: cat })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "divide-y divide-border shadow-[var(--shadow-card)]", children: items.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col sm:flex-row sm:items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: f.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground", children: f.key }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px]", children: f.env })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: f.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 sm:w-72", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Rollout" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums font-medium", children: [
                f.rollout,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 0, max: 100, value: f.rollout, onChange: (e) => setRollout(f.key, Number(e.target.value)), disabled: !f.enabled, className: "w-full h-1.5 rounded-full bg-secondary accent-primary disabled:opacity-50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: f.enabled, onCheckedChange: () => toggle(f.key) })
        ] })
      ] }, f.key)) })
    ] }, cat))
  ] }) });
}
export {
  AdminFeatures as component
};
