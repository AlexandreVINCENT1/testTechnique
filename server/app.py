from flask import Flask, json, request
from flask_cors import CORS

"""
    Cette classe initialise le serveur et instancie 3 routes nécessaires aux différentes actions sur les notifications
    /notifications GET => aucune donnée d'entrée dans le body et renvoie la liste des notifications avec un status et un message
    /notifications POST => Deux champs nécessaires dans le body (title, desription) et renvoie un status et un message
    /notifications PUT => un champs nécessaire dans le body (id) et renvoie un status et un message
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
        print("get notifications")
        return ({"status": 200, "data": self.__notifications})

    def __addNotifications(self):
        print("debug call post", request)
        if request.json is not None:
            request.json['isRead'] = False
            self.__notifications.append(request.json)
        return ({"status": 201, "message": "Successful adding"})

    def __updateNotifications(self):
        if request.json is not None:
            if request.json['id'] is not None:
                self.__notifications[request.json['id']]['isRead'] = True
        return ({"status": 200, "message": "Successful updating"})

app = App(__name__)

if __name__ == "__main__":
    app.run()