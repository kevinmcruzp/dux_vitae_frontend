import decode from "jwt-decode";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";
import { validateUserPermissions } from "./validateUserPermissions";

type WithSSRAuthOption = {
  roles?: string;
};

export function withSSRAuth<P>(
  fn: GetServerSideProps<P>,
  options: WithSSRAuthOption
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies["nextauth.token"];

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    if (options) {
      const user = decode<{ roles: string }>(token);
      const { roles } = options;

      const userHasValidPermissions = validateUserPermissions({
        user,
        roles,
      });

      if (!userHasValidPermissions) {
        if (user.roles === "admin") {
          return {
            redirect: {
              destination: "/admin/dashboard",
              permanent: false,
            },
          };
        }

        if (user.roles === "client") {
          return {
            redirect: {
              destination: "/client/home",
              permanent: false,
            },
          };
        }

        if (user.roles === "nutritionist") {
          return {
            redirect: {
              destination: "/nutritionist/home",
              permanent: false,
            },
          };
        }
      }
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, "nextauth.token", {
          path: "/",
        });
        destroyCookie(ctx, "nextauth.refreshToken", {
          path: "/",
        });

        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
      throw err;
    }
  };
}
