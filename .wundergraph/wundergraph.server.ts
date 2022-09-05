import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { configureWunderGraphServer } from "@wundergraph/sdk";
import type { HooksConfig } from "./generated/wundergraph.hooks";
import type { InternalClient } from "./generated/wundergraph.internal.client";
import { getRandomColor } from "../utils/colors";

export default configureWunderGraphServer<HooksConfig, InternalClient>(() => ({
  hooks: {
    queries: {},
    mutations: {},
    authentication: {
      mutatingPostAuthentication: async ({ user, internalClient, log }) => {
        log.info("Running post auth:" + user);
        const userClaims = {
          name:
            user?.nickName ||
            user?.name ||
            "Anon-" + (Math.random() * 1000).toFixed().toString(),
          verified: user ? true : false,
          color: getRandomColor(),
        };

        const res = await internalClient.mutations.CreateUser({
          input: {
            color: userClaims.color,
            name: userClaims.name,
            verified: userClaims.verified,
          },
        });

        if (res.errors) {
          log.error("FOUND ERROR : " + JSON.stringify(res.errors));
        }

        // localStorage.setItem("user", JSON.stringify(userClaims));
        console.log("Completed post auth :" + userClaims);
        return {
          user: userClaims,
          status: "ok",
        };
      },
    },
  },
  graphqlServers: [
    {
      serverName: "gql",
      apiNamespace: "gql",
      schema: new GraphQLSchema({
        query: new GraphQLObjectType({
          name: "RootQueryType",
          fields: {
            hello: {
              type: GraphQLString,
              resolve() {
                return "world";
              },
            },
          },
        }),
      }),
    },
  ],
}));
