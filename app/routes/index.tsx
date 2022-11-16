import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div>
      <h1 >
        Hello world!
      </h1>
      <Link to="/posts" >
        Posts
      </Link>
    </div>
  );
}
