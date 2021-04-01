import {Component} from "react";
import {withRouter} from 'react-router';
import "./css/404.css";

/**
 * Ce composant gère la page Home et inclut le tableau 
 * d'affichage des notifications
 */

class PageNotFound extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="PageNotFound">
                404 Page Not Found
            </div>
        )
    }
}

export default withRouter(PageNotFound);