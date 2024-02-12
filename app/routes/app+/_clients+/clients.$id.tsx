import RMSservice from '@modules/services';
import { Button } from '@components';
import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { validateCookie } from '@helpers/cookies';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  const id = params?.id as string;
  const { client, error } = await RMSservice(token).clients.one({ id });

  console.log(client, id);

  if (error) throw redirect('/app/client');
  return { client, error };
};

export default function ClientEdit() {
  const { client, error } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col flex-1 h-full gap-4 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border bg-primary border-line text-base-100 rounded-xl">
        <div>
          <p className="text-lg font-bold">{client?.companyName} </p>
          <div className="flex items-center gap-4">
            <p className="text-sm opacity-80">{client?.industryModel?.name}</p>
            <button className="font-bold text-secondary">Edit</button>
          </div>
        </div>

        <Button className="tracking-wide btn-secondary">Add Rating</Button>
      </div>

      <div className="flex flex-1 h-full gap-3">
        <div className="flex flex-col flex-1 h-full gap-3">
          <div className="grid flex-1 grid-cols-3 gap-3">
            <Card title="Industry" subTitle={client?.industryModel?.name} />
            <Card title="Company Email" subTitle={client?.companyEmail} />
            <Card title="Company Phone Numbers" subTitle={client?.companyPhoneNumbers || '-'} />
            <Card title="NumberAnd  Street" subTitle={client?.numberAndStreet || '-'} />
            <Card title="building" subTitle={client?.building || '-'} />
            <Card title="area" subTitle={client?.area || '-'} />
            <Card title="landmark" subTitle={client?.landmark || '-'} />
            <Card title="Region/State" subTitle={client?.regionOrState || '-'} />
            <Card title="country" subTitle={client?.country || '-'} />
            <div className="col-span-2 ">
              <Card title="website" subTitle={client?.website || '-'} />
            </div>
          </div>

          <div className="flex-1 p-2 bg-primary">
            <p className="text-base font-bold text-base-100">Rating History</p>
          </div>
        </div>

        <div className=" w-[17em] bg-base-100 p-4">112</div>
      </div>
    </div>
  );
}

const Card = ({ title, subTitle }: { title: string; subTitle?: string }) => (
  <div className="flex flex-col p-4 rounded-lg shadow bg-base-100">
    <p className="text-sm capitalize opacity-50">{title}</p>
    <p className="text-base font-bold">{subTitle}</p>
  </div>
);
