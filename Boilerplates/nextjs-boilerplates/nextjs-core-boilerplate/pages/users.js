import Layout from '../components/Layout'
import fetch from 'isomorphic-fetch'
import UserList from '../components/UserList'

const Users = props => (
  <Layout>
    <h1>Users Page</h1>
    <UserList users={props.users} />
  </Layout>
)

Users.getInitialProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()

  return {
    users
  }
}
export default Users
