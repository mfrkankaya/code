import Link from 'next/link'

// prefetch sayesinde component render edildiğinde prefetch parametresinin verildiği linkin yönlendiği adres, o linke tıklanmadan yüklenir ve işlem hızlandırılır. yalnızca kesin tıklanması beklenene linklerde stratejik olarak kullanılmalı (SADECE HHTPS BAĞLATILAR İLE ÇALIŞIR)
const Navbar = () => (
  <div>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link prefetch href="/users">
      <a>Users</a>
    </Link>
  </div>
)

export default Navbar
