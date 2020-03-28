import Link from 'next/link'
import Router from 'next/router'

// onMouseEnter ile prefetch kullanarak sadece üzerine gelinen linki önden yükleyebiliyoruz

const UserList = ({ users }) => (
  <div>
    {users.map(user => (
      <div key={user.id}>
        <Link
          href={`/user?name=${user.username}`}
          as={`/user/${user.username}`}
        >
          <a
            onMouseEnter={() => Router.prefetch(`/user?name=${user.username}`)}
            className="username"
          >
            {user.username}
          </a>
        </Link>
      </div>
    ))}
    <style jsx>{`
      .username {
        color: red;
      }
    `}</style>
  </div>
)

export default UserList
