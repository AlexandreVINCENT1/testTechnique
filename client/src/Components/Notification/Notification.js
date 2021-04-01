import {Component} from "react";
import "./Notification.css";
import axios from "axios";


/**
 * Ce composant représente les lignes du tableau de notifications
 * Les notifications lu/ non lu sont différenciées par leur couleur
 * gris foncé = non lu
 * gris clair = lu
 * Cliqué sur une notification la passe de non lu à lu et
 * met à jour via un appel Axios cette notification à sur le serveur flask
 */

class Line extends Component {
    
    #api = "http://localhost:8080/notifications";
    #header = { 'Content-Type': 'application/json' };

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            style: {...this.props.style},
            read: props.isRead,
        };
        this.isRead = this.isRead.bind(this);
    }

    componentDidMount() {
        if (this.state.read === true)
            this.setState({style: {...{background: "#a4b0be"}}});
    }

    async isRead(e) {
        try {
            const style = {background: "#a4b0be"};
            this.setState({
                read: true,
                style: {...style},
            });
            const id = this
            await axios.put(this.#api, { headers: this.#header, id: this.props.id});
        } catch (err) {
            console.error("Error during server's call");
        }
    }

    render() {
        return (
            <div key={this.props.id} onClick={this.isRead} className="line" style={this.state.style}>
                <span className="title">{this.props.title}</span>
                <span className="content">{this.props.description}</span>
            </div>
        )
    }
}

/**
 * Ce composant gère le tableau de notifications
 * Les notifications sont chargées via un appel Axios
 * toutes les 5 secondes au serveur Flask
 */

export default class Notification extends Component {

    #api = "http://localhost:8080/notifications";
    #child = [];
    header = { 'Content-Type': 'application/json' }

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            notification: [],
        }
        this.loadNotifications = this.loadNotifications.bind(this);
    }

    componentDidMount() {
        this.loadNotifications();
        this.interval = setInterval(this.loadNotifications, 30000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async loadNotifications() {
        try {
            const res = (await axios.get(this.#api)).data;
            if (this.#child.length > res.data.length)
                await this.#child.splice(0, this.#child.length);
            await res.data.map((el, i) => {
                if (i >= this.#child.length)
                this.#child.unshift((<Line key={i} id={i} isRead={el.isRead} title={el.title} description={el.description} />));
            });
            this.setState({notification: this.#child});
        } catch (e) {
            console.error("Error during server's call", e);
        }
    }

    render() {
        return(
            <div props={this.props} className="Notification">
                <div className="Title">Notifications</div>
                <div className="Content">{this.state.notification}</div>
            </div>
        )
    }
};