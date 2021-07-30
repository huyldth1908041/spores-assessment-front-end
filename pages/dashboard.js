import DashBoardView from "../src/views/DashBoardView";
import useAuthenticate from "../src/hooks/useAuthenticate";

const Dashboard = () => {
    useAuthenticate()
    return <DashBoardView/>
}
export default Dashboard