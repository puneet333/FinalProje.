import { app } from './app';
import mongoose from 'mongoose';

// DB connections....
mongoose.connect(process.env.DB as string)
.then(() => {
    console.log('Connected to the DB');
}).catch((err) => {
    console.log(err);
})

app.listen(8080, () => {
    console.log('server is listening on port 8080....');
    
})