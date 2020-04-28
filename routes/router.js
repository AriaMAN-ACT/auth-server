const userRouter = require('./userRouter');

module.exports = app => {
    app.use('/api/v1/users', userRouter);
};