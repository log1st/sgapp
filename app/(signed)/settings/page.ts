import { appRedirect } from "@/utils";

export default function Page() {
  appRedirect("/settings/password");

  return null;
}
