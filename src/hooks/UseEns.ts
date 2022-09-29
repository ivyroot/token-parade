// by @frolic imported from web3 scaffold: https://github.com/holic/web3-scaffold

import { useEffect } from "react";
import createStore from "zustand";
import { persist } from "zustand/middleware";

import { CachedFetch } from "@/hooks/CachedFetch";

type State = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolvedAddresses: Partial<Record<string, any>>;
};

export const useStore = createStore<State>(
  persist(() => ({ resolvedAddresses: {} }), { name: "resolved-ens" })
);

export const UseENS = (address: string) => {
  const addressLowercase = address ? address.toLowerCase() : null;
  const resolvedState = useStore(
    (state) => state.resolvedAddresses[addressLowercase]
  );
  const resolved = addressLowercase ? resolvedState : null;

  useEffect(() => {
    (async () => {
      try {
        if (addressLowercase) {
            const data = await CachedFetch(
            `https://api.ensideas.com/ens/resolve/${addressLowercase}`
            ).then((res) => res.json());
            useStore.setState((state) => ({
            resolvedAddresses: {
                ...state.resolvedAddresses,
                [addressLowercase]: data,
            },
            }));
        }
      } catch (error) {
        console.log("could not resolve ens", error);
      }
    })();
  }, [addressLowercase]);

  return {
    address: resolved?.address,
    name: resolved?.name,
    displayName: resolved?.displayName,
    avatar: resolved?.avatar,
  };
};
