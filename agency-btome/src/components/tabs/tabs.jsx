import Tab from 'react-bootstrap/Tab';
import jwt_decode from "jwt-decode";
import Tabs from 'react-bootstrap/Tabs';
import AllOrders from '../admin/allOrders/allOrders';
import AllUsers from '../admin/allUsers/allUsers';
import UserOrders from '../user/userOrders/userOrders';
import UserReviews from '../user/userReviews/userReviews';

function TabsProfileInfo() {

    // const userRole = localStorage.getItem("SAVEUSERROLE")
    console.log(userRole)
    let jwt = localStorage.getItem('SAVEJWT');
  let decoded = jwt_decode(jwt)
  let userRole = decoded.roleIdRole

    if (userRole === 2 || userRole === "2" || userRole === "undefined") {
        return <div className="myAccountDesign">
            <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
            >
                <Tab eventKey="My Orders" title="My Orders">
                    <UserOrders />
                </Tab>
                <Tab eventKey="My Reviews" title="My Reviews">
                    <UserReviews />
                </Tab>
            </Tabs>
        </div>
    }
    else if (userRole === "1" || userRole === 1) {
        return <div className="myAccountDesign">
            <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
            >
                <Tab eventKey="all Users" title="all Users">
                    <AllUsers/>
                </Tab>
                <Tab eventKey="all Orders" title="all Orders">
                    <AllOrders/>
                </Tab>
            </Tabs>
        </div>
    }
}

export default TabsProfileInfo;


