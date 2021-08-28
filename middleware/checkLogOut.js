


export default async function ({ redirect, app }) {
    if (await app.$auth() === null) {
      // ログアウト中だったらTOPページに遷移する
      redirect('/login')
    }
  }
  