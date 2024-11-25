import express from "express";
import bodyParser from "body-parser";
import { logger } from "./middleware/logger";
import notificationRoutes from "./routes/NotificationRoutes";
import activityRoutes from "./routes/ActivityRoutes";
import cors from "cors";

const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use("/notifications", notificationRoutes);
app.use("/activities", activityRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Homepage for Doorsense api!");
});

app.get("/biancafarm", (req, res) => {
    res.set("Content-Type", "text/html");
    res.send(
        Buffer.from(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>Bianca's Farm</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        text-align: center;
                        margin: 20px;
                    }
                    .animal {
                        margin: 10px;
                        padding: 10px;
                        cursor: pointer;
                        background-color: #f0f8ff;
                        display: inline-block;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        transition: background-color 0.3s;
                    }
                    #output {
                        margin-top: 20px;
                        font-size: 1.5em;
                        font-weight: bold;
                        color: #555;
                    }
                </style>
            </head>
            <body>
                <h1>My my, u just discovered bianca's secret farm</h1>
                <div class="animal" onclick="showSound('Moo!')">Cow</div>
                <div class="animal" onclick="showSound('Cluck!')">Chicken</div>
                <div class="animal" onclick="showSound('Quack!')">Duck</div>
                <div class="animal" onclick="showSound('Meow!')">Cat</div>
                <div class="animal" onclick="showSound('Woof!')">Dog</div>
                <div class="animal" onclick="showSound('Baa!')">Sheep</div>
                <div class="animal" onclick="showSound('Neigh!')">Horse</div>
                <div class="animal" onclick="showSound('Bai Bai!')">Bianca</div>
                <div class="animal" onclick="showSound('Ouch!')">Evan when smacked by Bianca on Monday</div>
    
                <div id="output"></div>
    
                <script>
                    function showSound(sound) {
                        const outputDiv = document.getElementById('output');
                        outputDiv.textContent = sound;
                    }
                </script>
            </body>
            </html>
        `)
    );
});
export default app;
