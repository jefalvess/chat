(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/perfil/chat.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/perfil/chat.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n // eslint-disable-next-line no-undef\n\nconst socket = io({\n  transports: ['websocket']\n});\nconsole.log('criar socket.io');\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'chat',\n\n  data() {\n    return {\n      messages: [],\n      mensagemParticular: [],\n      listRoom: [],\n      chats: [],\n      reconectar: []\n    };\n  },\n\n  computed: { ...Object(vuex__WEBPACK_IMPORTED_MODULE_0__[\"mapGetters\"])(['loadingPage', 'modalEdit', 'cookieUserJson']),\n    listRoomComputed: {\n      get() {\n        return this.listRoom;\n      }\n\n    }\n  },\n  methods: { ...Object(vuex__WEBPACK_IMPORTED_MODULE_0__[\"mapActions\"])(['setLoadingPage', 'setModalEdit']),\n\n    // Criar sala de bate papo\n    async createRoom(id) {\n      console.log('Abri chat ');\n\n      if (this.chats.indexOf(id) === -1) {\n        this.chats.push(id);\n        let loggedInUser = this.modalEdit;\n        let room = '';\n\n        if (this.modalEdit > id) {\n          room = this.modalEdit + id;\n        } else {\n          room = id + this.modalEdit;\n        }\n\n        this.listRoom.push(room);\n        this.mensagemParticular.push('');\n        let payload = {\n          token: this.cookieUserJson,\n          room: room\n        };\n        let response = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/api/mensagens', payload);\n\n        if (response.data.length > 0) {\n          this.messages = this.messages.concat(response.data);\n        }\n\n        socket.emit('create', {\n          room: room,\n          userId: loggedInUser.userId,\n          withUserId: id,\n          user: this.modalEdit\n        });\n      }\n    },\n\n    sendMessage(room, index) {\n      console.log('Enviar mensagem ');\n      let loggedInUser = this.modalEdit;\n      let message = this.mensagemParticular[index];\n      this.mensagemParticular[index] = '';\n      socket.emit('message', {\n        room: room,\n        message: message,\n        from: loggedInUser\n      });\n      this.messages.push({\n        room: room,\n        message: message,\n        from: loggedInUser\n      });\n    },\n\n    minimizeChat(room, index) {\n      this.listRoom.splice(index, 1);\n      this.chats.splice(index, 1);\n      this.messages = this.messages.filter(item => item.room !== room);\n    },\n\n    criarUsuario() {\n      if (this.modalEdit !== '') {\n        socket.emit('loggedin', {\n          user_id: this.modalEdit\n        });\n      }\n    }\n\n  },\n\n  mounted() {\n    this.criarUsuario();\n  },\n\n  created: function () {\n    // criar chat\n    socket.on('updateUserList', response => {\n      console.log('atualiaçao de usuarios'); // CHat que estava on e preciso reabrir conexao\n\n      for (let i = 0; i < this.reconectar.length; i++) {\n        // Se o chat aberto nao existir aqui\n        if (response[1].indexOf(this.reconectar[i]) === 1) {\n          console.log('preciso reconectar esse chat');\n          let room = '';\n\n          if (this.modalEdit > this.chats[i]) {\n            room = this.modalEdit + this.chats[i];\n          } else {\n            room = this.chats[i] + this.modalEdit;\n          }\n\n          let index = this.chats.indexOf(this.reconectar[i]);\n          this.minimizeChat(room, index);\n          this.createRoom(this.reconectar[i]);\n        }\n      } // Avisar se alguem ficar of e eu tenho chat aberto;\n\n\n      for (let i = 0; i < this.chats.length; i++) {\n        // Se o chat aberto nao existir aqui\n        if (response[1].indexOf(this.chats[i]) === -1) {\n          let room = '';\n\n          if (this.modalEdit > this.chats[i]) {\n            room = this.modalEdit + this.chats[i];\n          } else {\n            room = this.chats[i] + this.modalEdit;\n          } // Primeira noticaçao para o chat\n\n\n          if (this.reconectar.indexOf(this.chats[i]) === -1) {\n            this.reconectar.push(this.chats[i]);\n            this.messages.push({\n              room: room,\n              message: 'Usuario esta off',\n              from: 'Automatica'\n            });\n          }\n        }\n      }\n\n      this.setLoadingPage(response[0]);\n    }); // chat foi aberto em outro lugar\n\n    socket.on('invite', data => {\n      console.log('chat foi aberto');\n      socket.emit('joinRoom', data);\n    }); // Onde chega as mensagens de outro remetente\n\n    socket.on('message', async msg => {\n      console.log('CHEGOU UMA MENSAGEM ');\n\n      if (this.listRoom.indexOf(msg.room) === -1) {\n        this.listRoom.push(msg.room);\n        this.chats.push(msg.from);\n        let payload = {\n          token: this.cookieUserJson,\n          room: msg.room\n        };\n        let response = await axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/api/mensagens', payload);\n\n        if (response.data.length > 0) {\n          this.messages = this.messages.concat(response.data);\n        }\n\n        this.messages[this.messages.length - 1] = delete this.messages[this.messages.length - 1]['_id'];\n\n        if (this.messages[this.messages.length - 1] !== {\n          room: msg.room,\n          message: msg.message,\n          from: msg.from\n        }) {\n          this.messages.push({\n            room: msg.room,\n            message: msg.message,\n            from: msg.from\n          });\n        }\n      } else {\n        this.mensagemParticular.push('');\n        this.messages.push({\n          room: msg.room,\n          message: msg.message,\n          from: msg.from\n        });\n      }\n    });\n  }\n});\n\n//# sourceURL=webpack:///./src/components/perfil/chat.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"13808590-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/perfil/chat.vue?vue&type=template&id=df5a2b4a&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"13808590-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/perfil/chat.vue?vue&type=template&id=df5a2b4a& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"bx--grid\" },\n    [\n      _vm.loadingPage.length === 1\n        ? _c(\"div\", [\n            _c(\"p\", { staticStyle: { \"font-size\": \"22px\" } }, [\n              _vm._v(\"Nenhum usuario conectado \")\n            ])\n          ])\n        : _c(\"div\", { staticClass: \"bx--row\" }, [\n            _c(\"p\", { staticStyle: { \"font-size\": \"22px\" } }, [\n              _vm._v(\"Usuarios conectados agora \")\n            ])\n          ]),\n      _vm._l(_vm.loadingPage, function(user) {\n        return _c(\"div\", { key: user.socketId, staticClass: \"bx--row\" }, [\n          user.user_id !== _vm.modalEdit\n            ? _c(\n                \"p\",\n                {\n                  staticStyle: { padding: \"0.5rem\", cursor: \"pointer\" },\n                  attrs: { id: user.user_id },\n                  on: {\n                    click: function($event) {\n                      return _vm.createRoom(user.user_id)\n                    }\n                  }\n                },\n                [_vm._v(\" \" + _vm._s(user.user_id) + \" \")]\n              )\n            : _vm._e()\n        ])\n      }),\n      _vm._l(_vm.listRoomComputed, function(room, id) {\n        return _c(\n          \"div\",\n          {\n            key: room,\n            staticClass: \"bx--row\",\n            staticStyle: {\n              width: \"17rem\",\n              border: \"1px solid black\",\n              \"min-height\": \"17.5rem\",\n              \"max-height\": \"17.5rem\",\n              \"margin-top\": \"2rem\"\n            }\n          },\n          [\n            _c(\"div\", { staticClass: \"bx--col\" }, [\n              _c(\"div\", { staticClass: \"bx--row\" }, [\n                _c(\n                  \"div\",\n                  {\n                    staticStyle: { width: \"85%\" },\n                    attrs: { lass: \"bx--col--lg\" }\n                  },\n                  [_vm._v(\"ID CHAT : \" + _vm._s(room))]\n                ),\n                _c(\n                  \"div\",\n                  {\n                    staticClass: \"bx--col\",\n                    staticStyle: { cursor: \"pointer\" },\n                    on: {\n                      click: function($event) {\n                        return _vm.minimizeChat(room, id)\n                      }\n                    }\n                  },\n                  [_vm._v(\" x \")]\n                )\n              ]),\n              _c(\n                \"div\",\n                {\n                  staticClass: \"bx--row\",\n                  staticStyle: {\n                    overflow: \"auto\",\n                    \"flex-direction\": \"column-reverse\",\n                    \"min-height\": \"15rem\",\n                    \"max-height\": \"15rem\"\n                  }\n                },\n                [\n                  _c(\n                    \"div\",\n                    { staticClass: \"bx--col\" },\n                    _vm._l(_vm.messages, function(message, index) {\n                      return _c(\"div\", { key: index, staticClass: \"bx--row\" }, [\n                        room === message.room\n                          ? _c(\"div\", [\n                              _c(\"div\", [\n                                _c(\"span\", { staticClass: \"message\" }, [\n                                  _vm._v(\n                                    _vm._s(message.from) +\n                                      \": \" +\n                                      _vm._s(message.message) +\n                                      \" \"\n                                  )\n                                ])\n                              ])\n                            ])\n                          : _vm._e()\n                      ])\n                    }),\n                    0\n                  )\n                ]\n              ),\n              _c(\"div\", { staticClass: \"bx--row\" }, [\n                _c(\n                  \"div\",\n                  { staticClass: \"chat-window\", attrs: { id: \"${room}\" } },\n                  [\n                    _c(\"div\", { staticClass: \"body\" }),\n                    _c(\"div\", { staticClass: \"footer\" }, [\n                      _c(\"input\", {\n                        directives: [\n                          {\n                            name: \"model\",\n                            rawName: \"v-model\",\n                            value: _vm.mensagemParticular[id],\n                            expression: \"mensagemParticular[id]\"\n                          }\n                        ],\n                        staticClass: \"messageText\",\n                        staticStyle: { width: \"14.7rem\" },\n                        attrs: { type: \"text\" },\n                        domProps: { value: _vm.mensagemParticular[id] },\n                        on: {\n                          keyup: function($event) {\n                            if (\n                              !$event.type.indexOf(\"key\") &&\n                              _vm._k(\n                                $event.keyCode,\n                                \"enter\",\n                                13,\n                                $event.key,\n                                \"Enter\"\n                              )\n                            ) {\n                              return null\n                            }\n                            return _vm.sendMessage(room, id)\n                          },\n                          input: function($event) {\n                            if ($event.target.composing) {\n                              return\n                            }\n                            _vm.$set(\n                              _vm.mensagemParticular,\n                              id,\n                              $event.target.value\n                            )\n                          }\n                        }\n                      }),\n                      _c(\n                        \"button\",\n                        {\n                          on: {\n                            click: function($event) {\n                              return _vm.sendMessage(room, id)\n                            }\n                          }\n                        },\n                        [_vm._v(\"GO\")]\n                      )\n                    ])\n                  ]\n                )\n              ])\n            ])\n          ]\n        )\n      })\n    ],\n    2\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/perfil/chat.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%2213808590-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/components/perfil/chat.vue":
/*!****************************************!*\
  !*** ./src/components/perfil/chat.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chat_vue_vue_type_template_id_df5a2b4a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat.vue?vue&type=template&id=df5a2b4a& */ \"./src/components/perfil/chat.vue?vue&type=template&id=df5a2b4a&\");\n/* harmony import */ var _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chat.vue?vue&type=script&lang=js& */ \"./src/components/perfil/chat.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _chat_vue_vue_type_template_id_df5a2b4a___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _chat_vue_vue_type_template_id_df5a2b4a___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/perfil/chat.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/perfil/chat.vue?");

/***/ }),

/***/ "./src/components/perfil/chat.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./src/components/perfil/chat.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../../node_modules/babel-loader/lib!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./chat.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/perfil/chat.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/perfil/chat.vue?");

/***/ }),

/***/ "./src/components/perfil/chat.vue?vue&type=template&id=df5a2b4a&":
/*!***********************************************************************!*\
  !*** ./src/components/perfil/chat.vue?vue&type=template&id=df5a2b4a& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_13808590_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_template_id_df5a2b4a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"13808590-vue-loader-template\"}!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../node_modules/vue-loader/lib??vue-loader-options!./chat.vue?vue&type=template&id=df5a2b4a& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"13808590-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/perfil/chat.vue?vue&type=template&id=df5a2b4a&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_13808590_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_template_id_df5a2b4a___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_13808590_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chat_vue_vue_type_template_id_df5a2b4a___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/perfil/chat.vue?");

/***/ })

}]);