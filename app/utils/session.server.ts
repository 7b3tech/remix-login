import { createCookieSessionStorage, redirect } from "@remix-run/node";

const usersDB = [
    { id: "1", username: "seven", password: "123" }
]

type LoginForm = {
    username: string;
    password: string;
}

export async function login({
    username,
    password,
}: LoginForm) {
    const user = usersDB.find(u => username);
    if (!user) return null;

    const isCorrectPassword = user.password === password;
    if (!isCorrectPassword) return null;

    return { id: user.id, username }
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
    cookie: {
        name: "RJ_session",
        secure: process.env.NODE_ENV === "production",
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    }
})

export async function createUserSession(userId: string, redirectTo: string) {
    const session = await storage.getSession();
    session.set("userId", userId);
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await storage.commitSession(session),
        }
    })
}