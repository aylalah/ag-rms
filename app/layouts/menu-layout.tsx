import { Avatar, Icons } from '@components';
import { NavLink } from '@remix-run/react';

interface IRoute {
  name: string;
  to: string;
  icon: string;
  group: string;
}

type IRouteGroup = {
  [key: string]: IRoute[];
};

export default function MenuLayout({ children, links }: { children: React.ReactNode; links: IRouteGroup }) {
  return (
    <div className="flex flex-1 h-screen p-6 pl-0 bg-primary">
      <div className="flex  py-6  bg-primary app-menu w-[16em] p-4 flex-col ">
        <div className="h-[80px] px-4">
          <img src="/images/logoDark.png" alt="" className="w-[70%]" />
        </div>

        <ul className="flex flex-col justify-center flex-1 w-full px-4 capitalize rounded-xl text-base-100">
          {Object.keys(links).map((el, i) => (
            <li key={i}>
              {/* {el} */}

              {links[el as keyof typeof links].map((el, i) => (
                <NavLink to={el.to} className="flex items-center gap-4 py-4 capitalize opacity-50">
                  {Icons[el?.icon as keyof typeof Icons](18)}
                  {el.name}
                </NavLink>
              ))}

              {i === 0 && <div className="h-[0.4em] my-3 bg-[#FFF1]"></div>}
            </li>
          ))}
        </ul>

        <div className="h-[80px] flex items-center text-base-100 gap-3">
          <Avatar size="sm" placeholder="CU" />

          <div>
            <p className="text-sm opacity-80">Chijioke Udokporo</p>
            <p className="text-sm font-bold opacity-80 text-secondary">Technology & Innovation</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 h-full gap-8 px-8 overflow-hidden rounded-lg bg-base-200">
        <header className="flex justify-between items-center h-[60px] border-b wrapper">
          <div>Hello World</div>

          <div></div>
        </header>
        <div className="flex-1 h-full px-6 py-2 overflow-hidden wrapper">{children}</div>
      </div>
    </div>
  );
}
