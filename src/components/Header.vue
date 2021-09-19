<template>
  <div style="margin-bottom: 3.1rem" class="bx--row">
    <cv-header aria-label="Carbon header">
     <cv-header-menu-button aria-label="Header menu" aria-controls="side-nav" />
  
        <cv-header-name style="cursor: pointer" @click="redirect()" prefix="Projeto">
          [Rede Social]
        </cv-header-name>

        <template>
          <cv-side-nav id="side-nav" rail>
            <cv-side-nav-items>
              <cv-header-side-nav-items divider>
                <cv-header-menu-item href="javascript:void(0)">
                Link 1
              </cv-header-menu-item>
              <cv-header-menu-item href="javascript:void(0)">
                Link 2
              </cv-header-menu-item>
              <cv-header-menu-item href="javascript:void(0)">
                Link 3
              </cv-header-menu-item>
              <cv-header-menu aria-label="Link 4" title="Link 4" :hover-toggle="false">
                <cv-header-menu-item href="javascript:void(0)">
                  Submenu Link 1
                </cv-header-menu-item>
                <cv-header-menu-item href="javascript:void(0)">
                  Submenu Link 2
                </cv-header-menu-item>
                <cv-header-menu-item href="javascript:void(0)">
                  Submenu Link 3
                </cv-header-menu-item>
              </cv-header-menu>
            </cv-header-side-nav-items>

            <cv-side-nav-menu title="L1 menu">
              <cv-side-nav-menu-item href="javascript:void(0)" active>
                L2 menu item
              </cv-side-nav-menu-item>
              <cv-side-nav-menu-item href="javascript:void(0)">
                L2 menu item
              </cv-side-nav-menu-item>
              <cv-side-nav-menu-item href="javascript:void(0)">
                L2 menu item
              </cv-side-nav-menu-item>
            </cv-side-nav-menu>
            <cv-side-nav-menu title="L1 menu">
              <cv-side-nav-menu-item href="javascript:void(0)">
                L2 menu item
              </cv-side-nav-menu-item>
              <cv-side-nav-menu-item href="javascript:void(0)" aria-current="page">
                L2 menu item
              </cv-side-nav-menu-item>
              <cv-side-nav-menu-item href="javascript:void(0)">
                L2 menu item
              </cv-side-nav-menu-item>
            </cv-side-nav-menu>
            <cv-side-nav-link href="javascript:void(0)">
              L1 link
            </cv-side-nav-link>
            <cv-side-nav-link href="javascript:void(0)">
              L1 link
            </cv-side-nav-link>

            </cv-side-nav-items>
          </cv-side-nav>
        </template>

        <template slot="header-global">
           <p style="cursor: pointer" @click="logoff()" class="confidential"> Sair </p>
        </template>


    </cv-header>
  </div>
</template>

<script>
const chat = () => import('./chat.vue');

export default {
  name: 'header-page',
  components: {
    chat
  },
  methods: {
    redirect() {
      return window.open(`${window.location.origin}/`, '_self');
    },
    async logoff (){
      this.$cookies.remove("token");
       this.$router.push('/');

      
    }
  }
};
</script>

<style>
.confidential {
  font-weight: bold;
  color: #ffffff;
  margin: 0.7rem 0.5rem 0.5rem;
}
</style>
