import { redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Link } from "react-router-dom";
import { getUserId } from "../utils/session.server"

export async function loader({ request }) {
  const session = await getUserId(request);
  if (!session) {
    return redirect("/login")
  }

  return session;
}

export default function Index() {
  const currentUser = useLoaderData();
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div>
        <h1>
          Hello {currentUser}!
        </h1>
        <Link to="/posts" >
          Posts
        </Link>
      </div>

    </div>
  );
}
