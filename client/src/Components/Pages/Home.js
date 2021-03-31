import {Component} from "react";
import {withRouter} from 'react-router';
import "./css/Home.css";
import Notification from "../Notification/Notification";

/**
 * Ce composant gère la page Home et inclut le tableau 
 * d'affichage des notifications
 */

class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="Home">
                <Notification />
            </div>
        )
    }
}

export default withRouter(Home);