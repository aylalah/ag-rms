import useAppStore from '@stores';
import { Avatar, Icons } from '@components';
import { NavLink, useLoaderData } from '@remix-run/react';

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
  const { user } = useAppStore.user((state) => state);
  return (
    <div className="flex flex-1 h-screen p-6 pl-0 bg-primary">
      <div className="bg-primary  app-menu  map flex w-[16em] flex-col p-4 py-6 ">
        <div className="h-[80px] px-4">
          <img src="/images/logoDark.png" alt="" className="w-[70%]" />
        </div>

        <ul className="flex flex-col justify-center flex-1 w-full px-4 capitalize text-base-100 rounded-xl">
          {Object.keys(links).map((el, i) => (
            <li key={i}>
              {/* {el} */}

              {links[el as keyof typeof links].map((ell, ii) => (
                <NavLink to={ell.to} key={ii} className="flex items-center gap-4 py-4 capitalize opacity-50">
                  {Icons[ell?.icon as keyof typeof Icons](18)}
                  {ell.name}
                </NavLink>
              ))}

              {i === 0 && <div className="my-3 h-[0.4em] bg-[#FFF1]"></div>}
            </li>
          ))}
        </ul>

        <div className="text-base-100 flex h-[80px] items-center gap-3">
          <Avatar size="sm" placeholder={`${user?.firstName?.[0] || ''}.${user?.lastName?.[0] || ''}`} />

          <div>
            <p className="text-sm opacity-80">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm font-bold text-secondary opacity-80">{user?.departmentRole}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 h-full gap-8 px-8 overflow-hidden rounded-lg bg-base-200">
        <header className="wrapper flex h-[60px] items-center justify-between border-b">
          <div>Hello World</div>

          <div></div>
        </header>
        <div className="flex-1 h-full px-6 py-2 overflow-hidden wrapper">{children}</div>
      </div>
    </div>
  );
}
