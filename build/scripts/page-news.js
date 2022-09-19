!function(){"use strict";function e(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}class t{constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e(this,"_listOfValidationRules",new Map([["minLength",this._minLength],["maxLength",this._maxLength],["text",this._text],["requered",this._requered],["email",this._email],["phone",this._phone],["checkbox",this._checkbox]])),e(this,"_listElementsToCheck",new Map),e(this,"_isValid",!1),this._form="string"==typeof t?document.querySelector(t):null}submit(e){this._form.addEventListener("submit",(t=>{t.preventDefault(),e(t)}))}getForm(){return this._form}addRuleValidationElements(e,t){var i;if("string"!=typeof e)throw new Error("The transmitted data is not correct");if(!Array.isArray(t))throw new Error("The transmitted data is not correct");null===(i=document.querySelectorAll(e))||void 0===i||i.forEach((e=>{this._setRuleForElement(e,t)}))}addCustomRuleValidateInList(e,t){if("string"!=typeof e)throw new Error("The transmitted data is not correct");if("function"!=typeof t)throw new Error("The transmitted data is not correct");this._listOfValidationRules.set(e,t)}_setRuleForElement(e,t){const i=[];t.forEach((t=>{let{rule:s,...n}=t;const r=this._listOfValidationRules.get(s);i.push(r.bind(this,{...n,element:e}))})),this._listElementsToCheck.set(e,i)}init(){if(!this._form||"FORM"!==this._form.tagName)throw new Error("The transmitted data is not correct")}isValid(){return this._checkValidationAllElementsForm(),this._isValid}_checkValidationAllElementsForm(){let e=!0;for(const t of this._listElementsToCheck.keys())this._validationOneElement(t)||(e=!1);this._isValid=e}_validationOneElement(e){let t,i=!0;return this._listElementsToCheck.get(e).every((e=>{const{validate:s,errorMessage:n}=e();return s||(i=!i,t=n),s})),i?this._hideErrorMessage(e):this._showErrorMessage(e,t),i}_showErrorMessage(e,t){const i=e.nextElementSibling;this._searchElementErrorMessage(i,(i=>{i.textContent=t,e.classList.add("validate-error"),i.classList.add("validate-error-message_show")}))}_hideErrorMessage(e){const t=e.nextElementSibling;this._searchElementErrorMessage(t,(t=>{e.classList.remove("validate-error"),t.classList.remove("validate-error-message_show")}))}_searchElementErrorMessage(e,t){e.classList.contains("validate-error-message")?t(e):this._searchElementErrorMessage(e.nextElementSibling,t)}_minLength(e){let{element:t,value:i,errorMessage:s=null}=e;const n=t.value.trim();return n.length<i&&""!==n?{validate:!1,errorMessage:s}:{validate:!0}}_maxLength(e){let{element:t,value:i,errorMessage:s=null}=e;return t.value.trim().length>i?{validate:!1,errorMessage:s}:{validate:!0}}_requered(e){let{element:t,errorMessage:i=null}=e;return""==t.value.trim()?{validate:!1,errorMessage:i}:{validate:!0}}_text(e){let{element:t,errorMessage:i=null}=e;const s=t.value.trim();return/[^a-zA-ZА-Яа-я\s]/.test(s)&&""!==s?{validate:!1,errorMessage:i}:{validate:!0}}_email(e){let{element:t,errorMessage:i=null}=e;const s=t.value.trim();return 0==/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(s)&&""!==s?{validate:!1,errorMessage:i}:{validate:!0}}_phone(e){let{element:t,errorMessage:i=null}=e;const s=t.value.trim();return 0==/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(s)&&""!==s?{validate:!1,errorMessage:i}:{validate:!0}}_checkbox(e){let{element:t,errorMessage:i}=e;const{checked:s}=t;return s?{validate:!0}:{validate:!1,errorMessage:i}}}class i{constructor(){let{container:e=null,body:t=null,trigger:i=null,animation:s=null,focusLock:n=null}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};var r;(r="_isOpen")in this?Object.defineProperty(this,r,{value:false,enumerable:!0,configurable:!0,writable:!0}):this[r]=false,this._container=document.querySelector(e),this._trigger=i?document.querySelector(i):null,this._body=t,this._animation=s,this._focusLock=n}isOpen(){return this._isOpen}init(){this._throwsError(),this._addsEventListenersTrigger(),this._closesWindowOnClickOutside(),this._setsStyleHiding()}_throwsError(){if(!this._body)throw new Error("Field body is required")}_addsEventListenersTrigger(){this._trigger&&(this._trigger.addEventListener("pointerup",(()=>{this.toggle()})),this._trigger.addEventListener("keydown",(e=>{"Enter"===e.code&&this.toggle()})))}toggle(){this.isOpen()?this.close():this.open()}close(){this._isOpen=!1,this._setsStyleHiding(),this._switchesClassActiveTrigger(),this._changesClassActiviteAtWindow(),this._unblocksFocus(),this._removesScrollPadding(document.body),this._removesScrollPadding(this._container),this._switchesBlockScroll()}_setsStyleHiding(){this._animation?this._animation.setStyleHiding(this._container):(this._container.style.visibility="hidden",this._container.style.opacity=0)}_switchesClassActiveTrigger(){this._trigger&&(this._isOpen?this._trigger.classList.add("active"):this._trigger.classList.remove("active"))}_changesClassActiviteAtWindow(){this._isOpen?this._container.classList.add("active"):this._container.classList.remove("active")}_unblocksFocus(){this._focusLock&&this._focusLock.unblocksFocus()}_switchesBlockScroll(){this.isOpen()?document.body.classList.add("overflow-hidden"):document.body.classList.remove("overflow-hidden")}_removesScrollPadding(e){e.style.paddingRight=0}open(){this._isOpen=!0,this._addsPaddingInsteadOfScroll(document.body),this._addsPaddingInsteadOfScroll(this._container),this._setsStyleVisibility(),this._switchesBlockScroll(),this._switchesClassActiveTrigger(),this._changesClassActiviteAtWindow(),this._blocksFocus()}_addsPaddingInsteadOfScroll(e){const t="".concat(window.innerWidth-document.body.offsetWidth,"px");e.style.paddingRight=t}_setsStyleVisibility(){this._animation?this._animation.setStyleVisibility(this._container):(this._container.style.visibility="visible",this._container.style.opacity=1)}_blocksFocus(){this._focusLock&&this._focusLock.blocksFocus()}_closesWindowOnClickOutside(){this._container.addEventListener("pointerdown",(e=>{e.target.closest(this._body)||this.close()}))}}class s extends i{constructor(){let{container:e=null,body:t=null,trigger:i=null,animation:s=null,focusLock:n=null}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};var r,o;super({container:e,body:t,trigger:i,animation:s,focusLock:n}),o=void 0,(r="_activeElementBeforeOpen")in this?Object.defineProperty(this,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):this[r]=o,this._closeBtn=this._container.querySelector(".modal__close")}init(){super.init(),this._addsEventListenersButtonClose()}_addsEventListenersButtonClose(){this._closeBtn.addEventListener("pointerup",(()=>{this.close()})),this._closeBtn.addEventListener("keydown",(e=>{"Enter"===e.code&&this.close()}))}open(){super.open(),this._activeElementBeforeOpen=document.activeElement}close(){var e;super.close(),null===(e=this._activeElementBeforeOpen)||void 0===e||e.focus(),this._activeElementBeforeOpen=null}}function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}class r{constructor(){let{exception:e=!1,container:t="body",mutationObserver:i=!1}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};n(this,"_listElementsToBlock",new Set),n(this,"_listChecksToBlock",[this._checkingForFocus,this._checkingForException.bind(this)]),n(this,"_isBlockFocus",!1),n(this,"_linkOnMutationObserver",void 0),n(this,"_listHandlesMutationObserver",{childList:this._handlesMutationChildList,attributes:this._handlesMutationAttributes}),n(this,"_mutationAttributesFlag",!1),this._exception=e,this._container=t,this._mutationObserver=i}isBlockFocus(){return this._isBlockFocus}init(){this._throwsErrors(),setTimeout((()=>{this._populatesTheListElementsToBlock(document.querySelectorAll("".concat(this._container," *")))}),0),this._addsMutationObserver()}_throwsErrors(){if(this._exception&&!Array.isArray(this._exception)&&"string"!=typeof this._exception)throw new Error("Exception wrong type");if(this._container&&"string"!=typeof this._container)throw new Error("Container wrong type")}_populatesTheListElementsToBlock(e){e.forEach((e=>{this._checksOneElement(e)&&this._addsElementToBlockList(e)}))}_addsElementToBlockList(e){this._listElementsToBlock.add(e),this.isBlockFocus()&&this._blocksFocusElement(e)}_checksOneElement(e){return this._listChecksToBlock.every((t=>t(e)))}_checkingForFocus(e){return 0===e.tabIndex}_checkingForException(e){if(!this._exception)return!0;if(!Array.isArray(this._exception))return!e.closest(this._exception);for(const t of this._exception)if(e.closest(t))return!1;return!0}_blocksFocusElement(e){null==e||e.setAttribute("tabindex",-1)}blocksFocus(){this._listElementsToBlock.forEach((e=>{this._blocksFocusElement(e)})),this._isBlockFocus=!0,this._mutationAttributesFlag=!0}unblocksFocus(){this._listElementsToBlock.forEach((e=>{this._unblocksFocusElement(e)})),this._isBlockFocus=!1,setTimeout((()=>{this._mutationAttributesFlag=!1}))}_unblocksFocusElement(e){null==e||e.setAttribute("tabindex",0)}_addsMutationObserver(){this._mutationObserver&&(this._linkOnMutationObserver=new MutationObserver(this._handlesMutationObserver.bind(this)),this._linkOnMutationObserver.observe(document.querySelector(this._container),{childList:!0,subtree:!0,characterData:!1,attributes:!0,attributeFilter:["tabindex"]}))}_handlesMutationObserver(e){e.forEach((e=>{const{type:t}=e;this._listHandlesMutationObserver[t].call(this,e)}))}_handlesMutationChildList(e){const{addedNodes:t,removedNodes:i}=e,s=this._filtersElementsFromNodes(t),n=this._filtersElementsFromNodes(i);this._populatesTheListElementsToBlock(s),this._removesElementsFromBlockList(n)}_filtersElementsFromNodes(e){return Array.from(e).filter((e=>1===e.nodeType))}_removesElementsFromBlockList(e){e.forEach((e=>this._removesElementFromBlockList(e)))}_removesElementFromBlockList(e){this._listElementsToBlock.delete(e),this.isBlockFocus()&&this._unblocksFocusElement(e)}_handlesMutationAttributes(e){if(this._mutationAttributesFlag)return;const{target:t}=e;this._checksOneElement(t)?this._addsElementToBlockList(t):this._removesElementFromBlockList(t)}disconnectsMutationObserver(){this._linkOnMutationObserver.disconnect()}}const o=new r({exception:".modal-successful-sending",mutationObserver:!0});o.init();const l=new s({container:".modal-successful-sending",body:".modal__body",focusLock:o});function a(e,t){e.addRuleValidationElements("".concat(t," .form__input_name"),[{rule:"text",errorMessage:"The field can only contain letters!"},{rule:"maxLength",value:21,errorMessage:"Maximum value - 21 characters!"},{rule:"minLength",value:2,errorMessage:"Minimum value - 2 characters!"},{rule:"requered",errorMessage:"This field is required!"}])}function c(e,t){e.addRuleValidationElements("".concat(t," .form__input_message"),[{rule:"text",errorMessage:"The field can only contain letters!"},{rule:"maxLength",value:54,errorMessage:"Maximum value  - 54 characters!"},{rule:"minLength",value:2,errorMessage:"Minimum value - 2 characters!"},{rule:"requered",errorMessage:"This field is required!"}])}function u(e,t){e.addRuleValidationElements("".concat(t," .form__input_email"),[{rule:"email",errorMessage:"Please enter a valid e-mail!"},{rule:"maxLength",value:40,errorMessage:"Maximum value  - 40 characters!"},{rule:"minLength",value:12,errorMessage:"Minimum value - 12 characters!"},{rule:"requered",errorMessage:"This field is required!"}])}function h(){setTimeout((()=>{l.open()}),0)}l.init();class d extends i{constructor(){let{container:e=null,body:t=null,trigger:i=null,breakpoints:s=null,animation:n=null,focusLock:r=null}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};var o,l;super({container:e,body:t,trigger:i,animation:n,focusLock:r}),l=void 0,(o="_currentBreakpoint")in this?Object.defineProperty(this,o,{value:l,enumerable:!0,configurable:!0,writable:!0}):this[o]=l,this._breakpoints=s}init(){super.init(),this._initBreakpointUpdate()}_initBreakpointUpdate(){this._breakpoints&&(this._updatesBreakpoint(),window.addEventListener("resize",function(e,t){let i;return function(){for(var t=arguments.length,s=new Array(t),n=0;n<t;n++)s[n]=arguments[n];clearTimeout(i),i=setTimeout((()=>{e.apply(this,s)}),400)}}(this._updatesBreakpoint.bind(this))))}_updatesBreakpoint(){const e=this._getCurrentBreakpoint();this._currentBreakpoint!=e&&(this._currentBreakpoint=e,this._callsFunctionsBreakpoint())}_getCurrentBreakpoint(){const e=window.innerWidth;return Object.keys(this._breakpoints).reduce(((t,i)=>(e>=i&&(t=i),t)),0)}_callsFunctionsBreakpoint(){const e=this._breakpoints[this._currentBreakpoint];e&&("function"!=typeof e?null==e||e.forEach((e=>{e()})):e())}}function _(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(!e)return;e.preventDefault();const t=e.target,i=t.closest("[href]").getAttribute("href");document.querySelector(i).scrollIntoView({behavior:"smooth",block:"start"})}function m(){const e=new d({container:".burger-menu",trigger:".header .burger-trigger",body:".burger-menu__body",breakpoints:{768:()=>{e.isOpen()&&e.close()}}});e.init(),function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if("string"!=typeof e)throw new Error("Selector incorrect");const t=document.querySelectorAll(e);null==t||t.forEach((e=>{e.addEventListener("click",_)}))}(".smooth-scroll"),function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(!e||!t||!i)throw new Error("Invalid number of arguments passed");e.forEach((e=>{e.addEventListener("keydown",(e=>{e.key===t&&e.target===e.currentTarget&&i(e.currentTarget)}))}))}(document.querySelectorAll(".custom-checkbox"),"Enter",(e=>{const t=e.querySelector("input");t.checked=!t.checked})),function(){const e=".feedback-form",i=new t(e);i.init(),a(i,e),function(e,t){e.addRuleValidationElements("".concat(t," .form__input_phone"),[{rule:"phone",errorMessage:"Please enter a valid phone number!"},{rule:"requered",errorMessage:"This field is required!"}])}(i,e),c(i,e),u(i,e),i.submit((()=>{i.isValid()&&(i.getForm().reset(),h())}))}(),function(){const e=".newsletter-subscription-form",i=new t(e);i.init(),u(i,e),i.submit((()=>{i.isValid()&&(i.getForm().reset(),h())}))}()}function g(){document.body.insertAdjacentHTML("beforeend",'\n    <div class="modal error-notification">\n      <div class="modal__body error-notification__body">\n        <div class="modal__content error-notification__content">\n          <p class="error-notification__text">Произошла ошибка, перезагрузите страницу!</p>\n          <button class="btn-reset modal__close" type="button">\n            <svg class="modal__icon">\n              <use xlink:href="img/sprite.svg#close"></use>\n            </svg>\n          </button>\n        </div>\n      </div>\n    </div>\n  ');const e=new r({exception:".error-notification"});e.init();const t=new s({container:".error-notification",body:"modal__body",focusLock:e});t.init(),setTimeout((()=>{t.open()}))}!function(e){window.addEventListener("error",g);try{m(),function(){const e=".comment-form",i=new t(e);i.init(),a(i,e),u(i,e),c(i,e),i.submit((()=>{i.isValid()&&(i.getForm().reset(),h())}))}()}catch(e){g()}}()}();