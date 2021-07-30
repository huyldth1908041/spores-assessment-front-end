import Dashboard from "./dashboard";
import useAuthenticate from "../src/hooks/useAuthenticate";

export default function Home() {
    useAuthenticate()
    return (
      <Dashboard/>
    )
}
