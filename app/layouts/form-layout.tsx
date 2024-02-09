import { FetcherWithComponents } from '@remix-run/react';
import {
  ControlBoolean,
  ControlCheckboxes,
  ControlInput,
  ControlJsonTextArea,
  ControlObject,
  ControlTextArea,
  splitCamelCase,
  Title,
} from './_/layoutComponents';

type FormLayoutProps = {
  slug: string;
  data: any;
  formObject:
    | {
        field: string;
        type: string;
        required?: boolean;
        value?: string;
        list?: { name: string; id: string | number }[] | undefined;
      }[]
    | undefined;
  Fetcher: FetcherWithComponents<any>;
};

export const FormLayout = ({ Fetcher, data, formObject, ...props }: FormLayoutProps) => {
  const method = data?.id ? 'PATCH' : 'POST';
  const title = data?.id ? 'Update' : 'Create';
  const isSubmitting = Fetcher?.state === 'submitting';

  return (
    <div className="h-[100%]">
      <Fetcher.Form method={method} className="flex h-full">
        <fieldset disabled={isSubmitting} className="grid grid-cols-3 flex-1 overflow-hidden h-[100%] gap-2">
          <div className="flex flex-col flex-1 h-[100%] col-span-2 gap-4 overflow-auto ">
            <Title title={`${title} ${props?.slug}`} />

            <div className="flex flex-col col-span-2 gap-4 pt-6 pr-[4em] pb-10">
              {formObject?.map((el, i: number) => {
                const field = el?.field;
                const defaultValue = el.value;
                const dataType = el?.type || 'input';
                const isRequired = el?.required;
                const list = el?.list;

                return (
                  <div key={i} className="flex flex-col gap-1 mb-3">
                    <p className="text-xs font-bold uppercase text-text text-light">
                      {splitCamelCase(field)} {isRequired && '*'}
                    </p>

                    {dataType === 'json' && <ControlJsonTextArea el={field} required={isRequired} />}
                    {dataType === 'textarea' && (
                      <ControlTextArea placeholder={field} required={isRequired} defaultValue={defaultValue} />
                    )}
                    {dataType === 'text' && (
                      <ControlInput placeholder={field} required={isRequired} type="text" defaultValue={defaultValue} />
                    )}
                    {dataType === 'email' && (
                      <ControlInput
                        placeholder={field}
                        required={isRequired}
                        type="email"
                        defaultValue={defaultValue}
                      />
                    )}
                    {dataType === 'number' && (
                      <ControlInput
                        placeholder={field}
                        required={isRequired}
                        type="number"
                        defaultValue={defaultValue}
                      />
                    )}
                    {dataType === 'boolean' && (
                      <ControlBoolean
                        placeholder={field}
                        required={isRequired}
                        defaultValue={defaultValue || 'false'}
                      />
                    )}

                    {dataType === 'object' && (
                      <ControlObject
                        name={field}
                        placeholder={field}
                        data={list as any}
                        required={isRequired}
                        defaultValue={defaultValue}
                      />
                    )}

                    {dataType === 'checkboxes' && (
                      <ControlCheckboxes
                        el={field}
                        value={list}
                        isRequired={isRequired}
                        type="checkboxes"
                        defaultValue={defaultValue}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative flex flex-col gap-4 overflow-hidden border rounded bg-surface border-line">
            <div className="flex flex-col w-full gap-4 p-8 mx-auto overflow-hidden bg-base-100">
              <div className="pt-4">
                <p className="text-sm font-semibold opacity-60">
                  Publishing changes will update the live version of this data
                </p>
              </div>

              <div className="flex gap-4 py-3 border-b border-line">
                <button className="flex-1 p-3 font-semibold rounded shadow bg-secondary text-base-100">Save</button>
                <button className="flex-1 p-3 font-semibold border rounded shadow bg-surface text-text">
                  Delete Item
                </button>
              </div>

              <div className="flex flex-col h-full gap-4 overflow-hidden">
                <h2 className="text-xl font-bold">Details</h2>

                <Card title="Created At" description={data?.createdAt} />
                <Card title="Last Updated" description={data?.updatedAt} />
              </div>
            </div>
          </div>
        </fieldset>
      </Fetcher.Form>
    </div>
  );
};

const Card = (input: { title: string; description: string }) => (
  <div>
    <h1 className="text-[10px] font-bold uppercase opacity-70">{input.title}</h1>
    <p className="text-sm">{input.description}</p>
  </div>
);
