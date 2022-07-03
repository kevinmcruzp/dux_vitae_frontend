import { Flex, useToast } from "@chakra-ui/react";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { api } from "../services/apiClient";

type User = {
  name: string;
  lastName: string;
  email: string;
  roles: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user?: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

// let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie({}, "nextauth.token", {
    path: "/",
  });
  destroyCookie({}, "nextauth.refreshToken", {
    path: "/",
  });

  destroyCookie({}, "rut");
  console.log("signed out");

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const toastError = useToast({
		position: 'top',
		status: 'error',
		duration: 3000,
	})
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { name, lastName, email, roles } = response.data;

          setUser({ name, lastName, email, roles });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { rut, name, lastName, token, refreshToken, roles } = response.data;

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, //30 dias
        path: "/",
      });

      setCookie(undefined, "nextauth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, //30 dias
        path: "/",
      });

      setCookie(undefined, "rut", rut, {
        maxAge: 60 * 60 * 24 * 30, //30 dias
        path: "/",
      });

      setUser({
        name,
        lastName,
        email,
        roles,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      roles === "nutritionist" && Router.push("/nutritionist/home");
      roles === "admin" && Router.push("/admin/dashboard");
      roles === "client" && Router.push("/client/home");
    } catch (err) {
      toastError({
        render: () => (
          <Flex backgroundColor='#E01F1F' borderRadius='7px' color='white' py='10px' px='12px' fontSize={13} >
            Usuario con estos datos no existe
          </Flex>
        )
      })
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
