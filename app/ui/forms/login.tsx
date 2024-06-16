import useAppStore from "@stores";
import { Button, TextInput } from "@components";
import { useEffect, useRef, useState } from "react";
import { FetcherWithComponents, useFetcher } from "@remix-run/react";

const email = "bamidelejoel@agusto.com";
const password = "agusto130476";

export default function LoginForm({
  Fetcher,
}: {
  Fetcher: FetcherWithComponents<any>;
}) {
  const isSubmitting = Fetcher.state === "submitting";
  const { setLoader } = useAppStore.general((state) => state);
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
          <TextInput
            defaultValue={password}
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <div className="flex items-center py-4">
            <div className="flex items-center gap-2 text-sm opacity-80">
              <input
                ref={checkRef}
                onChange={onCheck}
                type="checkbox"
                id="terms"
                name="terms"
                className="cursor-pointer checkbox checkbox-sm"
              />
              <label htmlFor="terms" className="cursor-pointer">
                I have read and agree to the{" "}
                <a href="/terms" className="font-bold text-secondary">
                  Terms of Service
                </a>
              </label>
            </div>

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
