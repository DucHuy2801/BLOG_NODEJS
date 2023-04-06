const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/F8_EDUCATION_DEVELOPER',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
           // useCreateIndex: true
        });
        console.log('MongoDB is connected...');
    } catch (err) {
        console.error('err.message');
        process.exit(1);
    }
}

module.exports = { connect };