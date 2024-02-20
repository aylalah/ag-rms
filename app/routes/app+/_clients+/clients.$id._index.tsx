import ContactCard from '@ui/cards/contact-card';
import ContactForm from '@ui/forms/contact-form';
import dayjs from 'dayjs';
import RMSservice from '@modules/services';
import { ActionFunctionArgs, defer, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Button } from '@components';
import { Client, ClientWithRelations, Contact } from '@helpers/zodPrisma';
import { NavLink, useFetcher, useLoaderData, useNavigate } from '@remix-run/react';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { validateCookie } from '@helpers/cookies';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  const id = params?.id as string;
  const ratingQuery = RMSservice(token)
    .clients.one({ id, include: { ratingModel: true } })
    .then((res) => {
      const { client, error } = res || {};

      console.log(client);
      if (error) throw redirect('/app/client');
      return { client, error };
    });

  return defer({ ratingQuery });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const method = request.method;
  const fd = await request.formData();
  const { token } = await validateCookie(request);
  const body = Object.fromEntries(fd.entries()) as any;

  if (method === 'PATCH') {
    const { id, company, ...rest } = body || {};
    const { updateContact, error } = await RMSservice(token).contacts.update({ id: id as string, data: rest });
    return { message: updateContact, error };
  }

  if (method === 'POST') {
    const { id, ...rest } = body || {};
    console.log(rest);
    const { createContact, error } = await RMSservice(token).contacts.create({ data: rest });
    return { message: createContact, error };
  }

  return {};
};

export default function ClientEdit() {
  const { ratingQuery } = useLoaderData<typeof loader>();
  const [client, setClient] = useState<ClientWithRelations | null>(null);
  const Fetcher = useFetcher();
  const navigate = useNavigate();
  const FetcherData = Fetcher.data as { message: string; error: string };
  const [showForm, setShowForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState({} as any);

  const onNewContact = () => {
    setSelectedContact({} as any);
    setShowForm(true);
  };

  const onClose = () => {
    setShowForm(false);
    setSelectedContact({} as any);
  };

  const onDeleteForm = async (id: string) => {};

  const onEditForm = (el: Contact) => {
    setSelectedContact(el);
    setShowForm(true);
  };

  const goto = (rating: any) => {
    navigate(`/app/ratings/${rating.id}`);
  };

  useEffect(() => {
    ratingQuery?.then((data) => setClient(data?.client as any));
  }, []);

  useEffect(() => {
    if (FetcherData?.message) {
      setShowForm(false);
      toast.success(FetcherData?.message, { toastId: 'success' });
      return;
    }

    if (FetcherData?.error) {
      toast.error(FetcherData?.error, { toastId: 'error' });
      return;
    }
  }, [FetcherData]);

  return (
    <div className="flex flex-col flex-1 h-full gap-4 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border rounded bg-primary border-accent text-base-100">
        <div>
          <p className="text-xl">{client?.companyName} </p>
          <div className="flex items-center gap-4">
            <p className="text-sm opacity-80">{client?.industryModel?.name}</p>
            <NavLink to={`edit`} className="font-bold text-secondary">
              Edit
            </NavLink>
          </div>
        </div>

        <NavLink to="create-ratings" className="tracking-wide btn btn-sm btn-secondary">
          <i className="ri-add-fill" />
          New Rating
        </NavLink>
      </div>

      <div className="flex flex-1 h-full gap-3">
        <div className="flex flex-col flex-1 h-full gap-3">
          <div className="grid flex-1 grid-cols-3 gap-2">
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

          <div className="flex-1 h-full overflow-hidden border bg-primary border-accent">
            <div className="flex items-center justify-between">
              <p className="flex flex-col p-4 text-base text-base-100">Rating History</p>
              <NavLink to="/app/ratings" className="p-4 text-xs hover:underline text-base-100">
                View All
              </NavLink>
            </div>

            <div className="h-[100%] bg-base-100 p-4 overflow-auto">
              <table className="w-full text-sm table-fixed">
                <thead>
                  <tr className="text-left bg-base-200">
                    <th className="w-[2em] px-2">#</th>
                    <th>Primary Analyst</th>
                    <th>Secondary Analyst</th>
                    <th>Rating Score</th>
                    <th>Rating Class</th>
                    <th className="p-3">Rating Year</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {client?.ratingModel?.map((rating, index) => (
                    <tr
                      onClick={() => goto(rating)}
                      key={rating.id}
                      className="border-b cursor-pointer border-accent hover:opacity-70"
                    >
                      <td className="px-2">{index + 1}</td>
                      <td>{rating.primaryAnalyst || '-'}</td>
                      <td>{rating.secondaryAnalyst || '-'}</td>
                      <td>{rating.ratingScore || '-'}</td>
                      <td>{rating.ratingClass || '-'}</td>
                      <td className="p-3">{rating.ratingYear || '-'}</td>
                      <td>
                        <span className={`${rating.status} capitalize text-xs`}>{rating.status || '-'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className=" w-[17em] bg-base-100 p-4 border border-accent">
          <div className="flex items-center justify-between pb-4 border-b border-accent">
            <p>Contacts</p>
            <button onClick={onNewContact} className="text-xs btn btn-sm btn-secondary btn-outline">
              Add Contact
            </button>
          </div>

          {client?.contactModel?.map((contact) => (
            <ContactCard onEditForm={onEditForm} onDeleteForm={onDeleteForm} contact={contact} key={contact.id} />
          ))}
        </div>
      </div>

      {showForm && (
        <ContactForm
          onClose={onClose}
          clientId={client?.id as string}
          show={showForm}
          Fetcher={Fetcher}
          contact={selectedContact}
        />
      )}
    </div>
  );
}

const Card = ({ title, subTitle }: { title: string; subTitle?: string }) => (
  <div className="flex flex-col p-4 border rounded border-accent bg-base-100">
    <p className="text-sm capitalize opacity-50">{title}</p>
    <p className="text-base ">{subTitle}</p>
  </div>
);
