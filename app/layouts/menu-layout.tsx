import { Avatar } from '@components';
import { NavLink } from '@remix-run/react';

type List = {
  name: string;
  to: string;
};

type MenuLinks = {
  name: string;
  to: string;
  list: List[];
}[];

export default function MenuLayout({ children, links }: { children: React.ReactNode; links: MenuLinks }) {
  return (
    <div className="flex flex-col flex-1 h-screen">
      <header className="h-[80px] bg-base-100 flex items-center app-menu">
        <div className="flex items-center justify-between wrapper">
          <div>
            <ul className="flex gap-6">
              {links.map((el, i) => (
                <li key={i}>
                  {el?.list?.length > 0 ? (
                    <div className="dropdown dropdown-hover">
                      <div tabIndex={0} role="button" className="border-none shadow-none bg-base-100 btn">
                        Hover
                      </div>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        {el.list.map((item, index) => (
                          <NavLink to={item.to} className="text-sm capitalize border-none shadow-none bg-base-100 btn">
                            {item.name}
                          </NavLink>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <NavLink to={el.to} className="text-sm capitalize border-none shadow-none bg-base-100 btn">
                      {el.name}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Avatar size="sm" />
          </div>
        </div>
      </header>

      <div className="flex flex-col h-full py-10 wrapper">{children}</div>
    </div>
  );
}
