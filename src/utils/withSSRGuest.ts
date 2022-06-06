import decode from "jwt-decode";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

export function withSRRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    const token = cookies["nextauth.token"];

    if (token) {
      const { roles } = decode<{ roles: string }>(token);

      console.log(roles);

      if (roles === "admin") {
        return {
          redirect: {
            destination: "/admin/dashboard",
            permanent: false,
          },
        };
      }

      if (roles === "client") {
        return {
          redirect: {
            destination: "/client/home",
            permanent: false,
          },
        };
      }

      if (roles === "nutritionist") {
        return {
          redirect: {
            destination: "/nutritionist/home",
            permanent: false,
          },
        };
      }
    }
    return fn(ctx);
  };
}
