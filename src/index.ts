import express, {Application, Request, Response, NextFunction} from "express";
//import cors from "cors";

const PORT = process.env.PORT || 5000;

const app :Application = express();

app.get('/', (req:Request, res:Response, next:NextFunction) => {
    res.send('Wurks');
});


app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));