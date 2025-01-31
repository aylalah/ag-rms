import LoginForm from "@ui/forms/login";
import { ActionFunctionArgs, json, redirectDocument } from "@remix-run/node";
import { appCookie } from "@helpers/cookies";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import { z } from "zod";

const whyUs = [
  "Our approach",
  "Understanding of the local business terrain and network of contacts",
  "Our database spans various industries and sectors of the Nigerian, Kenyan and Rwandan economies",
  "Our track record and reputation",
  "Our people are technically sound",
  "Extensive research on key industries in the Nigerian, Kenyan and Rwandan economies",
  "In depth knowledge of the financial strength of companies in the financial services and the real sector",
  "Our rich economic and industry databases",
];

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const fd = await request.formData();
    const body = Object.fromEntries(fd) as {
      email: string;
      password: string;
      terms?: string;
    };

    const { token, user, error, apiToken, client, message } =
      await RMSservice().auth.login(body);

    // console.log(token, user, error, apiToken, client, message);

    if (client && token) {
      return redirectDocument("/client/ratings", {
        headers: {
          "set-cookie": await appCookie.serialize(
            JSON.stringify({ token, client })
          ),
        },
      });
    }

    if (token && user) {
      return redirectDocument("/app/dashboard", {
        headers: {
          "set-cookie": await appCookie.serialize(
            JSON.stringify({ token, apiToken, user })
          ),
        },
      });
    }

    // if (client && token) {
    //   return redirectDocument("/client/dashboard", {
    //     headers: {
    //       "set-cookie": await appCookie.serialize(
    //         JSON.stringify({ token, client })
    //       ),
    //     },
    //   });
    // }

    return json({ error });
  } catch (error) {
    console.log(error);
    return { error: "Unable to login at this time. Please try again later." };
  }
};

export default function Index() {
  const Fetcher = useFetcher();
  const fetcherData = Fetcher.data as { error: string };

  useEffect(() => {
    if (fetcherData?.error)
      toast.error(fetcherData?.error, { toastId: "login-error" });
  }, [fetcherData]);

  return (
    <div className="h-screen overflow-auto">
      <div className="flex py-4 bg-primary frameBg">
        <div className="container flex lg:flex-row flex-col lg:gap-[6em]">
          <div className="relative flex flex-col lg:text-left text-center justify-center flex-1 gap-6 text-white py-[10vh] lg:py-[29vh]">
            <h1 className="text-6xl font-bold leading-[1.1em]">
              Agusto & Co.'s Rating Management System
            </h1>

            <p className="text-xl leading-[1.6em] opacity-70">
              Strengthen your creditworthiness with the Agusto Rating Management
              System. Our streamlined platform simplifies data collection,
              ensuring a transparent and efficient rating process for informed
              decision-making.
            </p>
          </div>

          <div className="flex items-center justify-center w-full lg:w-[30em] ">
            <LoginForm Fetcher={Fetcher} />
          </div>
        </div>
      </div>

      <div className="container flex py-[5em] gap-10 items-center">
        <div className="flex-1 coverageBg">
          <img src="/images/coverage.png" alt="coverage" className="w-[80%]" />
        </div>

        <div className="flex flex-col flex-1 gap-6">
          <h1 className="text-3xl font-bold">About Agusto & Co.</h1>
          <p className="text-lg">
            Agusto & Co. is a foremost research house and an expert voice on the
            major economies, industries and businesses operating in sub-Saharan
            Africa. Our database on sub-Saharan African economies spans more
            than 25 years and across the high-level macroeconomic information to
            the granular individual company ratios.
          </p>

          <p className="text-lg">
            For over 25 years, we have employed our unique research methodology
            and wealth of experience in sub-Saharan Africa to deliver considered
            perspectives on more than 50 industries including Banking, Oil &
            Gas, Real Estate, Food & Beverage, Construction, Building Materials
            and Telecommunications.{" "}
          </p>
        </div>
      </div>

      <div className="frameBg2">
        <div className=" flex py-[6em] bg opacity-95">
          <div className="container flex flex-col gap-6">
            <h3 className="text-3xl font-bold text-base-100">
              Why Agusto & Co.{" "}
            </h3>

            <div className="flex flex-col gap-3 text-lg text-base-100 opacity-70 ">
              {whyUs.map((el) => (
                <div key={el} className="flex gap-4">
                  <i className="ri-arrow-right-line" />
                  <p>{el}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//https://dev.localhost/auth/magic-link?token=an6aq73luk4k7g04j0tx7a
