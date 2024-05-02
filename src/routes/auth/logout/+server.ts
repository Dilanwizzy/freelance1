import type { RequestHandler } from "./$types";
import { authCookieNames, createHeadersFromTokens } from "$lib/utils/supertokens/cookieHelpers";
import { AxiosError } from "axios";

export const GET = (async ({ cookies, locals }) => {
  cookies.delete(authCookieNames.access, {path: '/'});
  cookies.delete(authCookieNames.csrf, {path: '/'});
  cookies.delete(authCookieNames.front, {path: '/'});

  try {
    await locals.api.authApi.revokeSession();
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status == 401) {
      console.log('Session has already expired')
    } else {
      throw error;
    }
  }

  const headers = createHeadersFromTokens({});
  headers.set("Location", '/');
  return new Response(null, { status: 303, statusText: "OK", headers });
}) satisfies RequestHandler;
