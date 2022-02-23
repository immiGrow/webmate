
import UserState from '../context/UserApi/Userstate'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return <UserState>
  <Component {...pageProps} />
  </UserState>
}

export default MyApp
