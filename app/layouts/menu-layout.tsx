import useAppStore from '@stores';
import { Avatar, Icons } from '@components';
import { NavLink, useLoaderData } from '@remix-run/react';

interface IRoute {
  name: string;
  to: string;
  icon: string;
  group: string;
}

type IRouteGroup = IRoute[];

export default function MenuLayout({ children, links }: { children: React.ReactNode; links: IRouteGroup }) {
  const { user } = useAppStore.user((state) => state);
  return (
    <div className="flex flex-1 h-screen pl-0 bg-primary">
      {/*       <div className="bg-primary  app-menu  map flex w-[15em] flex-col p-4 py-6 ">
        <div className="h-[80px] px-4">
          <img src="/images/logoDark.png" alt="" className="w-[70%]" />
        </div>

        <ul className="flex flex-col justify-center flex-1 w-full px-4 capitalize text-base-100 rounded-xl">
          {Object.keys(links).map((el, i) => (
            <li key={i}>
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
      </div> */}

      <div className="flex flex-col flex-1 h-full gap-8 overflow-hidden rounded-lg bg-base-200">
        <header className="flex h-[80px] w-full  border-b bg-primary map">
          <div className="container flex items-center justify-between w-full ">
            <div className="flex items-center">
              {/* <a href="/" className="text-2xl font-bold">
                <img src="/images/logoDark.png" alt="" className="h-[40%]" />
              </a>
 */}
              <div className="flex items-center gap-4 ">
                <ul className="flex items-center gap-8 app-menu">
                  {links.map((el, i) => (
                    <li key={i}>
                      <NavLink
                        to={el.to}
                        key={i}
                        className="flex items-center gap-2 py-4 text-white capitalize opacity-50 text"
                      >
                        {Icons[el?.icon as keyof typeof Icons](12)}
                        {el.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <Avatar size="sm" placeholder={`${user?.firstName?.[0] || ''}.${user?.lastName?.[0] || ''}`} />
            </div>
          </div>
        </header>

        <div className="container flex-1 h-full py-2 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
