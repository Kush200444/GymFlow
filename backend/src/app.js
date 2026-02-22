require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const {connectDB} = require("./config/database");
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const gymRouter = require("./routes/gyms");

app.use("/",authRouter);
app.use("/",userRouter);
app.use("/",gymRouter);

// simple health check
app.get('/ping', (req, res) => res.send('pong'));

// debug: list registered routes
app.get('/__routes', (req, res) => {
    const routes = [];
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            // direct route
            const methods = Object.keys(middleware.route.methods).join(',');
            routes.push({ path: middleware.route.path, methods });
        } else if (middleware.name === 'router' && middleware.handle && middleware.handle.stack) {
            // router middleware
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    const methods = Object.keys(handler.route.methods).join(',');
                    routes.push({ path: handler.route.path, methods });
                }
            });
        }
    });
    res.json(routes);
});

connectDB().then(()=>{
    console.log("Database connected Successfully");
    app.listen(7777,()=>{
        console.log("Server running Successfully ");
    })}).catch((err)=>{
        console.error(err.message);
    });