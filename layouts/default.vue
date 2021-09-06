<template>
  <div>
   <v-app>
    <!-- NavigationDrawer -->
    <v-navigation-drawer app v-model="drawer" clipped>
        <v-container>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title grey--text text--darken-2">
                        Navigation lists
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list>
                <v-list-group v-for="nav_list in nav_lists" 
                              :key="nav_list.name" 
                              :prepend-icon="nav_list.icon"
                              no-action :append-icon="nav_list.lists ? undefined : ''" 
                              @click="toPage(nav_list)">
                    <template v-slot:activator>
                        <v-list-item-content>
                            <!-- <nuxt-link :to=nav_list.route> -->
                                <v-list-item-title>{{nav_list.name}}</v-list-item-title>
                            <!-- </nuxt-link>    -->
                        </v-list-item-content>
                    </template>
                        <v-list-item v-for="list in nav_list.lists" :key="list">
                            <v-list-item-content>
                                <v-list-item-title>{{ list }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                </v-list-group>
            </v-list>
        </v-container>
    </v-navigation-drawer>



<!-- Header -->
    <v-app-bar color="indigo" dark　app clipped-left height="100px" class="v-app-bar">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            
            <nuxt-link to="/">
                    <v-toolbar-title class="text-h4 tittle">Gutitter</v-toolbar-title>
            </nuxt-link>

            <v-spacer></v-spacer>


            <v-toolbar-items class="">
                <div class="flex items-center justify-center flex-col w-full h-full py-4">
                    <div class="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-full border border-gray-400">
                        <div v-if="user.photoURL" class="object-cover border rounded-full">
                            <Menus2/>
                        </div>

                        <div v-else>
                            <Menus/>
                        </div>    
                    </div>
                </div>
            </v-toolbar-items>
    </v-app-bar>

    <!-- main -->
        <v-main>
            <Nuxt />
        </v-main>

   </v-app>    
  </div>
</template>





<script>

export default {

    data() {
        return {
            route:'/',
            drawer: null,
            isShow:false,
            showPassword:false,
            show:null,
            show2:null,
            nav_lists:[
                {name: 'Home',icon: 'mdi-home',route: '/home',},
                {name: 'Tweet',icon: 'far fa-star',route: '/',},
                {name: 'User',icon: 'far fa-user-circle',route: '/profile',},
                ],
              }  
            },

    created: async function(){
     const user =  await this.$auth()

     if(user){
         this.show = true
         this.show2 = false
     }else{
         this.show = false
         this.show2 = true
     }
       
   },





    computed: {
        user () {
            return this.$store.getters['user']
        },
      },


    methods: {
        logOut(){
            this.$store.dispatch('logOut')
        },

        toPage(nav_list){
          console.log(nav_list)
          this.$router.replace(nav_list.route)
        },
    },
}
</script>



<style>
.v-app-bar{
    position:fixed;
}


  .menu{
      text-align:center;
      margin-bottom:30px;
      font-size:20px;
      cursor:pointer;
      color: black;

  }

    a{
        text-decoration:none;
    }
  

  form{
    max-width:400px;
    margin:50px auto;
  }

  .text-red{
    color:red;
  }
  .tittle{
    color:white;
    margin-left:30px;
  }

  .mdi-chevron-down::before {
    content:none;
}

.v-application a {
    color: #616161 !important;
    font-size:1.2rem;
}

@media screen and (max-width:770px){
   .navi{
       display: none;
   }
}
  
</style>
