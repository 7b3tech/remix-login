import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react";

type Post = {
	slug: string;
	title: string;
}

type LoaderData = {
	posts: Post[];
}

export const loader = async () => {
	return json<LoaderData>({
		posts: [
			{
				slug: "my-first-post",
				title: "My First Post",
			},
			{
				slug: "90s-mixtape",
				title: "A Mixtape I Made just For You",
			}
		]
	})

}

export default function Posts() {
	const { posts } = useLoaderData() as LoaderData;
	return (
		<main>
			<ul>
				{
					posts.map((post) => (
						<li key={post.slug}>
							<Link to={post.slug}>
								{post.title}
							</Link>
						</li>
					))
				}
			</ul>
		</main>

	)
}