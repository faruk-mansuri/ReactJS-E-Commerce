import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: 'about', text: 'about' },
  { id: 3, url: 'products', text: 'products' },
  { id: 4, url: 'cart', text: 'cart' },
  { id: 5, url: 'checkout', text: 'checkout' },
  { id: 6, url: 'orders', text: 'orders' },
];

const NavLinks = () => {
  const { user } = useSelector((store) => store.userState);

  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;

        if (!user && (url === 'checkout' || url == 'orders')) return;

        return (
          <li key={id}>
            <NavLink className='capitalize' to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
