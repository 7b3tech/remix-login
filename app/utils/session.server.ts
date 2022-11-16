const usersDB = [
    { id: 1, username: "seven", password: "123" }
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