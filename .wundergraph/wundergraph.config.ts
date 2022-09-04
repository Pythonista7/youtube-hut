import {
  Application,
  configureWunderGraphApplication,
  cors,
  authProviders,
  introspect,
  templates,
} from "@wundergraph/sdk";
import { NextJsTemplate } from "@wundergraph/nextjs/dist/template";

import server from "./wundergraph.server";
import operations from "./wundergraph.operations";

// https://www.mongodb.com/docs/atlas/app-services/graphql/authenticate/#api-key
const chat = introspect.graphql({
  apiNamespace: "chat",
  url: "https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/application-1-xpnda/graphql",
  headers: (builder) => builder.addStaticHeader("apiKey", ""),
});

// const spacex = introspect.graphql({
//   apiNamespace: "spacex",
//   url: "https://api.spacex.land/graphql/",
// });

const myApplication = new Application({
  name: "app",
  apis: [chat],
});

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  application: myApplication,
  server,
  operations,

  codeGenerators: [
    {
      templates: [new NextJsTemplate()],
      path: "../components/generated",
    },
  ],

  cors: {
    ...cors.allowAll,
    allowedOrigins:
      process.env.NODE_ENV === "production"
        ? [
            // change this before deploying to production to the actual domain where you're deploying your app
            "http://localhost:3000",
          ]
        : ["http://localhost:3000"],
  },
  // authentication: {
  //   cookieBased: {
  //     providers: [authProviders.demo()],
  //     authorizedRedirectUris: ["http://localhost:3000/authentication"],
  //   },
  // },
  security: {
    enableGraphQLEndpoint: process.env.NODE_ENV !== "production",
  },
});
