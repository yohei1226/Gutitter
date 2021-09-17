import firebase from '@/plugins/firebase'

import createPersistedState from "vuex-persistedstate";

export const state = () => ({
 user: {
   uid: '',
   email: '',
   name: '',
   photoURL: '',
 },
// ツイートの格納場所　
 tweets:[],
 
// リプライの格納場所
replys:[],
 
 
})

export const getters = {
 user: state => {
   return state.user
 },
 tweets: state => {
   return state.tweets
 },
replys: state => {
 return state.replys
},
 
 
}

export const actions = {
 // ログイン
 login({ dispatch }, payload) {
   this.$firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
     .then(user => {
       dispatch('checkLogin')
       location.reload();
     }).catch((error) => {
       alert(error)
     })
 },
 // ログインできたらプロフィール画像(photoURL)を含めたユーザー情報を取得してくる
 checkLogin({ commit }) {
   this.$firebase.auth().onAuthStateChanged(function (user) {
     if (user) {
       commit('getData', { uid: user.uid, email: user.email, name: user.displayName, photoURL: user.photoURL })
     }
   })
 },
 // 登録
 register ({ dispatch }, payload) {
   this.$firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password,)
   .then(user => {
     dispatch('update', payload.name)
     dispatch('checkLogin')
      　}).catch(function (error) {
        console.log({'code':error.code, 'message':error.message})
      })
  
 },

 
 // 登録が完了すると同時にプロフィール画像(photoURL)と表示名(displayName)をアップデート！
 update ({ context }, name) {
   
   this.$firebase.auth().currentUser.updateProfile({
     displayName: name,
   })
     .then(()=> {

       location.reload()
     })
     .catch((error)=> {
       console.log(error)
     })
 },

 　async updateImage({dispatch,commit},payload){
  
        dispatch('checkLogin')

            let storageRef =   await this.$fireStorage.ref()
            let imageRef =  await storageRef.child(`images/${this.state.user.uid}/${payload.thumbnail.name}`)

            await imageRef.put(payload.thumbnail)
            await imageRef.getDownloadURL()
                .then(res => {
                  console.log(res)
                    this.$firebase.auth().currentUser.updateProfile({
                    photoURL: res,
                  }).then(()=>{
                    commit('updateUserImage', this.$firebase.auth().currentUser.photoURL)
                    console.log(this.$firebase.auth().currentUser)
                    console.log('成功')
                  }).catch((error)=>{
                    console.log(error)
                  })
              })
      },


    changePhotoUrl({ commit }, res) {
      console.log(res);

      // 検索したとする
      const photoURL = res;
      commit("getData", res);
    },



googleLogIn ({ dispatch }) {
    var provider = new this.$firebase.auth.GoogleAuthProvider()
    this.$firebase.auth().signInWithPopup(provider).then(function (result) {
      dispatch('checkLogin')
      location.reload();
      
    }).catch(function (error) {
      console.log(error)
    })
  },

 logOut ({ commit }) {
    this.$firebase.auth().signOut()
      .then(()=> {
        // alert('ログアウトしました')
        commit('logOut')
        this.$router.push('/')
        location.reload();
        
      })
      .catch((error) => {
        alert(error)
      })
  },

  // 
  pushToTweets({commit},data){
   commit('pushToTweets',data)
  },
  pushToReplys({commit},data){
   commit('pushToReplys',data)
  },
  
  emptyTweets({commit}){
    commit('emptyTweets')
  },
  emptyReplys({commit}){
    commit('emptyReplys')
  },
  
}


export const mutations = {
  getData (state, user) {
    state.user = user
    
  },
  logOut (state) {
    state.user = ''
  },
  switchLogin (state) {
    state.user.login = true
  },
  updateUserImage(state,url){
    state.user.photoURL = url
  },
  pushToTweets (state,data){
    state.tweets.push(data) 
    // console.log(data)
  },
  pushToReplys (state,data){
    state.replys.push(data) 
    // console.log(data)
  },
  
  emptyTweets (state){
    state.tweets = []
  },
  emptyReplys (state){
    state.replys = []
  },

  
}