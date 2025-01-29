import useAppStore from "@stores";
import { Button, TextInput } from "@components";
import { useEffect, useRef, useState } from "react";
import { FetcherWithComponents, useFetcher } from "@remix-run/react";

// const email = "bamidelejoel@agusto.com";
// const password = "agusto130476";
const email = "";
const password = "";

export default function LoginForm({
  Fetcher,
}: {
  Fetcher: FetcherWithComponents<any>;
}) {
  const isSubmitting = Fetcher.state === "submitting";
  const { setLoader } = useAppStore.general((state) => state);
  const [showPassword, setShowPassword] = useState(false);
  const checkRef = useRef<HTMLInputElement>(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const onCheck = () => {
    setCanSubmit(checkRef?.current?.checked as any);
  };

  useEffect(() => setLoader(isSubmitting), [isSubmitting]);

  return (
    <Fetcher.Form method="post" className="w-full">
      <fieldset
        disabled={isSubmitting}
        className="flex flex-col rounded-lg w-full gap-6 px-[3em] py-[3em]  bg-base-100"
      >
        <div className="flex flex-col">
          <p className="text-2xl font-bold">User Login</p>
          <p className="text-sm opacity-40">
            Please enter your email and password to login
          </p>
        </div>

        <div className="flex flex-col flex-1 gap-1">
          <TextInput
            defaultValue={email}
            name="email"
            type="email"
            placeholder="Enter you email address"
          />
          {/* <TextInput
            defaultValue={password}
            name="password"
            type="password"
            placeholder="Enter your password"
          /> */}
          <div className="relative w-full">
            <TextInput
              defaultValue={password}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="relative"
              // className="w-full p-2 border rounded"
            />

            {/* Toggle Button (Using Remix Icon) */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[45%] text-gray-500"
            >
              <i
                className={showPassword ? "ri-eye-line" : "ri-eye-off-line"}
              ></i>
            </button>
          </div>
          <div className="flex items-center py-4">
            {/* <a href="/auth/forgot-password" className="text-xs">
              Forgot Password?
            </a> */}
          </div>

          <Button type="submit" className="btn-secondary">
            LOGIN
          </Button>
        </div>
      </fieldset>
    </Fetcher.Form>
  );
}
