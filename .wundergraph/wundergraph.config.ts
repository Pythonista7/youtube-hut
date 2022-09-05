import {
  Application,
  configureWunderGraphApplication,
  cors,
  authProviders,
  introspect,
  templates,
  EnvironmentVariable,
} from "@wundergraph/sdk";
import { NextJsTemplate } from "@wundergraph/nextjs/dist/template";

import server from "./wundergraph.server";
import operations from "./wundergraph.operations";

// https://www.mongodb.com/docs/atlas/app-services/graphql/authenticate/#api-key
const chat = introspect.graphql({
  apiNamespace: "chat",
  url: "https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/application-1-xpnda/graphql",
  headers: (builder) =>
    builder.addStaticHeader("apiKey", process.env.MONGODB_APIKEY || ""),
});

// https://randomuser.me
const random = introspect.openApi({
  apiNamespace: "random",
  source: {
    kind: "file",
    filePath: "randommer.json",
  },
});

const chuck = introspect.openApi({
  apiNamespace: "chuck",
  source: {
    kind: "file",
    filePath: "chuck-norris.json",
  },
});

const myApplication = new Application({
  name: "app",
  apis: [chat, random, chuck],
});

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  application: myApplication,
  server,
  operations,

  codeGenerators: [
    {
      templates: [
        ...templates.typescript.all,
        templates.typescript.operations,
        templates.typescript.linkBuilder,
      ],
    },
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
  authentication: {
    cookieBased: {
      providers: [
        // authProviders.google({
        //   clientId: process.env.GOOGLE_CLIENT_ID || "", // new EnvironmentVariable("GOOGLE_CLIENT_ID", ""),
        //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "", // new EnvironmentVariable("GOOGLE_CLIENT_SECRET", ""),
        //   id: "google",
        // }),
        authProviders.github({
          clientId: process.env.GITHUB_CLIENT_ID || "",
          clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
          id: "github",
        }),
      ],
      authorizedRedirectUris: ["http://localhost:3000"],
    },
  },
  security: {
    enableGraphQLEndpoint: process.env.NODE_ENV !== "production",
  },
});
