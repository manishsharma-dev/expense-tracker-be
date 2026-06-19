import{a as Qe,b as He}from"./chunk-IN5MKPIL.js";import{a as Ke}from"./chunk-RZ3JYO5G.js";import{B as Le,C as Ve,E as Ge,F as qe,a as Me,b as Ie,c as Pe,d as w,f as we,g as Ae,h as D,j as x,k as Oe,l as Ee,m as Be,o as Te,p as Se,q as ze,r as Fe,t as Re,u as De,x as Ne}from"./chunk-UY64HFF6.js";import{a as _e}from"./chunk-EWW36L4K.js";import"./chunk-55UR6C6K.js";import{a as Ze,b as Je}from"./chunk-7OHZ2OJK.js";import{a as Ue,c as Xe,e as $e}from"./chunk-TZTZD4CL.js";import"./chunk-2ZBATVTK.js";import{b as fe,c as ve,d as ye,e as Ce,f as je}from"./chunk-FZTK47QI.js";import{C as ue,O as ke,P as pe,R as ge,V as xe,g as he,q as be}from"./chunk-W5LVCH4T.js";import{g as le,h as se}from"./chunk-EE4OMZLE.js";import{Ac as re,Bb as Y,Cb as W,Db as h,Eb as i,F as E,Fb as o,Gb as b,Hc as de,I as B,Kc as k,Lc as me,Ob as ee,Rb as g,Tb as M,Ua as d,Ub as te,Vb as ne,W as q,X as j,Xb as ce,Y as U,Yb as z,Zb as F,_ as X,aa as s,bc as ae,dc as f,ec as oe,fc as r,gc as _,ha as $,hb as v,hc as R,ia as Q,ib as K,na as T,nc as ie,oa as H,qc as I,ra as p,sc as P,ua as Z,w as G,wb as S,xa as J,xb as y,yb as C}from"./chunk-XPPZ5RGI.js";import"./chunk-IMPBB4AK.js";var tt=["input"],nt=["label"],ct=["*"],N={color:"accent",clickAction:"check-indeterminate",disabledInteractive:!1},at=new X("mat-checkbox-default-options",{providedIn:"root",factory:()=>N}),l=(function(c){return c[c.Init=0]="Init",c[c.Checked=1]="Checked",c[c.Unchecked=2]="Unchecked",c[c.Indeterminate=3]="Indeterminate",c})(l||{}),L=class{source;checked},V=(()=>{class c{_elementRef=s(J);_changeDetectorRef=s(de);_ngZone=s(H);_animationsDisabled=he();_options=s(at,{optional:!0});focus(){this._inputElement.nativeElement.focus()}_createChangeEvent(e){let n=new L;return n.source=this,n.checked=e,n}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:"mdc-checkbox--anim-unchecked-checked",uncheckedToIndeterminate:"mdc-checkbox--anim-unchecked-indeterminate",checkedToUnchecked:"mdc-checkbox--anim-checked-unchecked",checkedToIndeterminate:"mdc-checkbox--anim-checked-indeterminate",indeterminateToChecked:"mdc-checkbox--anim-indeterminate-checked",indeterminateToUnchecked:"mdc-checkbox--anim-indeterminate-unchecked"};ariaLabel="";ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return`${this.id||this._uniqueId}-input`}required=!1;labelPosition="after";name=null;change=new T;indeterminateChange=new T;value;disableRipple=!1;_inputElement;_labelElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass="";_currentCheckState=l.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){s(be).load(pe);let e=s(new re("tabindex"),{optional:!0});this._options=this._options||N,this.color=this._options.color||N.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=s(ue).getId("mat-mdc-checkbox-"),this.disabledInteractive=this._options?.disabledInteractive??!1}ngOnChanges(e){e.required&&this._validatorChangeFn()}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate)}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck())}_checked=!1;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck())}_disabled=!1;get indeterminate(){return this._indeterminate()}set indeterminate(e){let n=e!=this._indeterminate();this._indeterminate.set(e),n&&(e?this._transitionCheckState(l.Indeterminate):this._transitionCheckState(this.checked?l.Checked:l.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e)}_indeterminate=p(!1);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(e){this.checked=!!e}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorChangeFn=e}_transitionCheckState(e){let n=this._currentCheckState,t=this._getAnimationTargetElement();if(!(n===e||!t)&&(this._currentAnimationClass&&t.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(n,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){t.classList.add(this._currentAnimationClass);let m=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{t.classList.remove(m)},1e3)})}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked)}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!=="noop"?(this.indeterminate&&e!=="check"&&Promise.resolve().then(()=>{this._indeterminate.set(!1),this.indeterminateChange.emit(!1)}),this._checked=!this._checked,this._transitionCheckState(this._checked?l.Checked:l.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e==="noop")&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate)}_onInteractionEvent(e){e.stopPropagation()}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}_getAnimationClassForCheckStateTransition(e,n){if(this._animationsDisabled)return"";switch(e){case l.Init:if(n===l.Checked)return this._animationClasses.uncheckedToChecked;if(n==l.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case l.Unchecked:return n===l.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case l.Checked:return n===l.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case l.Indeterminate:return n===l.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return""}_syncIndeterminate(e){let n=this._inputElement;n&&(n.nativeElement.indeterminate=e)}_onInputClick(){this._handleInputClick()}_onTouchTargetClick(){this._handleInputClick(),this.disabled||this._inputElement.nativeElement.focus()}_preventBubblingFromLabel(e){e.target&&this._labelElement.nativeElement.contains(e.target)&&e.stopPropagation()}static \u0275fac=function(n){return new(n||c)};static \u0275cmp=v({type:c,selectors:[["mat-checkbox"]],viewQuery:function(n,t){if(n&1&&ce(tt,5)(nt,5),n&2){let m;z(m=F())&&(t._inputElement=m.first),z(m=F())&&(t._labelElement=m.first)}},hostAttrs:[1,"mat-mdc-checkbox"],hostVars:16,hostBindings:function(n,t){n&2&&(ee("id",t.id),S("tabindex",null)("aria-label",null)("aria-labelledby",null),oe(t.color?"mat-"+t.color:"mat-accent"),f("_mat-animation-noopable",t._animationsDisabled)("mdc-checkbox--disabled",t.disabled)("mat-mdc-checkbox-disabled",t.disabled)("mat-mdc-checkbox-checked",t.checked)("mat-mdc-checkbox-disabled-interactive",t.disabledInteractive))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],ariaExpanded:[2,"aria-expanded","ariaExpanded",k],ariaControls:[0,"aria-controls","ariaControls"],ariaOwns:[0,"aria-owns","ariaOwns"],id:"id",required:[2,"required","required",k],labelPosition:"labelPosition",name:"name",value:"value",disableRipple:[2,"disableRipple","disableRipple",k],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?void 0:me(e)],color:"color",disabledInteractive:[2,"disabledInteractive","disabledInteractive",k],checked:[2,"checked","checked",k],disabled:[2,"disabled","disabled",k],indeterminate:[2,"indeterminate","indeterminate",k]},outputs:{change:"change",indeterminateChange:"indeterminateChange"},exportAs:["matCheckbox"],features:[ie([{provide:Me,useExisting:q(()=>c),multi:!0},{provide:Pe,useExisting:c,multi:!0}]),Z],ngContentSelectors:ct,decls:15,vars:23,consts:[["checkbox",""],["input",""],["label",""],["mat-internal-form-field","",3,"click","labelPosition"],[1,"mdc-checkbox"],["aria-hidden","true",1,"mat-mdc-checkbox-touch-target",3,"click"],["type","checkbox",1,"mdc-checkbox__native-control",3,"blur","click","change","checked","indeterminate","disabled","id","required","tabIndex"],["aria-hidden","true",1,"mdc-checkbox__ripple"],["aria-hidden","true",1,"mdc-checkbox__background"],["focusable","false","viewBox","0 0 24 24",1,"mdc-checkbox__checkmark"],["fill","none","d","M1.73,12.91 8.1,19.28 22.79,4.59",1,"mdc-checkbox__checkmark-path"],[1,"mdc-checkbox__mixedmark"],["mat-ripple","","aria-hidden","true",1,"mat-mdc-checkbox-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-label",3,"for"]],template:function(n,t){if(n&1&&(te(),i(0,"div",3),g("click",function(u){return t._preventBubblingFromLabel(u)}),i(1,"div",4,0)(3,"div",5),g("click",function(){return t._onTouchTargetClick()}),o(),i(4,"input",6,1),g("blur",function(){return t._onBlur()})("click",function(){return t._onInputClick()})("change",function(u){return t._onInteractionEvent(u)}),o(),b(6,"div",7),i(7,"div",8),$(),i(8,"svg",9),b(9,"path",10),o(),Q(),b(10,"div",11),o(),b(11,"div",12),o(),i(12,"label",13,2),ne(14),o()()),n&2){let m=ae(2);h("labelPosition",t.labelPosition),d(4),f("mdc-checkbox--selected",t.checked),h("checked",t.checked)("indeterminate",t.indeterminate)("disabled",t.disabled&&!t.disabledInteractive)("id",t.inputId)("required",t.required)("tabIndex",t.disabled&&!t.disabledInteractive?-1:t.tabIndex),S("aria-label",t.ariaLabel||null)("aria-labelledby",t.ariaLabelledby)("aria-describedby",t.ariaDescribedby)("aria-checked",t.indeterminate?"mixed":null)("aria-controls",t.ariaControls)("aria-disabled",t.disabled&&t.disabledInteractive?!0:null)("aria-expanded",t.ariaExpanded)("aria-owns",t.ariaOwns)("name",t.name)("value",t.value),d(7),h("matRippleTrigger",m)("matRippleDisabled",t.disableRipple||t.disabled)("matRippleCentered",!0),d(),h("for",t.inputId)}},dependencies:[ke,_e],styles:[`.mdc-checkbox {
  display: inline-block;
  position: relative;
  flex: 0 0 18px;
  box-sizing: content-box;
  width: 18px;
  height: 18px;
  line-height: 0;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: bottom;
  padding: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  margin: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}
.mdc-checkbox:hover > .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:hover > .mat-mdc-checkbox-ripple > .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-unselected-pressed-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-hover-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-focus-state-layer-color, var(--mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--mat-checkbox-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--mat-checkbox-selected-pressed-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  background-color: var(--mat-checkbox-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--mat-checkbox-state-layer-size, 40px);
  height: var(--mat-checkbox-state-layer-size, 40px);
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  right: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - var(--mat-checkbox-state-layer-size, 40px)) / 2);
}

.mdc-checkbox--disabled {
  cursor: default;
  pointer-events: none;
}

.mdc-checkbox__background {
  display: inline-flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-radius: 2px;
  background-color: transparent;
  pointer-events: none;
  will-change: background-color, border-color;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  border-color: var(--mat-checkbox-unselected-icon-color, var(--mat-sys-on-surface-variant));
  top: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  left: calc((var(--mat-checkbox-state-layer-size, 40px) - 18px) / 2);
}

.mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}
@media (forced-colors: active) {
  .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
  .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-hover-icon-color, var(--mat-sys-on-surface));
  background-color: transparent;
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-hover-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox__native-control:focus:focus:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-unselected-focus-icon-color, var(--mat-sys-on-surface));
}

.mdc-checkbox__native-control:focus:focus:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
  background-color: var(--mat-checkbox-selected-focus-icon-color, var(--mat-sys-primary));
}

.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
  border-color: var(--mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
    border-color: GrayText;
  }
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}

.mdc-checkbox__checkmark {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);
  color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__checkmark {
    color: CanvasText;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
  color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
    color: GrayText;
  }
}

.mdc-checkbox__checkmark-path {
  transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);
  stroke: currentColor;
  stroke-width: 3.12px;
  stroke-dashoffset: 29.7833385;
  stroke-dasharray: 29.7833385;
}

.mdc-checkbox__mixedmark {
  width: 100%;
  height: 0;
  transform: scaleX(0) rotate(0deg);
  border-width: 1px;
  border-style: solid;
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  border-color: var(--mat-checkbox-selected-checkmark-color, var(--mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__mixedmark {
    margin: 0 1px;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
  border-color: var(--mat-checkbox-disabled-selected-checkmark-color, var(--mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
    border-color: GrayText;
  }
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,
.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,
.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,
.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {
  animation-duration: 180ms;
  animation-timing-function: linear;
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;
  transition: none;
}

.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {
  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear;
  transition: none;
}
.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {
  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear;
  transition: none;
}
.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;
  transition: none;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path {
  stroke-dashoffset: 0;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transition: opacity 180ms cubic-bezier(0, 0, 0.2, 1), transform 180ms cubic-bezier(0, 0, 0.2, 1);
  opacity: 1;
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(-45deg);
}

.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(0deg);
  opacity: 1;
}

@keyframes mdc-checkbox-unchecked-checked-checkmark-path {
  0%, 50% {
    stroke-dashoffset: 29.7833385;
  }
  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
  0%, 68.2% {
    transform: scaleX(0);
  }
  68.2% {
    animation-timing-function: cubic-bezier(0, 0, 0, 1);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes mdc-checkbox-checked-unchecked-checkmark-path {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    opacity: 1;
    stroke-dashoffset: 0;
  }
  to {
    opacity: 0;
    stroke-dashoffset: -29.7833385;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-checkmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(45deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-checkmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(45deg);
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(315deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {
  0% {
    animation-timing-function: linear;
    transform: scaleX(1);
    opacity: 1;
  }
  32.8%, 100% {
    transform: scaleX(0);
    opacity: 0;
  }
}
.mat-mdc-checkbox {
  display: inline-block;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-touch-target,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__native-control,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__ripple,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-ripple::before,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-checkbox label {
  cursor: pointer;
}
.mat-mdc-checkbox .mat-internal-form-field {
  color: var(--mat-checkbox-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-checkbox-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-checkbox-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-checkbox-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-checkbox-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-checkbox-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive input {
  cursor: default;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
  cursor: default;
  color: var(--mat-checkbox-disabled-label-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
    color: GrayText;
  }
}
.mat-mdc-checkbox label:empty {
  display: none;
}
.mat-mdc-checkbox .mdc-checkbox__ripple {
  opacity: 0;
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple,
.mdc-checkbox__ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-checkbox .mat-mdc-checkbox-ripple:not(:empty),
.mdc-checkbox__ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-mdc-checkbox-ripple .mat-ripple-element {
  opacity: 0.1;
}

.mat-mdc-checkbox-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-checkbox-touch-target-size, 48px);
  width: var(--mat-checkbox-touch-target-size, 48px);
  transform: translate(-50%, -50%);
  display: var(--mat-checkbox-touch-target-display, block);
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple::before {
  border-radius: 50%;
}

.mdc-checkbox__native-control:focus-visible ~ .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return c})(),We=(()=>{class c{static \u0275fac=function(n){return new(n||c)};static \u0275mod=K({type:c});static \u0275inj=U({imports:[V,ge]})}return c})();var A=class c{api=s(xe);getBudget(a){return this.api.get("budgets",{month:a})}saveBudget(a){return this.api.put("budgets",a)}static \u0275fac=function(e){return new(e||c)};static \u0275prov=j({token:c,factory:c.\u0275fac,providedIn:"root"})};var it=(c,a)=>a.controls.categoryId.value;function rt(c,a){if(c&1&&b(0,"app-loader",5),c&2){let e=M();h("overlay",!0)("text",e.saving()?"Saving budget...":"Loading budget...")}}function dt(c,a){c&1&&r(0," From total budget ")}function mt(c,a){c&1&&r(0," No total budget set ")}function lt(c,a){c&1&&(i(0,"p",15),r(1,"Category budgets cannot exceed the total budget."),o())}function st(c,a){if(c&1&&(i(0,"p"),r(1),I(2,"currency"),o()),c&2){let e=M();d(),R("",P(2,1,e.remainingAmount(),"INR","symbol","1.0-0")," available after category budgets.")}}function ht(c,a){c&1&&(i(0,"p"),r(1,"Set a total budget, or use category budgets independently."),o())}function bt(c,a){if(c&1&&(i(0,"div",20)(1,"mat-checkbox",21)(2,"span",22)(3,"mat-icon",3),r(4),o(),i(5,"span")(6,"strong"),r(7),o(),i(8,"small"),r(9),o()()()(),i(10,"mat-form-field",23)(11,"mat-label"),r(12,"Budget"),o(),b(13,"input",24),o()()),c&2){let e,n,t,m=a.$implicit,u=a.$index,O=M();h("formGroupName",u),d(4),_(((e=O.categories()[u])==null?null:e.icon)||"category"),d(3),_((n=O.categories()[u])==null?null:n.name),d(2),_((t=O.categories()[u])!=null&&t.isSystem?"Common category":"Custom category"),d(4),h("readonly",!m.controls.selected.value)}}var et=class c{budgetApi=s(A);expenseApi=s(Ke);snackBar=s(Ze);categories=p([]);budget=p(null);loading=p(!1);saving=p(!1);currentMonth=this.getCurrentMonth();form=new D({month:new x(this.currentMonth,{nonNullable:!0,validators:[w.required]}),totalAmount:new x(null,[w.min(0)]),allocations:new Be([])});get allocations(){return this.form.controls.allocations}ngOnInit(){this.loadBudget()}allocationControls(){return this.allocations.controls}allocatedAmount(){return this.allocations.controls.reduce((a,e)=>e.controls.selected.value?a+this.toAmount(e.controls.amount.value):a,0)}totalAmount(){return this.toAmount(this.form.controls.totalAmount.value)}remainingAmount(){let a=this.totalAmount();return a?a-this.allocatedAmount():0}allocationProgress(){let a=this.totalAmount();return a?Math.min(this.allocatedAmount()/a*100,100):0}isOverAllocated(){return this.totalAmount()>0&&this.allocatedAmount()>this.totalAmount()}selectedCategoryCount(){return this.allocations.controls.filter(a=>a.controls.selected.value).length}saveBudget(){if(this.form.invalid||this.isOverAllocated()){this.form.markAllAsTouched();return}let a={month:this.form.controls.month.value,totalAmount:this.totalAmount(),allocations:this.allocations.controls.filter(e=>e.controls.selected.value&&this.toAmount(e.controls.amount.value)>0).map(e=>({category:e.controls.categoryId.value,amount:this.toAmount(e.controls.amount.value)}))};this.saving.set(!0),this.budgetApi.saveBudget(a).pipe(E(1),B(()=>this.saving.set(!1))).subscribe({next:e=>{this.budget.set(e.data.budget),this.snackBar.open("Budget saved","Close",{duration:2500})},error:e=>{this.snackBar.open(e?.error?.message??"Could not save budget","Close",{duration:3e3})}})}resetAllocations(){this.allocations.controls.forEach(a=>{a.controls.selected.setValue(!1),a.controls.amount.setValue(null)})}loadBudget(){this.loading.set(!0),G({categories:this.expenseApi.getCategories(),budget:this.budgetApi.getBudget(this.currentMonth)}).pipe(E(1),B(()=>this.loading.set(!1))).subscribe({next:({categories:a,budget:e})=>{let n=a.data.categories??[];this.categories.set(n),this.budget.set(e.data.budget),this.buildAllocationRows(n,e.data.budget)},error:()=>{this.snackBar.open("Could not load budget details","Close",{duration:2500})}})}buildAllocationRows(a,e){let n=new Map((e?.allocations??[]).map(t=>[t.category._id,t.amount]));this.form.controls.totalAmount.setValue(e?.totalAmount??null),this.allocations.clear(),a.forEach(t=>{let m=n.get(t._id)??null;this.allocations.push(new D({categoryId:new x(t._id,{nonNullable:!0}),selected:new x(m!==null,{nonNullable:!0}),amount:new x(m,[w.min(0)])}))})}getCurrentMonth(){let a=new Date;return`${a.getFullYear()}-${String(a.getMonth()+1).padStart(2,"0")}`}toAmount(a){let e=Number(a??0);return Number.isFinite(e)?e:0}static \u0275fac=function(e){return new(e||c)};static \u0275cmp=v({type:c,selectors:[["app-budget"]],decls:60,vars:21,consts:[[1,"budget-page"],[1,"page-header"],["mat-flat-button","","type","button",1,"save-button",3,"click","disabled"],["aria-hidden","true"],["appearance","outlined",1,"budget-card"],[3,"overlay","text"],[1,"budget-form",3,"formGroup"],[1,"summary-grid"],["appearance","outline"],["matInput","","type","month","formControlName","month","readonly",""],["matPrefix","","aria-hidden","true"],["matInput","","type","number","formControlName","totalAmount","placeholder","0.00"],[1,"summary-tile"],[1,"progress-section"],["mode","determinate","aria-label","Allocated budget progress",3,"value"],[1,"error-text"],[1,"category-section"],[1,"section-title-row"],["mat-button","","type","button",3,"click"],["formArrayName","allocations",1,"category-list"],[1,"category-row",3,"formGroupName"],["formControlName","selected"],[1,"category-label"],["appearance","outline",1,"amount-field"],["matInput","","type","number","formControlName","amount","placeholder","0.00",3,"readonly"]],template:function(e,n){e&1&&(i(0,"section",0)(1,"header",1)(2,"div")(3,"h1"),r(4,"Budget"),o(),i(5,"p"),r(6,"Set a monthly budget and optionally split it across categories."),o()(),i(7,"button",2),g("click",function(){return n.saveBudget()}),i(8,"mat-icon",3),r(9,"save"),o(),r(10," Save Budget "),o()(),i(11,"mat-card",4),y(12,rt,1,2,"app-loader",5),i(13,"mat-card-content")(14,"form",6)(15,"section",7)(16,"mat-form-field",8)(17,"mat-label"),r(18,"Month"),o(),b(19,"input",9),o(),i(20,"mat-form-field",8)(21,"mat-label"),r(22,"Total budget"),o(),i(23,"mat-icon",10),r(24,"account_balance_wallet"),o(),b(25,"input",11),o(),i(26,"div",12)(27,"span"),r(28,"Allocated"),o(),i(29,"strong"),r(30),I(31,"currency"),o(),i(32,"small"),r(33),o()(),i(34,"div",12)(35,"span"),r(36,"Remaining"),o(),i(37,"strong"),r(38),I(39,"currency"),o(),i(40,"small"),y(41,dt,1,0)(42,mt,1,0),o()()(),i(43,"section",13),b(44,"mat-progress-bar",14),y(45,lt,2,0,"p",15)(46,st,3,6,"p")(47,ht,2,0,"p"),o(),i(48,"section",16)(49,"div",17)(50,"div")(51,"h2"),r(52,"Category Budgets"),o(),i(53,"p"),r(54,"Enable categories only when you want to reserve part of the budget for them."),o()(),i(55,"button",18),g("click",function(){return n.resetAllocations()}),r(56,"Clear categories"),o()(),i(57,"div",19),Y(58,bt,14,5,"div",20,it),o()()()()()()),e&2&&(d(7),h("disabled",n.loading()||n.saving()||n.isOverAllocated()),d(5),C(n.loading()||n.saving()?12:-1),d(2),h("formGroup",n.form),d(16),_(P(31,11,n.allocatedAmount(),"INR","symbol","1.0-0")),d(3),R("",n.selectedCategoryCount()," categories"),d(),f("summary-tile--error",n.isOverAllocated()),d(4),_(P(39,16,n.remainingAmount(),"INR","symbol","1.0-0")),d(3),C(n.totalAmount()?41:42),d(3),h("value",n.allocationProgress()),d(),C(n.isOverAllocated()?45:n.totalAmount()?46:47),d(13),W(n.allocationControls()))},dependencies:[se,Re,Oe,Ie,Ee,we,Ae,Fe,ze,Te,Se,ve,fe,$e,Ue,Xe,We,V,Ve,Le,De,Ne,Ce,ye,qe,Ge,He,Qe,Je,je,le],styles:[".budget-page[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface)}.page-header[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:24px}.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0 0 6px;font-size:clamp(26px,3vw,32px);font-weight:800;line-height:1.1}.page-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:var(--mat-sys-on-surface-variant);font-size:15px}.save-button[_ngcontent-%COMP%]{flex:0 0 auto;--mdc-filled-button-container-shape: 8px}.budget-card[_ngcontent-%COMP%]{position:relative;overflow:hidden;--mdc-outlined-card-container-color: var(--mat-sys-surface-container-low, var(--mat-sys-surface));--mdc-outlined-card-outline-color: var(--mat-sys-outline-variant);border-radius:12px;box-shadow:var(--mat-sys-level1)}.budget-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:22px}.budget-form[_ngcontent-%COMP%]{display:grid;gap:22px}.summary-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;align-items:stretch}.summary-tile[_ngcontent-%COMP%]{display:grid;gap:6px;min-height:78px;padding:12px;border:1px solid var(--mat-sys-outline-variant);border-radius:8px;background:var(--mat-sys-surface-container-lowest, var(--mat-sys-surface))}.summary-tile[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .summary-tile[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant)}.summary-tile[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:12px;font-weight:700}.summary-tile[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:22px;font-weight:800}.summary-tile[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{font-size:12px}.summary-tile--error[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:var(--mat-sys-error)}.progress-section[_ngcontent-%COMP%]{display:grid;gap:8px}.progress-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:var(--mat-sys-on-surface-variant);font-size:13px}.error-text[_ngcontent-%COMP%]{color:var(--mat-sys-error)!important;font-weight:700}.section-title-row[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:14px}.section-title-row[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0 0 4px;font-size:18px;font-weight:800}.section-title-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:var(--mat-sys-on-surface-variant);font-size:13px}.category-list[_ngcontent-%COMP%]{display:grid;gap:10px;max-height:480px;overflow:auto;padding-right:2px;-webkit-overflow-scrolling:touch}.category-row[_ngcontent-%COMP%]{display:grid;grid-template-columns:minmax(0,1fr) minmax(140px,190px);align-items:center;gap:12px;padding:10px 12px;border:1px solid var(--mat-sys-outline-variant);border-radius:8px;background:var(--mat-sys-surface-container-lowest, var(--mat-sys-surface))}.category-label[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:10px;min-width:0}.category-label[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:var(--mat-sys-primary)}.category-label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:grid;gap:2px;min-width:0}.category-label[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .category-label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.category-label[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-weight:800}.category-label[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]{color:var(--mat-sys-on-surface-variant);font-size:12px}.amount-field[_ngcontent-%COMP%]{width:100%}[_nghost-%COMP%]     .summary-grid .mat-mdc-form-field-subscript-wrapper, [_nghost-%COMP%]     .category-row .mat-mdc-form-field-subscript-wrapper{display:none}@media(max-width:900px){.summary-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:640px){.page-header[_ngcontent-%COMP%]{display:grid}.page-header[_ngcontent-%COMP%]   .save-button[_ngcontent-%COMP%]{width:100%}.budget-card[_ngcontent-%COMP%]{border-right:0;border-left:0;border-radius:0;box-shadow:none}.budget-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:18px 16px}.summary-grid[_ngcontent-%COMP%], .category-row[_ngcontent-%COMP%]{grid-template-columns:1fr}.category-list[_ngcontent-%COMP%]{max-height:none}.section-title-row[_ngcontent-%COMP%]{display:grid}}"]})};export{et as Budget};
