const { waitingList, matchUser } = require('./users');

// const sendUsernames = (socket) => {
//   let waitingListUsernames = waitingList.map(user => user.username);
//   socket.emit('get user list', waitingListUsernames);
// }

const createSocketServer = (server) => {
  let io = require('socket.io')(server);

  io.on('connection', (socket) => {
    console.log('A new user connected:', socket.id);

    socket.emit('get user list', waitingList);

    socket.on('add user', (user) => {
      // console.log(JSON.stringify(user, null, 4));
      const { match, matchedUser } = matchUser(user);
      if (!match) {
        console.log("No match");
        waitingList.push(user);
        io.emit('update user list', user);
      } else {
        console.log("Match");
        io.emit('get user list', waitingList);
        io.emit('proceed match', { user, matchedUser });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

module.exports = {
  createSocketServer
}
