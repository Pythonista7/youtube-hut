// Code generated by wunderctl. DO NOT EDIT.

import type {
	GetChatsByIdResponse,
	GetChatsByIdInput,
	GetChatsByIdResponseData,
	GetRandomNameResponse,
	GetRandomNameResponseData,
	HelloResponse,
	HelloResponseData,
	JokeResponse,
	JokeInput,
	JokeResponseData,
	SendChatMsgResponse,
	SendChatMsgInput,
	SendChatMsgResponseData,
} from "./models";
import { createContext } from "react";
import { hooks, WunderGraphContextProperties } from "@wundergraph/nextjs";
import { QueryArgsWithInput, SubscriptionArgs, SubscriptionArgsWithInput } from "@wundergraph/sdk/client";
export type Role = "admin" | "user";

const defaultWunderGraphContextProperties: WunderGraphContextProperties<Role> = {
	ssrCache: {},
	client: null,
	clientConfig: {
		applicationHash: "04660bad",
		applicationPath: "app/main",
		baseURL: "http://localhost:9991",
		sdkVersion: "0.100.0",
		authenticationEnabled: false,
	},
	user: null,
	setUser: (value) => {},
	isWindowFocused: "pristine",
	setIsWindowFocused: (value) => {},
	refetchMountedOperations: 0,
	setRefetchMountedOperations: (value) => {},
};

export const WunderGraphContext = createContext<WunderGraphContextProperties<Role>>(
	defaultWunderGraphContextProperties
);

export const withWunderGraph = hooks.withWunderGraphContextWrapper(
	WunderGraphContext,
	defaultWunderGraphContextProperties
);

export const useWunderGraph = hooks.useWunderGraph<Role, "">(WunderGraphContext);

export const useQuery = {
	GetChatsById: (args: QueryArgsWithInput<GetChatsByIdInput>) =>
		hooks.useQueryWithInput<GetChatsByIdInput, GetChatsByIdResponseData, Role>(WunderGraphContext, {
			operationName: "GetChatsById",
			requiresAuthentication: false,
		})(args),
	Joke: (args: QueryArgsWithInput<JokeInput>) =>
		hooks.useQueryWithInput<JokeInput, JokeResponseData, Role>(WunderGraphContext, {
			operationName: "Joke",
			requiresAuthentication: false,
		})(args),
	GetRandomName: hooks.useQueryWithoutInput<GetRandomNameResponseData, Role>(WunderGraphContext, {
		operationName: "GetRandomName",
		requiresAuthentication: false,
	}),
	Hello: hooks.useQueryWithoutInput<HelloResponseData, Role>(WunderGraphContext, {
		operationName: "Hello",
		requiresAuthentication: false,
	}),
};

export const useMutation = {
	SendChatMsg: () =>
		hooks.useMutationWithInput<SendChatMsgInput, SendChatMsgResponseData, Role>(WunderGraphContext, {
			operationName: "SendChatMsg",
			requiresAuthentication: false,
		}),
};

export const useSubscription = {};

export const useLiveQuery = {
	GetChatsById: (args: SubscriptionArgsWithInput<GetChatsByIdInput>) =>
		hooks.useSubscriptionWithInput<GetChatsByIdInput, GetChatsByIdResponseData, Role>(WunderGraphContext, {
			operationName: "GetChatsById",
			requiresAuthentication: false,
			isLiveQuery: true,
		})(args),
	Joke: (args: SubscriptionArgsWithInput<JokeInput>) =>
		hooks.useSubscriptionWithInput<JokeInput, JokeResponseData, Role>(WunderGraphContext, {
			operationName: "Joke",
			requiresAuthentication: false,
			isLiveQuery: true,
		})(args),
	GetRandomName: (args?: SubscriptionArgs) =>
		hooks.useSubscriptionWithoutInput<GetRandomNameResponseData, Role>(WunderGraphContext, {
			operationName: "GetRandomName",
			requiresAuthentication: false,
			isLiveQuery: true,
		})(args),
	Hello: (args?: SubscriptionArgs) =>
		hooks.useSubscriptionWithoutInput<HelloResponseData, Role>(WunderGraphContext, {
			operationName: "Hello",
			requiresAuthentication: false,
			isLiveQuery: true,
		})(args),
};
