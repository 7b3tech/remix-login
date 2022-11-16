import { ActionFunction } from "@remix-run/node"
import { useActionData } from "@remix-run/react";
import { login } from "~/utils/session.server"

type ActionData = {
    fields?: {
        username: string;
        password: string;
    };
};

export const action: ActionFunction = async ({ request, }) => {
    const form = await request.formData();
    const username = form.get("username");
    const password = form.get("password");

    if (

        typeof username !== "string" ||
        typeof password !== "string"

    ) {
        return false;
    };

    const user = await login({ username, password });
    console.log({ user });
    if (!user) {
        return { ok: false }
    }
    return true;
}

export default function Login() {
    const actionData = useActionData<ActionData>()
    return (
        <div className="bg-slate-400 min-h-screen flex justify-center items-center">
            <div className="mx-auto w-max bg-slate-300 p-4 rounded-xl">
                <h1 className="text-center mb-4">Login</h1>
                <form method="post">
                    <div className="p-4">
                        <div className="flex justify-between  mb-2 ">
                            <label className="mr-4" htmlFor="username">Username</label>
                            <input className="rounded-md" type="text" name="username" id="username" defaultValue={actionData?.fields?.username} />
                        </div>
                        <div className="flex justify-between ">
                            <label htmlFor="password">Password</label>
                            <input className="rounded-md" type="password" name="password" id="password" defaultValue={actionData?.fields?.password} />
                        </div>
                        <div>
                            <button type="submit" className="bg-green-100 min-w-full rounded-md mt-4 py-1">Send
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}