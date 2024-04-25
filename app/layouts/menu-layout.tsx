import useAppStore from '@stores';
import { Icons } from '@components';
import { NavLink } from '@remix-run/react';

interface IRoute {
  name: string;
  to: string;
  icon: string;
  group: string;
}

type IRouteGroup = IRoute[];

export default function MenuLayout({
  children,
  links,
  settings,
}: {
  children: React.ReactNode;
  links: IRouteGroup;
  settings: IRouteGroup;
}) {
  const { user, client } = useAppStore.user((state) => state);

  return (
    <div className="flex flex-1 h-screen pl-0 bg-primary">
      <div className="flex flex-col flex-1 h-full overflow-hidden rounded-lg bg-base-200">
        <header className="flex h-[100px] w-full  border-b bg">
          <div className="container flex items-center justify-between w-full ">
            <div className="flex items-center gap-10">
              <a href="/" className="text-xl font-bold">
                <img src="/images/logoDark.png" alt="" className="h-[20px]" />
              </a>

              <div className="flex items-center gap-4 ">
                <ul className="flex items-center gap-10 app-menu">
                  {links.map((el, i) => (
                    <li key={i}>
                      <NavLink
                        to={el.to}
                        key={i}
                        className="flex items-center py-4 text-sm text-white capitalize opacity-50 min-w-[5em] justify-center gap-2"
                      >
                        {Icons[el?.icon as keyof typeof Icons](16)}
                        {el.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 py-4 text-sm text-white capitalize cursor-pointer"
                >
                  {client?.id && <p>{client?.companyName}</p>}
                  {user?.id && (
                    <p>
                      {user?.firstname} {user?.lastname}
                    </p>
                  )}

                  <i className="text-lg text-white ri-arrow-down-s-fill" />
                </div>
                <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                  {settings.map((el, i) => (
                    <li key={i}>
                      <a href={el.to} key={i} className="flex items-center gap-2 py-4 text-sm capitalize text-primary">
                        <i className={`"text-white ${el.icon}`} />
                        {el.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="flex w-10 h-10 bg-cover rounded-full bg-base-100"
                style={{ backgroundImage: `url(${user?.image || client?.logo})` }}
              ></div>
            </div>
          </div>
        </header>

        <div className="container flex flex-col flex-1 h-full overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
