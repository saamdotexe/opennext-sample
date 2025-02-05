import { auth } from "@/utils/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const dynamic = "force-dynamic";
export const { POST, GET } = toNextJsHandler(auth);