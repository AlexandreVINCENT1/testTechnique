import {Component} from "react";
import {withRouter} from 'react-router';
import axios from "axios";
import "./css/Book.css";

/**
 * Ce composant gère la page de création d'une notification
 * Il contient le formulaire pour la création de notification
 * Ce formulaire, une fois complèté, envoie un requête Post au serveur
 * via un appel Axios
 */

class Book extends Component {

    #api = "http://localhost:8080/notifications";
    #header = {
        'Content-Type': 'application/json',
    };

    constructor(props) {
        super(props);
        this.state = {
            what: "train",
            where: "",
        };
        this.submitForm = this.submitForm.bind(this);
        this.changePlace = this.changePlace.bind(this);
        this.changeWhat = this.changeWhat.bind(this);
    }

    async submitForm(e) {
        let title = "Réservation d'un " + this.state.what;
        let description = "Vous venez de réserver un voyage en " + this.state.what + " à destination de : " + this.state.where;
        await axios.post(this.#api, {title: title, description: description}, {headers: this.#header});
        this.setState({where: "", what: "train"});
    }

    changePlace(e) {
        this.setState({
            where: e.target.value
        });
    }

    changeWhat(e) {
        this.setState({
            what: e.target.value
        });
    }

    render() {
        return(
        <div className="Book">
            <div className="Form">
                <div className="bookingForm">
                    <span>Réservation</span>
                    <label className="title">Quoi ?</label>
                    <select onChange={this.changeWhat} value={this.state.what}>
                        <option value="bateau">Bateau</option>
                        <option value="train">Train</option>
                        <option value="avion">Avion</option>
                    </select>
                    <label>Où</label>
                    <input onChange={this.changePlace} value={this.state.where} required></input>
                    <button onClick={this.submitForm}>Réserver</button>
                </div>
            </div>
        </div>)
    }
}

export default withRouter(Book);
