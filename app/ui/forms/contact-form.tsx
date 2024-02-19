import { AnimatePresence, motion } from 'framer-motion';
import { Button, TextInput } from '@components';
import { Contact } from '@helpers/zodPrisma';
import { useEffect } from 'react';

import { type FetcherWithComponents } from '@remix-run/react';

interface ContactFormProps {
  Fetcher: FetcherWithComponents<any>;
  contact?: Contact | null;
  companyId: string;
  onClose: () => void;
  show: boolean;
}

const ContactForm = ({ Fetcher, companyId, onClose, contact, show }: ContactFormProps) => {
  useEffect(() => {
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape') onClose();
    });
    return () => removeEventListener('keydown', (e) => e.key === 'Escape');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#0009] absolute top-0 left-0 z-10">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed inset-0 z-10 bg-[#0009]"
            onClick={onClose}
          >
            <Fetcher.Form method={contact?.id ? 'PATCH' : 'POST'}>
              <fieldset className="flex flex-col justify-start gap-2 bg-base-100 w-[30em]  p-[3em] rounded-lg shadow">
                <header className="flex items-end justify-between gap-1 pb-4 ">
                  <p className="text-2xl font-bold">{contact?.id ? 'Update' : 'Create'} Contact</p>

                  <span
                    className="flex items-center gap-2 transition-all cursor-pointer hover:scale-105 hover:opacity-60"
                    onClick={onClose}
                  >
                    <i className="flex items-center justify-center w-8 h-8 text-xl rounded-full shadow-lg ri-close-fill text-primary bg-action" />
                  </span>
                </header>

                <div className="grid gap-4 py-4 lg:grid-cols-1">
                  <input name="company" type="hidden" defaultValue={companyId || undefined} />
                  <input name="id" type="hidden" defaultValue={contact?.id || undefined} onChange={() => ''} />
                  <TextInput
                    placeholder="Please enter the full name"
                    type="text"
                    label="Full Name"
                    name="fullName"
                    defaultValue={contact?.fullName || ''}
                    required
                  />

                  <TextInput
                    placeholder="Enter email address"
                    type="email"
                    label="Email"
                    name="email"
                    defaultValue={contact?.email || ''}
                  />

                  <TextInput
                    placeholder="Enter password"
                    type="text"
                    label="Phone Numbers"
                    name="phoneNumbers"
                    defaultValue={contact?.phoneNumbers || ''}
                  />

                  <Button type="submit" className="btn-secondary">
                    Contact
                  </Button>
                </div>
              </fieldset>
            </Fetcher.Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
