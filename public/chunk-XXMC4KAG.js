import{a as xe}from"./chunk-BXNGJMNW.js";import{a as fe,b as ve,c as _e,d as Ce,e as R,g as Me}from"./chunk-6AWYN2YE.js";import{a as Et}from"./chunk-UVYWXICS.js";import{a as ce,b as ge,c as ue,d as me,e as ye}from"./chunk-JILBJ4SZ.js";import{a as pe,c as be,d as he}from"./chunk-ID7FKOIN.js";import{d as kt}from"./chunk-PUKRHXVC.js";import{a as ft,e as _t}from"./chunk-HEC7VUD4.js";import{c as Ot,h as Dt}from"./chunk-LFWFRAAU.js";import"./chunk-QCALZY7W.js";import{A as Zt,C as Xt,D as te,a as Gt,b as Vt,d as x,f as Ft,g as Lt,h as zt,j as C,k as jt,l as $t,n as Ut,o as Ht,p as Wt,r as qt,s as Kt,v as Qt,w as Jt,z as Yt}from"./chunk-IBWQ3VZ7.js";import"./chunk-IXELU3B4.js";import"./chunk-RBLNPH2I.js";import{a as le,b as se,d as de}from"./chunk-KTKVQXOO.js";import{a as ne,b as ae,c as oe,d as re,e as ie}from"./chunk-WH7FGIC2.js";import{d as Tt,i as wt,j as Pt,l as It}from"./chunk-UKYXFV24.js";import{b as At,c as Bt,d as Rt,e as Nt,f as ee}from"./chunk-76JY3OGW.js";import{C as Q,O as yt,P as vt,Q as xt,R as Ct,S as Mt,V as St,g as mt,o as pt,q as bt,z as ht}from"./chunk-7FKGD2D4.js";import{f as K,h as gt,i as ut}from"./chunk-LOOTII3U.js";import{Ac as ct,Bb as E,Cb as T,Db as u,Eb as i,F as k,Fb as r,Gb as y,Hc as q,I as S,Kc as h,Nb as j,Rb as b,Tb as f,Ua as d,Ub as rt,Vb as it,W as Z,Wb as lt,X,Xb as st,Y as tt,Yb as $,Zb as U,_ as F,aa as g,bc as w,dc as H,fa as L,fc as l,ga as z,gc as p,hb as I,hc as W,ib as nt,ic as dt,jb as at,na as P,nb as ot,nc as D,qc as A,ra as m,sc as B,w as Y,wb as O,xa as et,xb as v,yb as _}from"./chunk-WSRVDFF3.js";import"./chunk-IMPBB4AK.js";var Ne=["button"],Ge=["*"];function Ve(o,n){if(o&1&&(i(0,"div",2),y(1,"mat-pseudo-checkbox",6),r()),o&2){let t=f();d(),u("disabled",t.disabled)}}var Se=new F("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1,disabledInteractive:!1})}),Ee=new F("MatButtonToggleGroup"),Fe={provide:Gt,useExisting:Z(()=>J),multi:!0},N=class{source;value;constructor(n,t){this.source=n,this.value=t}},J=(()=>{class o{_changeDetector=g(q);_dir=g(xt,{optional:!0});_multiple=!1;_disabled=!1;_disabledInteractive=!1;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(t){this._name=t,this._markButtonsForCheck()}_name=g(Q).getId("mat-button-toggle-group-");vertical=!1;get value(){let t=this._selectionModel?this._selectionModel.selected:[];return this.multiple?t.map(e=>e.value):t[0]?t[0].value:void 0}set value(t){this._setSelectionByValue(t),this.valueChange.emit(this.value)}valueChange=new P;get selected(){let t=this._selectionModel?this._selectionModel.selected:[];return this.multiple?t:t[0]||null}get multiple(){return this._multiple}set multiple(t){this._multiple=t,this._markButtonsForCheck()}get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._markButtonsForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(t){this._disabledInteractive=t,this._markButtonsForCheck()}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}change=new P;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(t){this._hideSingleSelectionIndicator=t,this._markButtonsForCheck()}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(t){this._hideMultipleSelectionIndicator=t,this._markButtonsForCheck()}_hideMultipleSelectionIndicator;constructor(){let t=g(Se,{optional:!0});this.appearance=t&&t.appearance?t.appearance:"standard",this._hideSingleSelectionIndicator=t?.hideSingleSelectionIndicator??!1,this._hideMultipleSelectionIndicator=t?.hideMultipleSelectionIndicator??!1}ngOnInit(){this._selectionModel=new de(this.multiple,void 0,!1)}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(t=>t.checked)),this.multiple||this._initializeTabIndex()}writeValue(t){this.value=t,this._changeDetector.markForCheck()}registerOnChange(t){this._controlValueAccessorChangeFn=t}registerOnTouched(t){this._onTouched=t}setDisabledState(t){this.disabled=t}_keydown(t){if(this.multiple||this.disabled||ht(t))return;let a=t.target.id,s=this._buttonToggles.toArray().findIndex(M=>M.buttonId===a),c=null;switch(t.keyCode){case 32:case 13:c=this._buttonToggles.get(s)||null;break;case 38:c=this._getNextButton(s,-1);break;case 37:c=this._getNextButton(s,this.dir==="ltr"?-1:1);break;case 40:c=this._getNextButton(s,1);break;case 39:c=this._getNextButton(s,this.dir==="ltr"?1:-1);break;default:return}c&&(t.preventDefault(),c._onButtonClick(),c.focus())}_emitChangeEvent(t){let e=new N(t,this.value);this._rawValue=e.value,this._controlValueAccessorChangeFn(e.value),this.change.emit(e)}_syncButtonToggle(t,e,a=!1,s=!1){!this.multiple&&this.selected&&!t.checked&&(this.selected.checked=!1),this._selectionModel?e?this._selectionModel.select(t):this._selectionModel.deselect(t):s=!0,s?Promise.resolve().then(()=>this._updateModelValue(t,a)):this._updateModelValue(t,a)}_isSelected(t){return this._selectionModel&&this._selectionModel.isSelected(t)}_isPrechecked(t){return typeof this._rawValue>"u"?!1:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(e=>t.value!=null&&e===t.value):t.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(t=>{t.tabIndex=-1}),this.selected)this.selected.tabIndex=0;else for(let t=0;t<this._buttonToggles.length;t++){let e=this._buttonToggles.get(t);if(!e.disabled){e.tabIndex=0;break}}}_getNextButton(t,e){let a=this._buttonToggles;for(let s=1;s<=a.length;s++){let c=(t+e*s+a.length)%a.length,M=a.get(c);if(M&&!M.disabled)return M}return null}_setSelectionByValue(t){if(this._rawValue=t,!this._buttonToggles)return;let e=this._buttonToggles.toArray();if(this.multiple&&t?(Array.isArray(t),this._clearSelection(),t.forEach(a=>this._selectValue(a,e))):(this._clearSelection(),this._selectValue(t,e)),!this.multiple&&e.every(a=>a.tabIndex===-1)){for(let a of e)if(!a.disabled){a.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(t=>{t.checked=!1,this.multiple||(t.tabIndex=-1)})}_selectValue(t,e){for(let a of e)if(a.value===t){a.checked=!0,this._selectionModel.select(a),this.multiple||(a.tabIndex=0);break}}_updateModelValue(t,e){e&&this._emitChangeEvent(t),this.valueChange.emit(this.value)}_markButtonsForCheck(){this._buttonToggles?.forEach(t=>t._markForCheck())}static \u0275fac=function(e){return new(e||o)};static \u0275dir=at({type:o,selectors:[["mat-button-toggle-group"]],contentQueries:function(e,a,s){if(e&1&&lt(s,G,5),e&2){let c;$(c=U())&&(a._buttonToggles=c)}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(e,a){e&1&&b("keydown",function(c){return a._keydown(c)}),e&2&&(O("role",a.multiple?"group":"radiogroup")("aria-disabled",a.disabled),H("mat-button-toggle-vertical",a.vertical)("mat-button-toggle-group-appearance-standard",a.appearance==="standard"))},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",h],value:"value",multiple:[2,"multiple","multiple",h],disabled:[2,"disabled","disabled",h],disabledInteractive:[2,"disabledInteractive","disabledInteractive",h],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",h],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",h]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[D([Fe,{provide:Ee,useExisting:o}])]})}return o})(),G=(()=>{class o{_changeDetectorRef=g(q);_elementRef=g(et);_focusMonitor=g(pt);_idGenerator=g(Q);_animationDisabled=mt();_checked=!1;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return`${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(t){this._tabIndex.set(t)}_tabIndex;disableRipple=!1;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(t){this._appearance=t}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(t){t!==this._checked&&(this._checked=t,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(t){this._disabled=t}_disabled=!1;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(t){this._disabledInteractive=t}_disabledInteractive;change=new P;constructor(){g(bt).load(vt);let t=g(Ee,{optional:!0}),e=g(new ct("tabindex"),{optional:!0})||"",a=g(Se,{optional:!0});this._tabIndex=m(parseInt(e)||0),this.buttonToggleGroup=t,this._appearance=a&&a.appearance?a.appearance:"standard",this._disabledInteractive=a?.disabledInteractive??!1}ngOnInit(){let t=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),t&&(t._isPrechecked(this)?this.checked=!0:t._isSelected(this)!==this._checked&&t._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let t=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),t&&t._isSelected(this)&&t._syncButtonToggle(this,!1,!1,!0)}focus(t){this._buttonElement.nativeElement.focus(t)}_onButtonClick(){if(this.disabled)return;let t=this.isSingleSelector()?!0:!this._checked;if(t!==this._checked&&(this._checked=t,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let e=this.buttonToggleGroup._buttonToggles.find(a=>a.tabIndex===0);e&&(e.tabIndex=-1),this.tabIndex=0}this.change.emit(new N(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(e){return new(e||o)};static \u0275cmp=I({type:o,selectors:[["mat-button-toggle"]],viewQuery:function(e,a){if(e&1&&st(Ne,5),e&2){let s;$(s=U())&&(a._buttonElement=s.first)}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(e,a){e&1&&b("focus",function(){return a.focus()}),e&2&&(O("aria-label",null)("aria-labelledby",null)("id",a.id)("name",null),H("mat-button-toggle-standalone",!a.buttonToggleGroup)("mat-button-toggle-checked",a.checked)("mat-button-toggle-disabled",a.disabled)("mat-button-toggle-disabled-interactive",a.disabledInteractive)("mat-button-toggle-appearance-standard",a.appearance==="standard"))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",h],appearance:"appearance",checked:[2,"checked","checked",h],disabled:[2,"disabled","disabled",h],disabledInteractive:[2,"disabledInteractive","disabledInteractive",h]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:Ge,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(e,a){if(e&1&&(rt(),i(0,"button",1,0),b("click",function(){return a._onButtonClick()}),v(2,Ve,2,1,"div",2),i(3,"span",3),it(4),r()(),y(5,"span",4)(6,"span",5)),e&2){let s=w(1);u("id",a.buttonId)("disabled",a.disabled&&!a.disabledInteractive||null),O("role",a.isSingleSelector()?"radio":"button")("tabindex",a.disabled&&!a.disabledInteractive?-1:a.tabIndex)("aria-pressed",a.isSingleSelector()?null:a.checked)("aria-checked",a.isSingleSelector()?a.checked:null)("name",a._getButtonName())("aria-label",a.ariaLabel)("aria-labelledby",a.ariaLabelledby)("aria-disabled",a.disabled&&a.disabledInteractive?"true":null),d(2),_(a.buttonToggleGroup&&(!a.buttonToggleGroup.multiple&&!a.buttonToggleGroup.hideSingleSelectionIndicator||a.buttonToggleGroup.multiple&&!a.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),d(4),u("matRippleTrigger",s)("matRippleDisabled",a.disableRipple||a.disabled)}},dependencies:[yt,ft],styles:[`.mat-button-toggle-standalone,
.mat-button-toggle-group {
  position: relative;
  display: inline-flex;
  flex-direction: row;
  white-space: nowrap;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  border-radius: var(--mat-button-toggle-legacy-shape);
  transform: translateZ(0);
}
.mat-button-toggle-standalone:not([class*=mat-elevation-z]),
.mat-button-toggle-group:not([class*=mat-elevation-z]) {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone,
  .mat-button-toggle-group {
    outline: solid 1px;
  }
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
.mat-button-toggle-group-appearance-standard {
  border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,
.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),
.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]) {
  box-shadow: none;
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
  .mat-button-toggle-group-appearance-standard {
    outline: 0;
  }
}

.mat-button-toggle-vertical {
  flex-direction: column;
}
.mat-button-toggle-vertical .mat-button-toggle-label-content {
  display: block;
}

.mat-button-toggle {
  white-space: nowrap;
  position: relative;
  color: var(--mat-button-toggle-legacy-text-color);
  font-family: var(--mat-button-toggle-legacy-label-text-font);
  font-size: var(--mat-button-toggle-legacy-label-text-size);
  line-height: var(--mat-button-toggle-legacy-label-text-line-height);
  font-weight: var(--mat-button-toggle-legacy-label-text-weight);
  letter-spacing: var(--mat-button-toggle-legacy-label-text-tracking);
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-legacy-selected-state-text-color);
}
.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-legacy-focus-state-layer-opacity);
}
.mat-button-toggle .mat-icon svg {
  vertical-align: top;
}

.mat-button-toggle-checkbox-wrapper {
  display: inline-block;
  justify-content: flex-start;
  align-items: center;
  width: 0;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate3d(0, -50%, 0);
}
[dir=rtl] .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 16px;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: 12px;
}
[dir=rtl] .mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 12px;
}
.mat-button-toggle-checked .mat-button-toggle-checkbox-wrapper {
  width: 18px;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-checkbox-wrapper {
  transition: width 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-checkbox-wrapper {
  transition: none;
}

.mat-button-toggle-checked {
  color: var(--mat-button-toggle-legacy-selected-state-text-color);
  background-color: var(--mat-button-toggle-legacy-selected-state-background-color);
}

.mat-button-toggle-disabled {
  pointer-events: none;
  color: var(--mat-button-toggle-legacy-disabled-state-text-color);
  background-color: var(--mat-button-toggle-legacy-disabled-state-background-color);
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-legacy-disabled-state-text-color);
}
.mat-button-toggle-disabled.mat-button-toggle-checked {
  background-color: var(--mat-button-toggle-legacy-disabled-selected-state-background-color);
}

.mat-button-toggle-disabled-interactive {
  pointer-events: auto;
}

.mat-button-toggle-appearance-standard {
  color: var(--mat-button-toggle-text-color, var(--mat-sys-on-surface));
  background-color: var(--mat-button-toggle-background-color, transparent);
  font-family: var(--mat-button-toggle-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-toggle-label-text-size, var(--mat-sys-label-large-size));
  line-height: var(--mat-button-toggle-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-weight: var(--mat-button-toggle-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-button-toggle-label-text-tracking, var(--mat-sys-label-large-tracking));
}
.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: none;
  border-top: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-checked {
  color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-toggle-selected-state-background-color, var(--mat-sys-secondary-container));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled {
  color: var(--mat-button-toggle-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-state-background-color, transparent);
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked {
  color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-selected-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
  background-color: var(--mat-button-toggle-state-layer-color, var(--mat-sys-on-surface));
}
.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-button-toggle-appearance-standard.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
@media (hover: none) {
  .mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
    display: none;
  }
}

.mat-button-toggle-label-content {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  padding: 0 16px;
  line-height: var(--mat-button-toggle-legacy-height);
  position: relative;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-label-content {
  padding: 0 12px;
  line-height: var(--mat-button-toggle-height, 40px);
}

.mat-button-toggle-label-content > * {
  vertical-align: middle;
}

.mat-button-toggle-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background-color: var(--mat-button-toggle-legacy-state-layer-color);
}

@media (forced-colors: active) {
  .mat-button-toggle-checked .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
    opacity: 0.5;
    height: 0;
  }
  .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay {
    opacity: 0.6;
  }
  .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
  }
}
.mat-button-toggle .mat-button-toggle-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}

.mat-button-toggle-button {
  border: 0;
  background: none;
  color: inherit;
  padding: 0;
  margin: 0;
  font: inherit;
  outline: none;
  width: 100%;
  cursor: pointer;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-button {
  transition: padding 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-button {
  transition: none;
}
.mat-button-toggle-disabled .mat-button-toggle-button {
  cursor: default;
}
.mat-button-toggle-button::-moz-focus-inner {
  border: 0;
}
.mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 30px;
}
[dir=rtl] .mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 0;
  padding-right: 30px;
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard {
  --mat-focus-indicator-border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
`],encapsulation:2,changeDetection:0})}return o})(),Te=(()=>{class o{static \u0275fac=function(e){return new(e||o)};static \u0275mod=nt({type:o});static \u0275inj=tt({imports:[Mt,G,Ct]})}return o})();var V=class o{api=g(St);getEarningCategories(){return this.api.get("earnings/categories")}createEarningCategory(n){return this.api.post("earnings/categories",n)}getEarnings(n={}){return this.api.get("earnings",this.toParams(n))}getEarningSummary(n={}){return this.api.get("earnings/summary",this.toParams(n))}createEarning(n){return this.api.post("earnings",n)}toParams(n){return Object.fromEntries(Object.entries(n).filter(([,t])=>t!==void 0&&t!=="").map(([t,e])=>[t,String(e)]))}static \u0275fac=function(t){return new(t||o)};static \u0275prov=X({token:o,factory:o.\u0275fac,providedIn:"root"})};var we=(o,n)=>n._id,ze=(o,n)=>n.value,je=(o,n)=>n.periodKey;function $e(o,n){if(o&1&&y(0,"app-loader",8),o&2){let t=f();u("overlay",!0)("text",t.saving()?"Saving earning...":"Loading earnings...")}}function Ue(o,n){if(o&1&&(i(0,"mat-option",23)(1,"span",36)(2,"span",37),l(3),r(),i(4,"span",38)(5,"strong"),l(6),r(),i(7,"span"),l(8),r()()()()),o&2){let t=n.$implicit;u("value",t),d(),u("title",((t.currency==null?null:t.currency.symbol)||"")+" - "+((t.currency==null?null:t.currency.code)||t.iso3||t.name)+" ("+((t.currency==null?null:t.currency.name)||t.name)+")"),d(2),p((t.currency==null?null:t.currency.symbol)||t.emoji),d(3),p((t.currency==null?null:t.currency.code)||t.iso3||t.name),d(2),p((t.currency==null?null:t.currency.name)||t.name)}}function He(o,n){if(o&1&&(i(0,"mat-option",23),l(1),r()),o&2){let t=n.$implicit;u("value",t._id),d(),W(" ",t.name," ")}}function We(o,n){if(o&1&&(i(0,"mat-button-toggle",23),l(1),r()),o&2){let t=n.$implicit;u("value",t.value),d(),p(t.label)}}function qe(o,n){if(o&1&&(i(0,"div",31)(1,"span")(2,"strong"),l(3),r(),i(4,"small"),l(5),r()(),i(6,"b"),l(7),A(8,"currency"),r()()),o&2){let t=n.$implicit,e=f();d(3),p(e.formatPeriodLabel(t)),d(2),W("",t.count," records"),d(2),p(B(8,3,t.totalAmount,e.selectedCurrencyCode(),"symbol","1.0-0"))}}function Ke(o,n){o&1&&(i(0,"p",32),l(1,"No earning summary available yet."),r())}function Qe(o,n){o&1&&l(0," Loading... ")}function Je(o,n){o&1&&l(0," View more ")}function Ye(o,n){if(o&1){let t=j();i(0,"button",39),b("click",function(){L(t);let a=f();return z(a.loadMoreSummary())}),v(1,Qe,1,0)(2,Je,1,0),r()}if(o&2){let t=f();u("disabled",t.loadingMoreSummary()),d(),_(t.loadingMoreSummary()?1:2)}}function Ze(o,n){if(o&1&&(i(0,"div",35)(1,"span",40)(2,"mat-icon",5),l(3),r()(),i(4,"span")(5,"strong"),l(6),r(),i(7,"small"),l(8),r()(),i(9,"b"),l(10),A(11,"currency"),r()()),o&2){let t=n.$implicit,e=f();d(3),p(t.category.icon||"trending_up"),d(3),p(t.description),d(2),dt("",e.formatDate(t.date)," \xB7 ",t.category.name),d(2),p(B(11,5,t.amount,e.earningCurrencyCode(t),"symbol","1.0-0"))}}function Xe(o,n){o&1&&(i(0,"p",32),l(1,"No earnings added yet."),r())}function tn(o,n){o&1&&l(0," Loading... ")}function en(o,n){o&1&&l(0," View more ")}function nn(o,n){if(o&1){let t=j();i(0,"button",39),b("click",function(){L(t);let a=f();return z(a.loadMoreEarnings())}),v(1,tn,1,0)(2,en,1,0),r()}if(o&2){let t=f();u("disabled",t.loadingMoreEarnings()),d(),_(t.loadingMoreEarnings()?1:2)}}var Pe=class o{earningApi=g(V);expenseApi=g(he);authState=g(Et);dialog=g(Ot);snackBar=g(le);datePipe=g(K);categories=m([]);earnings=m([]);earningSummary=m([]);earningPagination=m(null);summaryPagination=m(null);countries=m([]);countrySearch=new C("",{nonNullable:!0});countrySearchTerm=m("");loading=m(!1);loadingMoreEarnings=m(!1);loadingMoreSummary=m(!1);saving=m(!1);maxEarningDate=new Date;summaryPeriod=m("month");summaryLimit=6;earningLimit=6;periodOptions=[{value:"day",label:"Day"},{value:"week",label:"Week"},{value:"month",label:"Month"},{value:"year",label:"Year"}];form=new zt({amount:new C(null,[x.required,x.min(.01)]),date:new C(this.maxEarningDate,[x.required]),country:new C("",{nonNullable:!0,validators:[x.required]}),category:new C("",{nonNullable:!0,validators:[x.required]}),description:new C("",{nonNullable:!0,validators:[x.required,x.maxLength(200)]}),notes:new C("",{nonNullable:!0})});ngOnInit(){this.loadData(),this.countrySearch.valueChanges.subscribe(n=>{this.countrySearchTerm.set(n);let t=this.countries().find(e=>e._id===this.form.controls.country.value);t&&n!==R(t)&&this.form.controls.country.setValue("")})}filteredCountries(){return Ce(this.countries(),this.countrySearchTerm())}selectCountry(n){let t=n.option.value;this.form.controls.country.setValue(t._id);let e=R(t);this.countrySearch.setValue(e,{emitEvent:!1}),this.countrySearchTerm.set(e)}latestSummaryTotal(){return this.earningSummary()[0]?.totalAmount??0}latestSummaryLabel(){let n=this.earningSummary()[0];return n?this.formatPeriodLabel(n):`No ${this.summaryPeriod()} earnings`}summaryTitle(){return`${this.periodOptions.find(t=>t.value===this.summaryPeriod())?.label??"Month"} wise earnings`}canLoadMoreSummary(){return!!this.summaryPagination()?.hasMore&&!this.loadingMoreSummary()}canLoadMoreEarnings(){return!!this.earningPagination()?.hasMore&&!this.loadingMoreEarnings()}selectedCurrencyCode(){return this.countries().find(t=>t._id===this.form.controls.country.value)?.currency?.code??"INR"}earningCurrencyCode(n){return n.country?.currency?.code??this.selectedCurrencyCode()}addCategory(){this.dialog.open(xe,{width:"520px",maxWidth:"calc(100vw - 32px)",autoFocus:!1,data:{title:"Add Earning Category",description:"Create a custom income source category.",nameLabel:"Category name",submitText:"Add Category",defaultIcon:"trending_up",defaultColor:"green",existingNames:this.categories().map(n=>n.name)}}).afterClosed().pipe(k(1)).subscribe(n=>{n&&this.earningApi.createEarningCategory(n).pipe(k(1)).subscribe({next:t=>{let e=t.data.earningCategory;e&&(this.categories.update(a=>[...a,e]),this.form.controls.category.setValue(e._id))},error:()=>this.snackBar.open("Could not create earning category","Close",{duration:2500})})})}saveEarning(){if(this.form.invalid){this.form.markAllAsTouched();return}let n=this.form.getRawValue();this.saving.set(!0),this.earningApi.createEarning({amount:Number(n.amount),date:ye(n.date??new Date),category:n.category,country:n.country,description:n.description,notes:n.notes||void 0}).pipe(k(1),S(()=>this.saving.set(!1))).subscribe({next:t=>{let e=t.data.earning;e&&this.earnings.update(a=>[e,...a]),this.loadSummary(!0),this.loadEarnings(!0),this.form.patchValue({amount:null,description:"",notes:""}),this.snackBar.open("Earning added","Close",{duration:2500})},error:()=>this.snackBar.open("Could not add earning","Close",{duration:2500})})}formatDate(n){return this.datePipe.transform(n,"MMM d")??""}formatPeriodLabel(n){if(n.period==="year")return n.periodKey;if(n.period==="month"){let[t,e]=n.periodKey.split("-").map(Number);return this.datePipe.transform(new Date(t,e-1,1),"MMM y")??n.periodKey}if(n.period==="week"){let[t,e]=n.periodKey.split("-W");return`Week ${Number(e)}, ${t}`}return this.datePipe.transform(n.periodKey,"MMM d, y")??n.periodKey}changeSummaryPeriod(n){this.summaryPeriod()!==n&&(this.summaryPeriod.set(n),this.loadSummary(!0))}loadMoreSummary(){let n=this.summaryPagination();n?.hasMore&&this.loadSummary(!1,n.page+1)}loadMoreEarnings(){let n=this.earningPagination();n?.hasMore&&this.loadEarnings(!1,n.page+1)}loadData(){this.loading.set(!0),Y({categories:this.earningApi.getEarningCategories(),earnings:this.earningApi.getEarnings({page:1,limit:this.earningLimit}),summary:this.earningApi.getEarningSummary({period:this.summaryPeriod(),page:1,limit:this.summaryLimit}),countries:this.expenseApi.getUniqueCurrencyCountries()}).pipe(k(1),S(()=>this.loading.set(!1))).subscribe({next:({categories:n,earnings:t,summary:e,countries:a})=>{let s=a.data.countries??[];this.categories.set(n.data.earningCategories??[]),this.earnings.set(t.data.earnings??[]),this.earningPagination.set(t.data.pagination??null),this.earningSummary.set(e.data.rows??[]),this.summaryPagination.set(e.data.pagination??null),this.countries.set(s),this.setDefaultCurrencyCountry(s)},error:()=>this.snackBar.open("Could not load earnings","Close",{duration:2500})})}loadSummary(n,t=1){let e=n?this.loading:this.loadingMoreSummary;e.set(!0),this.earningApi.getEarningSummary({period:this.summaryPeriod(),page:t,limit:this.summaryLimit}).pipe(k(1),S(()=>e.set(!1))).subscribe({next:a=>{let s=a.data.rows??[];this.earningSummary.update(c=>n?s:[...c,...s]),this.summaryPagination.set(a.data.pagination??null)},error:()=>this.snackBar.open("Could not load earning summary","Close",{duration:2500})})}loadEarnings(n,t=1){let e=n?this.loading:this.loadingMoreEarnings;e.set(!0),this.earningApi.getEarnings({page:t,limit:this.earningLimit}).pipe(k(1),S(()=>e.set(!1))).subscribe({next:a=>{let s=a.data.earnings??[];this.earnings.update(c=>n?s:[...c,...s]),this.earningPagination.set(a.data.pagination??null)},error:()=>this.snackBar.open("Could not load earnings","Close",{duration:2500})})}setDefaultCurrencyCountry(n){if(this.form.controls.country.value||!n.length)return;let t=Me(n,this.authState.user()?.country);if(!t)return;let e=R(t);this.form.controls.country.setValue(t._id),this.countrySearch.setValue(e,{emitEvent:!1}),this.countrySearchTerm.set(e)}static \u0275fac=function(t){return new(t||o)};static \u0275cmp=I({type:o,selectors:[["app-earnings"]],features:[D([K])],decls:94,vars:22,consts:[["earningDatePicker",""],["countryAuto","matAutocomplete"],[1,"earnings-page"],[1,"page-header"],["mat-flat-button","","type","button",1,"save-button",3,"click","disabled"],["aria-hidden","true"],[1,"content-grid"],["appearance","outlined",1,"form-card"],[3,"overlay","text"],[1,"earning-form",3,"formGroup"],[1,"two-column"],["appearance","outline"],["matPrefix","","aria-hidden","true"],["matInput","","type","number","formControlName","amount","placeholder","0.00"],["matInput","","formControlName","date",3,"matDatepicker","max"],["matIconSuffix","",3,"for"],["matInput","","placeholder","Search country or currency","autocomplete","off",3,"formControl","matAutocomplete"],[1,"country-autocomplete-panel",3,"optionSelected"],["itemSize","52",1,"country-viewport"],[3,"value",4,"cdkVirtualFor","cdkVirtualForOf"],[1,"category-header"],["mat-button","","type","button",3,"click"],["formControlName","category"],[3,"value"],["matInput","","formControlName","description","placeholder","e.g. June salary"],["matInput","","formControlName","notes","rows","3"],[1,"summary-stack"],["appearance","outlined",1,"summary-card"],["appearance","outlined",1,"list-card"],["aria-label","Earning summary period",1,"period-toggle",3,"valueChange","value"],[1,"summary-list"],[1,"summary-row"],[1,"empty-text"],["mat-button","","type","button",1,"load-more-button",3,"disabled"],[1,"earning-list"],[1,"earning-row"],[1,"country-option",3,"title"],[1,"country-option__symbol"],[1,"country-option__details"],["mat-button","","type","button",1,"load-more-button",3,"click","disabled"],[1,"earning-icon"]],template:function(t,e){if(t&1&&(i(0,"section",2)(1,"header",3)(2,"div")(3,"h1"),l(4,"Earnings"),r(),i(5,"p"),l(6,"Track salary, rental income, dividends, and other money coming in."),r()(),i(7,"button",4),b("click",function(){return e.saveEarning()}),i(8,"mat-icon",5),l(9,"add_circle"),r(),l(10," Add Earning "),r()(),i(11,"div",6)(12,"mat-card",7),v(13,$e,1,2,"app-loader",8),i(14,"mat-card-content")(15,"form",9)(16,"div",10)(17,"mat-form-field",11)(18,"mat-label"),l(19,"Amount"),r(),i(20,"mat-icon",12),l(21,"payments"),r(),y(22,"input",13),r(),i(23,"mat-form-field",11)(24,"mat-label"),l(25,"Date"),r(),y(26,"input",14)(27,"mat-datepicker-toggle",15)(28,"mat-datepicker",null,0),r()(),i(30,"mat-form-field",11)(31,"mat-label"),l(32,"Currency"),r(),i(33,"mat-icon",12),l(34,"search"),r(),y(35,"input",16),i(36,"mat-autocomplete",17,1),b("optionSelected",function(s){return e.selectCountry(s)}),i(38,"cdk-virtual-scroll-viewport",18),ot(39,Ue,9,5,"mat-option",19),r()()(),i(40,"div",20)(41,"h2"),l(42,"Category"),r(),i(43,"button",21),b("click",function(){return e.addCategory()}),l(44,"Add category"),r()(),i(45,"mat-form-field",11)(46,"mat-label"),l(47,"Earning category"),r(),i(48,"mat-select",22),E(49,He,2,2,"mat-option",23,we),r()(),i(51,"mat-form-field",11)(52,"mat-label"),l(53,"Description"),r(),i(54,"mat-icon",12),l(55,"description"),r(),y(56,"input",24),r(),i(57,"mat-form-field",11)(58,"mat-label"),l(59,"Notes"),r(),y(60,"textarea",25),r()()()(),i(61,"aside",26)(62,"mat-card",27)(63,"mat-card-content")(64,"span"),l(65),r(),i(66,"strong"),l(67),A(68,"currency"),r(),i(69,"small"),l(70),r()()(),i(71,"mat-card",28)(72,"mat-card-header")(73,"mat-card-title"),l(74,"Earning Summary"),r()(),i(75,"mat-card-content")(76,"mat-button-toggle-group",29),b("valueChange",function(s){return e.changeSummaryPeriod(s)}),E(77,We,2,2,"mat-button-toggle",23,ze),r(),i(79,"div",30),E(80,qe,9,8,"div",31,je,!1,Ke,2,0,"p",32),r(),v(83,Ye,3,2,"button",33),r()(),i(84,"mat-card",28)(85,"mat-card-header")(86,"mat-card-title"),l(87,"Recent Earnings"),r()(),i(88,"mat-card-content")(89,"div",34),E(90,Ze,12,10,"div",35,we,!1,Xe,2,0,"p",32),r(),v(93,nn,3,2,"button",33),r()()()()()),t&2){let a,s,c=w(29),M=w(37);d(7),u("disabled",e.saving()),d(6),_(e.loading()||e.saving()?13:-1),d(2),u("formGroup",e.form),d(11),u("matDatepicker",c)("max",e.maxEarningDate),d(),u("for",c),d(8),u("formControl",e.countrySearch)("matAutocomplete",M),d(4),u("cdkVirtualForOf",e.filteredCountries()),d(10),T(e.categories()),d(16),p(e.latestSummaryLabel()),d(2),p(B(68,17,e.latestSummaryTotal(),e.selectedCurrencyCode(),"symbol","1.0-0")),d(3),p(e.summaryTitle()),d(6),u("value",e.summaryPeriod()),d(),T(e.periodOptions),d(3),T(e.earningSummary()),d(3),_((a=e.summaryPagination())!=null&&a.hasMore?83:-1),d(7),T(e.earnings()),d(3),_((s=e.earningPagination())!=null&&s.hasMore?93:-1)}},dependencies:[ut,It,Tt,Pt,wt,qt,jt,Vt,$t,Ft,Lt,Ut,Wt,Ht,_e,fe,_t,ve,Bt,At,Te,J,G,ie,ne,oe,re,ae,me,ce,ge,ue,Dt,Zt,Yt,Kt,Qt,Jt,Nt,Rt,te,Xt,kt,be,pe,se,ee,gt],styles:[".earnings-page[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface)}.save-button[_ngcontent-%COMP%]{--mdc-filled-button-container-shape: 8px}.content-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(300px,.8fr);gap:22px}.form-card[_ngcontent-%COMP%], .summary-card[_ngcontent-%COMP%], .list-card[_ngcontent-%COMP%]{position:relative;--mdc-outlined-card-container-color: var(--mat-sys-surface-container-low, var(--mat-sys-surface));--mdc-outlined-card-outline-color: var(--mat-sys-outline-variant);border-radius:12px;box-shadow:var(--mat-sys-level1)}.form-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%], .summary-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%], .list-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:22px}.earning-form[_ngcontent-%COMP%]{display:grid;gap:14px}.two-column[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.category-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:12px}.category-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0;font-size:16px;font-weight:800}.summary-stack[_ngcontent-%COMP%]{display:grid;gap:18px;align-content:start}.summary-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .summary-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant)}.summary-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block;font-size:13px;font-weight:700}.summary-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{display:block;margin:10px 0 8px;color:var(--mat-sys-primary);font-size:30px;line-height:1}.list-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]{padding:22px 22px 0}.earning-list[_ngcontent-%COMP%]{display:grid;gap:12px}.period-toggle[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));width:100%;margin-bottom:14px;border-radius:8px;overflow:hidden}.summary-list[_ngcontent-%COMP%]{display:grid;gap:10px}.summary-row[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px;border:1px solid var(--mat-sys-outline-variant);border-radius:8px;background:var(--mat-sys-surface-container-lowest, var(--mat-sys-surface))}.summary-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:grid;gap:3px;min-width:0}.summary-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .summary-row[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.summary-row[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant);font-size:12px}.summary-row[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{flex:0 0 auto;color:var(--mat-sys-primary)}.earning-row[_ngcontent-%COMP%]{display:grid;grid-template-columns:42px minmax(0,1fr) auto;align-items:center;gap:12px;padding:12px;border:1px solid var(--mat-sys-outline-variant);border-radius:8px;background:var(--mat-sys-surface-container-lowest, var(--mat-sys-surface))}.earning-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2){display:grid;gap:3px;min-width:0}.earning-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .earning-row[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.earning-row[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant);font-size:12px}.earning-row[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{color:var(--mat-sys-primary)}.earning-icon[_ngcontent-%COMP%]{display:grid;place-items:center;width:40px;height:40px;border-radius:10px;background:color-mix(in srgb,var(--mat-sys-primary) 16%,transparent);color:var(--mat-sys-primary)}.empty-text[_ngcontent-%COMP%]{margin:0;color:var(--mat-sys-on-surface-variant)}.load-more-button[_ngcontent-%COMP%]{width:100%;margin-top:12px}[_nghost-%COMP%]     .earning-form .mat-mdc-form-field-subscript-wrapper{display:none}@media(max-width:860px){.content-grid[_ngcontent-%COMP%], .two-column[_ngcontent-%COMP%]{grid-template-columns:1fr}.page-header[_ngcontent-%COMP%]{display:grid}.page-header[_ngcontent-%COMP%]   .save-button[_ngcontent-%COMP%]{width:100%}}"]})};export{Pe as Earnings};
