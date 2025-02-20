import ContactCard from "@ui/cards/contact-card";
import ContactForm from "@ui/forms/contact-form";
import {
  ActionFunctionArgs,
  defer,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Contact } from "@helpers/zodPrisma";
import { Link, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { validateCookie } from "@helpers/cookies";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { token } = await validateCookie(request);
  if (!token)
    return redirect("/", {
      headers: { "Set-Cookie": await appCookie.serialize("", { maxAge: 0 }) },
    });

  const id = params?.id as string;

  const ratingQuery = RMSservice(token)
    .clients.one({
      id,
      include: {
        ratingModel: {
          select: {
            id: true,
            primaryAnalyst: true,
            secondaryAnalyst: true,
            ratingScore: true,
            ratingTitle: true,
            ratingYear: true,
            status: true,
            ratingClassModel: true,
          },
        },
      },
    })
    .then((res) => {
      const { client, error } = res || {};

      return {
        error,
        client: {
          ...client,
          ratingModel: client?.ratingModel?.map((el: any) => {
            // const PrimaryAnalystObject = JSON.parse(el?.primaryAnalyst as any);

            // const SecondaryAnalystObject = JSON.parse(
            //   el?.secondaryAnalyst as any
            // );
            const PrimaryAnalystObject = el?.primaryAnalyst
              ? JSON.parse(el.primaryAnalyst)
              : null;
            const SecondaryAnalystObject = el?.secondaryAnalyst
              ? JSON.parse(el.secondaryAnalyst)
              : null;

            return {
              ...el,
              primaryAnalyst: PrimaryAnalystObject
                ? `${PrimaryAnalystObject.firstname} ${PrimaryAnalystObject.lastname}`
                : "-",

              secondaryAnalyst: SecondaryAnalystObject
                ? `${SecondaryAnalystObject.firstname} ${SecondaryAnalystObject.lastname}`
                : "-",
            };
          }),
        },
      };
    });

  return defer({ ratingQuery });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const method = request.method;
  const fd = await request.formData();
  const { token } = await validateCookie(request);
  const body = Object.fromEntries(fd.entries()) as any;

  if (method === "PATCH") {
    const { id, company, ...rest } = body || {};

    rest.canLogin = rest.canLogin === "on" ? true : false;

    const { updateContact, error } = await RMSservice(token).contacts.update({
      id: id as string,
      data: rest,
    });
    return { message: updateContact, error };
  }

  if (method === "POST") {
    const { id, ...rest } = body || {};
    //at post return true for canLogin
    rest.canLogin = rest.canLogin === "on" ? true : false;

    const { createContact, error } = await RMSservice(token).contacts.create({
      data: rest,
    });
    return { message: createContact, error };
  }

  if (method === "DELETE") {
    const { id } = body || {};
    const { deleteContact, error } = await RMSservice(token).contacts.delete({
      id,
    });
    return { message: deleteContact, error };
  }

  return {};
};

export default function ClientEdit() {
  const { ratingQuery } = useLoaderData<typeof loader>();
  const [client, setClient] =
    useState<ClientOptionalDefaultsWithRelations | null>(null);
  const Fetcher = useFetcher();
  const navigate = useNavigate();
  const FetcherData = Fetcher.data as { message: string; error: string };
  const [showForm, setShowForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState({} as any);
  const [contact, setContact] = useState({} as any);

  const onNewContact = () => {
    setSelectedContact({} as any);
    setShowForm(true);
  };

  const onClose = () => {
    setShowForm(false);
    setSelectedContact({} as any);
  };

  const onDeleteForm = async (id: string) => {
    Fetcher.submit({ id }, { method: "delete" });
  };

  const onEditForm = (el: Contact) => {
    setSelectedContact(el);
    setShowForm(true);
  };

  const goto = (rating: any) => {
    navigate(`/app/ratings/${rating.id}`);
  };

  useEffect(() => {
    ratingQuery?.then((data) => {
      if (!data?.client) return navigate("/app/clients", { replace: true });
      setClient(data?.client as any);
    });

    toast.promise(
      ratingQuery,
      { pending: "Loading client data", error: "Failed to load form object" },
      { toastId: "form-object" }
    );
  }, [ratingQuery, navigate]);

  useEffect(() => {
    if (FetcherData?.message) {
      setShowForm(false);
      toast.success(FetcherData?.message, { toastId: "success" });
      return;
    }

    if (FetcherData?.error) {
      toast.error(FetcherData?.error, { toastId: "error" });
      return;
    }
  }, [FetcherData]);


  return (
    <div className="flex flex-col flex-1 h-full gap-4 overflow-auto">
      <div className="flex items-center justify-between px-4 py-4 border rounded bg-primary border-accent text-base-100">
        <div className="flex items-center gap-3">
          <div
            className="bg-cover rounded-lg w-7 h-7 bg-[#fff2]"
            style={{ backgroundImage: `url(${client?.logo})` }}
          ></div>

          <div className="">
            <p className="font-semibold leading-none capitalize">
              {client?.companyName}{" "}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs opacity-80">
                {client?.industryModel?.name}
              </p>
              <Link to={`edit`} className="text-sm font-bold text-secondary">
                <i className="ri-edit-fill" />
                Edit
              </Link>
            </div>
          </div>
        </div>

        <Link
          to="create-ratings"
          className="tracking-wide btn btn-sm btn-secondary"
        >
          <i className="ri-add-fill" />
          New Rating
        </Link>
      </div>

      <div className="flex flex-1 h-full gap-3">
        <div className="flex flex-col flex-1 h-full gap-3">
          <div className="grid flex-1 grid-cols-3 gap-2">
            <Card title="Industry" subTitle={client?.industryModel?.name} />
            <Card
              title="Company Phone Numbers"
              subTitle={client?.companyPhoneNumbers || "-"}
            />
            <Card
              title="NumberAnd  Street"
              subTitle={client?.numberAndStreet || "-"}
            />
            <Card title="building" subTitle={client?.building || "-"} />
            <Card title="area" subTitle={client?.area || "-"} />
            <Card title="landmark" subTitle={client?.landmark || "-"} />
            <Card
              title="Region/State"
              subTitle={client?.regionOrState || "-"}
            />
            <Card title="country" subTitle={client?.country || "-"} />
            <Card title="website" subTitle={client?.website || "-"} />
          </div>

          <div className="flex-1 h-full border bg-bae-100 border-accent">
            <div className="flex items-center justify-between bg-primary">
              <p className="flex flex-col p-4 text-base text-base-100">
                Rating History
              </p>
              <Link
                to="/app/ratings"
                className="p-4 text-xs hover:underline text-base-100"
              >
                View All
              </Link>
            </div>

            <div className="p-4 bg-base-100 ">
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
                  {client?.ratingModel?.map((rating: any, index) => (
                    <tr
                      onClick={() => goto(rating)}
                      key={rating.id}
                      className="border-b cursor-pointer border-accent hover:opacity-70"
                    >
                      <td className="px-2">{index + 1}</td>
                      <td>{rating?.primaryAnalyst || "-"}</td>
                      <td>{rating?.secondaryAnalyst || "-"}</td>
                      <td>{rating?.ratingScore || "-"}</td>
                      <td>{rating?.ratingClassModel?.name || "-"}</td>
                      <td className="p-3">{rating.ratingYear || "-"}</td>
                      <td>
                        <span className={`${rating.status} capitalize text-xs`}>
                          {rating.status || "-"}
                        </span>
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
            <button
              onClick={onNewContact}
              className="text-xs btn btn-sm btn-secondary btn-outline"
            >
              Add Contact
            </button>
          </div>

          {client?.contactModel?.map((contact) => (
            <ContactCard
              onEditForm={onEditForm}
              onDeleteForm={onDeleteForm}
              contact={contact}
              key={contact.id}
            />
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
  <div className="flex flex-col px-4 py-2 border rounded border-accent bg-base-100">
    <p className="text-xs capitalize opacity-50">{title}</p>
    <p className="">{subTitle}</p>
  </div>
);
