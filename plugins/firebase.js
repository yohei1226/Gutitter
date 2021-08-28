import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import config from './../firebaseConfig.json'

if (!firebase.apps.length) {
  firebase.initializeApp({ ...config })

  // 今回は現在のセッションまたはタブでのみ状態が保持される設定 
  　firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
    console.log('Initialized!') // 確認用のメッセージ
  })
}

export default ({ app }, inject) => {
  inject('firebase', firebase)
  inject('firestore', firebase.firestore())
  inject('fireAuth', firebase.auth())
  inject('fireStorage', firebase.storage())
}

