import { QueryClient } from "@tanstack/react-query";

export interface User {
  id: string;
  username: string;
}

const mockUser: User = {
  id: "1",
  username: "testuser",
};

export const mockLogin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  if (username === "testuser" && password === "password") {
    return mockUser;
  }
  throw new Error("Invalid credentials");
};

export const mockLogout = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
};

export const mockAuthQueryKeys = {
  user: ["user"] as const,
};

export const addMockAuthToQueryClient = (queryClient: QueryClient) => {
  queryClient.setQueryData(mockAuthQueryKeys.user, mockUser);
};
