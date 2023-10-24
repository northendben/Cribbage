if (process.env.NODE_env !== "production") {
	require("dotenv").config();
}
const dbUrl = process.env.dbUrl;
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
const cors = require('cors')
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const mongoStore = require("connect-mongo");
const { Server } = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8000'
    }
})
const User = require("./models/users");
const Game = require("./models/game")
const Deck = require("./models/deck");
const Player = require("./models/player");
const oneDayInMilis = 1000 * 60 * 60 * 24;
const oneDayInSeconds = 24 * 3600;
const store = mongoStore.create({
	mongoUrl: dbUrl,
	touchAfter: oneDayInSeconds,
	crypto: {
		secret: process.env.sessionSecret
	}
});
const sessionOptions = {
	store: store,
	saveUninitialized: false,
	secret: process.env.sessionSecret,
	resave: false,
	cookie: {
		name: "cribbageSession",
		expires: Date.now() + oneDayInMilis,
		httpOnly: true
	}
};

app.set("views", path.join(__dirname, "views"));
app.use(cors())
app.use(express.static(path.join(__dirname, "/static")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionOptions));
app.set("view engine", "ejs");
mongoose.set("strictQuery", false);
passport.use(User.createStrategy());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

main().catch((err) => console.log(err, "Your connection failed"));
async function main() {
	// await mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp')
	await mongoose.connect(dbUrl);
	console.log("Connected");
}

io.on('connection', (socket) => {
    console.log(socket.id)
    console.log(socket.handshake.auth)
    socket.on('update user', (msg) =>{
        console.log(socket.id)
        console.log(msg, 'Message')
        socket.handshake.auth.username = msg
        console.log(socket.handshake.auth)
    })
    socket.on('update room', (id)=>{
        socket.join(id)
        console.log(socket.rooms, 'rooms')
    })
    socket.on('update game', (gameState)=>{
        socket.to(gameState.id).emit('update game', gameState)
    })
})

app.get("/", async (req, res) => {
	req.session.views ? (req.session.views += 1) : (req.session.views = 1);
	console.log(req.session);
	console.log(req.isAuthenticated());
	res.render("index");
});

app.get("/hello", async (req, res) => {
	console.log("sup");
	res.status(200).send({ msg: "Hello" });
});

app.post("/auth", async (req, res) => {
	if (req.isAuthenticated()) {
		res.status(200).send({ User: req.session.passport.user });
	} else {
		res.status(401).send();
	}
});

app.get("/register", async (req, res) => {
	res.render("reg");
});

app.post("/game/create", async (req, res) => {
    const { user, socket } = req.body
    const foundUser = await User.findOne({'username': user.username})
    const userId = foundUser['_id'].toString()
    const gameID = uuidv4()
    const gameDeck = new Deck.Deck()
    gameDeck.shuffle()
    const player = new Player(user.username, socket, 0, null, userId)
    const gameState ={
        id: gameID,
        deck: gameDeck,
        playerOne: player,
        playerTwo: null,
        currentPlayer: null,
        currentDealer: player,
        crib: null,
        players: [player]
    }
    const newGame = await new Game(gameState)
    await newGame.save()
    res.status(200).send({gameState: gameState})
});
app.post("/register", async (req, res) => {
	console.log(req.body);
	const userInfo = { username: req.body.username, email: req.body.email };
	const newUser = await User.register(userInfo, req.body.password);
	console.log(newUser);
	req.login(newUser, (err) => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).send({ User: newUser.username  });
		}
	});
});

app.post('/game/join', async(req,res)=>{
    const { id, socket, user } = req.body
    const foundUser = await User.findOne({'username': user.username})
    const foundUserId = foundUser['_id'].toString()
    const foundGame = await Game.findOne({"id": id})
    if(foundGame['players'] == 2){
        return res.status(409).send('Full Game')
    } else {
        for(let player of foundGame['players']){
            if(player.dbId == foundUserId){
                const updatedGame = await Game.findOneAndUpdate({"id": id, "players.name": user.username}, {$set: {"players.$.sid": socket}, returnNewDocument: true})
                await updatedGame.save()
                const gameState = JSON.stringify(updatedGame)
                return res.status(200).send({gameState: updatedGame})
            }
        }
        const player = new Player(user.username, socket, 0, null, foundUserId)
        const updatedGame = await Game.findOneAndUpdate({"id": id}, {$set: {'playerTwo': player}, $push: {"players": player}})
        console.log('HEREEEERJEIORJEOIRJIOE')
        await updatedGame.save()
        return res.status(200).send({gameState: updatedGame})
    }
})

app.post(
	"/login",
	passport.authenticate("local", { failWithError: true, session: true }),
	async (req, res) => {
		console.log("logged in");
		res.status(200).send({ User: req.session.passport.user });
	},
	async (err, req, res, next) => {
		res.status(401).send({ msg: "Not authorized" });
	}
);

app.post("/logout", async (req, res) => {
	req.logout((err) => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).send({ msg: "Logged out" });
		}
	});
});

server.listen(5000, () => {
	console.log("listening for requests on port 5000");
});
