import { AnimatePresence, motion } from "framer-motion";
import { Button, TextInput } from "@components";
import { Contact } from "@helpers/zodPrisma";
import { useEffect, useState } from "react";

import { type FetcherWithComponents } from "@remix-run/react";

interface ContactFormProps {
  Fetcher: FetcherWithComponents<any>;
  contact?: Contact | null;
  clientId: string;
  onClose: () => void;
  show: boolean;
}
//generate password using the randomstring function from utils.ts

// const ContactForm = ({
//   Fetcher,
//   clientId,
//   onClose,
//   contact,
//   show,
// }: ContactFormProps) => {
//   //generate password using the randomstring function from utils.ts
//   // const [password, setPassword] = useState("");

//   //checkbox for canLogin
//   const [canLogin, setCanLogin] = useState(false);

//   useEffect(() => {
//     addEventListener("keydown", (e) => {
//       if (e.key === "Escape") onClose();
//     });
//     return () => removeEventListener("keydown", (e) => e.key === "Escape");
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="h-screen w-full flex justify-center items-center bg-[#0009] absolute top-0 left-0 z-10">
//       <Fetcher.Form method={contact?.id ? "PATCH" : "POST"}>
//         <fieldset className="flex flex-col justify-start gap-2 bg-base-100 w-[30em]  p-[3em] rounded-lg shadow">
//           <header className="flex items-end justify-between gap-1 pb-4 ">
//             <p className="text-2xl font-bold">
//               {contact?.id ? "Update" : "Create"} Contact
//             </p>

//             <span
//               className="flex items-center gap-2 transition-all cursor-pointer hover:scale-105 hover:opacity-60"
//               onClick={onClose}
//             >
//               <i className="flex items-center justify-center w-8 h-8 text-xl rounded-full shadow-lg bg-secondary ri-close-fill text-base-100 bg-action" />
//             </span>
//           </header>

//           <div className="grid gap-4 py-4 lg:grid-cols-1">
//             <label className="flex items-center gap-2 text-sm">
//               <input
//                 name="canLogin"
//                 type="checkbox"
//                 checked={canLogin}
//                 defaultChecked={contact?.canLogin || false}
//                 onChange={(e) => setCanLogin(e.target.checked)}
//                 className="checkbox checkbox-secondary"
//               />
//               Can Login?
//             </label>
//             <input
//               name="client"
//               type="hidden"
//               defaultValue={clientId || undefined}
//             />

//             <input
//               name="id"
//               type="hidden"
//               defaultValue={contact?.id || undefined}
//               onChange={() => ""}
//             />
//             <TextInput
//               placeholder="Please enter the full name"
//               type="text"
//               label="Full Name"
//               name="fullName"
//               defaultValue={contact?.fullName || ""}
//               required
//             />
//             <TextInput
//               placeholder="Enter email address"
//               type="email"
//               label="Email"
//               name="email"
//               defaultValue={contact?.email || ""}
//             />
//             {canLogin && (
//               <TextInput
//                 placeholder="Enter password"
//                 type="text"
//                 label="Password"
//                 name="password"
//                 defaultValue={contact?.password || ""}
//                 value={randomString(10)}
//                 readOnly
//               />
//             )}
//             <TextInput
//               placeholder="Enter phone numbers separated by commas"
//               type="text"
//               label="Phone Numbers"
//               name="phoneNumbers"
//               defaultValue={contact?.phoneNumbers || ""}
//             />
//             {/* <Button type="submit" className="btn-secondary">
//               Contact
//             </Button> */}
//             <Button
//               type="submit"
//               className="btn-secondary"
//               disabled={Fetcher.state !== "idle"}
//             >
//               {Fetcher.state === "submitting"
//                 ? "Processing..."
//                 : `${contact?.id ? "Update" : "Create"} Contact`}
//             </Button>
//           </div>
//         </fieldset>
//       </Fetcher.Form>
//     </div>
//   );
// };
const ContactForm = ({
  Fetcher,
  clientId,
  onClose,
  contact,
  show,
}: ContactFormProps) => {
  const [email, setEmail] = useState(contact?.email || ""); // Track email changes
  const [canLogin, setCanLogin] = useState(contact?.canLogin || false);
  const [showPasswordField, setShowPasswordField] = useState(false); // Show password field only when needed

  useEffect(() => {
    addEventListener("keydown", (e) => {
      if (e.key === "Escape") onClose();
    });
    return () => removeEventListener("keydown", (e) => e.key === "Escape");
  }, []);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#0009] absolute top-0 left-0 z-10">
      <Fetcher.Form method={contact?.id ? "PATCH" : "POST"}>
        <fieldset className="flex flex-col justify-start gap-2 bg-base-100 w-[30em] p-[3em] rounded-lg shadow">
          <header className="flex items-end justify-between gap-1 pb-4">
            <p className="text-2xl font-bold">
              {contact?.id ? "Update" : "Create"} Contact
            </p>
            <span
              className="flex items-center gap-2 transition-all cursor-pointer hover:scale-105 hover:opacity-60"
              onClick={onClose}
            >
              <i className="flex items-center justify-center w-8 h-8 text-xl rounded-full shadow-lg bg-secondary ri-close-fill text-base-100 bg-action" />
            </span>
          </header>

          <div className="grid gap-4 py-4 lg:grid-cols-1">
            <label className="flex items-center gap-2 text-sm">
              <input
                name="canLogin"
                type="checkbox"
                checked={canLogin}
                defaultChecked={contact?.canLogin || false}
                onChange={(e) => setCanLogin(e.target.checked)}
                className="checkbox checkbox-secondary"
              />
              Can Login?
            </label>

            <input
              name="client"
              type="hidden"
              defaultValue={clientId || undefined}
            />
            <input
              name="id"
              type="hidden"
              defaultValue={contact?.id || undefined}
              onChange={() => ""}
            />

            <TextInput
              placeholder="Please enter the full name"
              type="text"
              label="Full Name"
              name="fullName"
              defaultValue={contact?.fullName || ""}
              required
            />

            <TextInput
              placeholder="Enter email address"
              type="email"
              label="Email"
              name="email"
              defaultValue={contact?.email || ""}
              onChange={(e) => {
                setEmail(e.target.value);
                setShowPasswordField(e.target.value !== contact?.email);
              }}
            />

            {/* Show password field only if the email has changed or it's a new contact */}
            {showPasswordField && (
              <TextInput
                placeholder="Enter new password"
                type="text"
                label="Password"
                name="password"
                defaultValue={randomString(10)}
                readOnly
              />
            )}

            <TextInput
              placeholder="Enter phone numbers separated by commas"
              type="text"
              label="Phone Numbers"
              name="phoneNumbers"
              defaultValue={contact?.phoneNumbers || ""}
            />

            <Button
              type="submit"
              className="btn-secondary"
              disabled={Fetcher.state !== "idle"}
            >
              {Fetcher.state === "submitting"
                ? "Processing..."
                : `${contact?.id ? "Update" : "Create"} Contact`}
            </Button>
          </div>
        </fieldset>
      </Fetcher.Form>
    </div>
  );
};

export default ContactForm;
