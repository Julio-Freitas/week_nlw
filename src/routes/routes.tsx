import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { NewRoom } from "../pages/newRoom";
import { Room } from "../pages/room";
import { AdminRoom } from "../pages/adminRoom";
import { NotFound } from "../pages/notFound";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/rooms/new" exact component={NewRoom} />
                <Route path="/rooms/:roomId" exact component={Room} />
                <Route
                    path="/admin/rooms/:roomId"
                    exact
                    component={AdminRoom}
                />
                <Route path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}
