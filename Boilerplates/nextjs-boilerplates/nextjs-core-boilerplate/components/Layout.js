import Head from 'next/Head'
import Navbar from './Navbar'

const Layout = props => (
  <div>
    <Head>
      <title>My Website</title>
    </Head>
    <Navbar />
    {props.children}
  </div>
)

export default Layout
