from flask import Flask, json, request
from flask_cors import CORS
import re

"""
    Cette classe initialise le serveur et instancie une route avec 3 méthodes différentes, nécessaires aux actions sur les notifications
    /notifications GET => aucune donnée d'entrée dans le body et renvoie la liste des notifications avec un status avec un message
    /notifications POST => Deux champs nécessaires dans le body (title(string), description(string)) au format JSON et renvoie un status avec un message
    /notifications PUT => un champs nécessaire dans le body (id(int)) au format JSON et renvoie un status avec un message
    Vérification des données reçues: test du type ainsi que de la valeur des données
    string testée par une regular expression
    id est testé si la ressource correspondante existe, le cas échéant cela retourne 404 avec un message
"""

class App(Flask):
    __notifications = []
    __endpoints = ['/notifications']

    def __init__(self, name):
        super(App, self).__init__(name)
        self.config['CORS_HEADERS'] = 'Content-Type'
        self.config['DEBUG'] = True
        CORS(self)
        self.__setRoutes()

    def __setRoutes(self):
        self.add_url_rule(self.__endpoints[0], "getNotif", self.__getNotifications, methods=['GET'])
        self.add_url_rule(self.__endpoints[0], "postNotif", self.__addNotifications, methods=['POST'])
        self.add_url_rule(self.__endpoints[0], "updateNotif", self.__updateNotifications, methods=['PUT'])


    def __getNotifications(self):
        return ({"data": self.__notifications}, 200)

    def __addNotifications(self):

        if request.is_json:
            if self.__testString(request.json.get("title", None)) and self.__testString(request.json.get("description", None)):
                request.json['isRead'] = False
                self.__notifications.append(request.json)
                return ({"message": "Successful adding"}, 201)
        return ({"message": "Bad Request"}, 400)

    def __updateNotifications(self):
        if request.is_json:
            if request.json.get("id", None) is not None and self.__testNumber(request.json.get("id", None)):
                if request.json.get("id", None) < 0 or request.json.get("id", None) >= len(self.__notifications):
                    return ({"message": "notification not available"}, 404)
                self.__notifications[request.json['id']]['isRead'] = True
                return ({"status": 200, "message": "Successful updating"})
        return ({"message": "Bad Request"}, 400)

    def __testNumber(self, number):
        if number is None:
            return False
        elif isinstance(number, (int)):
            return True
        return False

    def __testString(self, sentence):
        if not sentence:
            return False
        elif re.match("(\s*[a-zA-Z0-9çäëïöüÿñõãâêîôûáéíóúýàèìòù]+\s*[:,\.']*\s*)+$", sentence) is not None:
            return True
        return False

app = App(__name__)

if __name__ == "__main__":
    app.run()