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
      const { roles } = decode<{ permissions: string[]; roles: string[] }>(
        token
      );

      console.log(roles[0]);

      if (roles[0] === "administrator") {
        console.log(roles[0]);

        return {
          redirect: {
            destination: "/admin/dashboard",
            permanent: false,
          },
        };
      }

      if (roles[0] === "client") {
        console.log(roles[0]);

        return {
          redirect: {
            destination: "/client/home",
            permanent: false,
          },
        };
      }

      if (roles[0] === "nutritionist") {
        console.log(roles[0]);
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
