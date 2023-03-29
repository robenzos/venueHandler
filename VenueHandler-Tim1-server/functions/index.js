const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const admin = require("firebase-admin");

const serviceAccount =
    require("./venue-handler-firebase-adminsdk-35l0w-fd3a0ea3a9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://venue-handler.firebaseio.com",
});

const db = admin.firestore();

app.get("/getvenue", (_request, response) => {
  const res = [];
  db.collection("venue").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const document = {
        id: doc.id,
        data: doc.data(),
      };
      res.push(document);
    });
    return response.send(res);
  })
      .catch((error) => {
        return response.send("Error getting documents: ", error);
      });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
