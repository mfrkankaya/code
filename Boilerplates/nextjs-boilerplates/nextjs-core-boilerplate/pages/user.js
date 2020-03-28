import React from 'react'
import { withRouter } from 'next/router'
import Layout from '../components/Layout'

// getInitialProps olmadan query içindeki name gelmiyor. (sadece express tarafında parametreyi handle ederken gerekli)
// widthRouter'ı props.url deprecated olduğu için kullandık
// ANCHOR getInitialProps'u tam olarak öğren

const User = props => {
  const {
    router: {
      query: { name }
    }
  } = props
  console.log(props)
  return (
    <Layout>
      <h1>User Detail</h1>
      {name}
    </Layout>
  )
}

User.getInitialProps = ({ query }) => {
  return { asdassa: 'asdsa' }
}
export default withRouter(User)
