(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cc643"],{"4e73":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"bx--grid",staticStyle:{"margin-top":"6rem"}},[i("div",{staticClass:"bx--row",staticStyle:{height:"10rem",display:"flex","align-items":"center","justify-content":"center"}},[i("img",{staticStyle:{width:"10rem",height:"10rem","border-radius":"50%"},attrs:{src:"static/"+t.perfilData.usuario+".png"}})]),t.flagEdit?i("div",{staticClass:"bx--row",staticStyle:{"padding-top":"2.6rem",display:"flex","align-items":"center","justify-content":"center",cursor:"pointer"}},[i("cv-file-uploader",{ref:"fileUploader",staticStyle:{"max-width":"20rem"},attrs:{accept:".jpg,.png",multiple:!1,removable:!0},model:{value:t.uploadedFiles,callback:function(e){t.uploadedFiles=e},expression:"uploadedFiles"}},[i("template",{slot:"drop-target"},[t._v(" Selecione a sua nova foto ")])],2)],1):t._e(),!1===t.flagEdit?i("div",{staticClass:"bx--row",staticStyle:{"padding-top":"2.6rem",display:"flex","align-items":"center","justify-content":"center",cursor:"pointer"},on:{click:function(e){t.flagEdit=!0}}},[t._v(" Editar Foto ")]):t._e(),t.flagEdit?i("div",{staticClass:"bx--row",staticStyle:{"padding-top":"2.6rem",display:"flex","align-items":"center","justify-content":"center",cursor:"pointer"}},[i("cv-button",{attrs:{kind:"secondary"},on:{click:function(e){return t.submitForm()}}},[t._v(" Salvar foto ")])],1):t._e(),i("div",{staticClass:"bx--row",staticStyle:{"padding-top":"2.6rem",height:"3rem",display:"flex","align-items":"center","justify-content":"center"}},[t._v(" Nome ")]),i("div",{staticClass:"bx--row",staticStyle:{display:"flex","align-items":"center","justify-content":"center"}},[i("cv-text-input",{attrs:{readonly:""},model:{value:t.perfilData.nome,callback:function(e){t.$set(t.perfilData,"nome",e)},expression:"perfilData.nome"}})],1),i("div",{staticClass:"bx--row",staticStyle:{"padding-top":"2.6rem",height:"3rem",display:"flex","align-items":"center","justify-content":"center"}},[t._v(" Trabalho ")]),i("div",{staticClass:"bx--row",staticStyle:{display:"flex","align-items":"center","justify-content":"center"}},[i("cv-text-input",{attrs:{readonly:""},model:{value:t.perfilData.trabalho,callback:function(e){t.$set(t.perfilData,"trabalho",e)},expression:"perfilData.trabalho"}})],1),i("div",{staticClass:"bx--row",staticStyle:{"padding-top":"2.6rem",height:"3rem",display:"flex","align-items":"center","justify-content":"center"}},[t._v(" Educaçao ")]),i("div",{staticClass:"bx--row",staticStyle:{display:"flex","align-items":"center","justify-content":"center"}},[i("cv-text-input",{attrs:{readonly:""},model:{value:t.perfilData.education,callback:function(e){t.$set(t.perfilData,"education",e)},expression:"perfilData.education"}})],1),i("div",{staticClass:"bx--row",staticStyle:{"padding-top":"2.6rem",height:"3rem",display:"flex","align-items":"center","justify-content":"center"}},[t._v(" Estado Civil ")]),i("div",{staticClass:"bx--row",staticStyle:{display:"flex","align-items":"center","justify-content":"center"}},[i("cv-text-input",{attrs:{readonly:""},model:{value:t.perfilData.estadoCivil,callback:function(e){t.$set(t.perfilData,"estadoCivil",e)},expression:"perfilData.estadoCivil"}})],1),i("div",{staticClass:"bx--row",staticStyle:{"padding-top":"2.6rem",height:"3rem",display:"flex","align-items":"center","justify-content":"center"}},[t._v(" Email ")]),i("div",{staticClass:"bx--row",staticStyle:{display:"flex","align-items":"center","justify-content":"center"}},[i("cv-text-input",{attrs:{readonly:""},model:{value:t.perfilData.email,callback:function(e){t.$set(t.perfilData,"email",e)},expression:"perfilData.email"}})],1),i("div",{staticClass:"bx--row",staticStyle:{"padding-top":"2rem",height:"2rem",display:"flex","align-items":"center","justify-content":"center"}},[i("cv-button",{on:{click:function(e){return t.editPerfil()}}},[t._v(" Editar Perfil ")])],1),i("div",{staticClass:"bx--row",staticStyle:{"padding-top":"4rem",height:"2rem",display:"flex","align-items":"center","justify-content":"center"}},[i("cv-button",{attrs:{kind:"secondary"},on:{click:function(e){return t.timeline()}}},[t._v(" timeline ")])],1)])},l=[],s=i("2f62"),n=i("bc3a"),r=i.n(n),o={name:"usuario",data(){return{token:"",perfilData:[],uploadedFiles:[],flagEdit:!1}},computed:{...Object(s["c"])(["modalEdit"])},methods:{async paginaPerfil(){this.$router.push("/perfil")},async getPerfil(){let t={token:this.token},e=await r.a.post("/api/perfil",t);this.perfilData=e.data.perfil},async editPerfil(){this.$router.push("/perfil/edit")},async timeline(){this.$router.push("/timeline")},async submitForm(){if(0===this.uploadedFiles.length)return this.flagEdit=!1;let t=new FormData;if(t.append("usuario",this.perfilData.usuario),t.append("token",this.token),this.uploadedFiles.length>0)for(let e of this.uploadedFiles)t.append("files",e.file);await r.a.post("/api/upload/file",t,{headers:{"Content-Type":"multipart/form-data; boundary="+t._boundary,token:this.token}}).then(t=>{console.log(t.data),document.location.reload(!0)})}},mounted(){this.token=this.$cookies.get("token"),this.getPerfil()}},c=o,d=i("2877"),p=Object(d["a"])(c,a,l,!1,null,null,null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d0cc643.1d2fab06.js.map