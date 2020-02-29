let waitingList = [
  {
    username: 'Alex',
    provideInfo: true,
    infoProvided: '1_3_2_3',
    requestInfo: true,
    infoRequested: '2_2_3_2'
  },
  {
    username: 'Roger',
    provideInfo: false,
    infoProvided: '0_0_0_0',
    requestInfo: true,
    infoRequested: '1_3_2_0'
  },
  {
    username: 'Emerick',
    provideInfo: true,
    infoProvided: '3_3_5_1',
    requestInfo: false,
    infoRequested: '0_0_0_0'
  },
  {
    username: 'Julia',
    provideInfo: true,
    infoProvided: '1_4_4_2',
    requestInfo: true,
    infoRequested: '2_4_3_2'
  },
]

const getUserInfo = (user) => {
  let provideInfo = false;
  let infoProvided = '0_0_0_0';
  let requestInfo = false;
  let infoRequested = '0_0_0_0';

  if (user.p1 || user.p2 || user.p3 || user.p4) {
    provideInfo = true;
    infoProvided = `${user.p1 ? user.p1 : 0}_${user.p2 ? user.p2 : 0}_${user.p3 ? user.p3 : 0}_${user.p4 ? user.p4 : 0}`;
  }

  if (user.r1 || user.r2 || user.r3 || user.r4) {
    requestInfo = true;
    infoRequested = `${user.r1 ? user.r1 : 0}_${user.r2 ? user.r2 : 0}_${user.r3 ? user.r3 : 0}_${user.r4 ? user.r4 : 0}`;
  }

  return [ provideInfo, infoProvided, requestInfo, infoRequested ];
}

const matchUser = (user) => {

  const [ provideInfo, infoProvided, requestInfo, infoRequested ] = getUserInfo(user);

  let newUser = {
    username: user.username,
    provideInfo,
    infoProvided,
    requestInfo,
    infoRequested
  }

  if (!newUser.requestInfo) {
    // Simple match
    for (let i = 0; i < waitingList.length; i++) {
      let user = waitingList[i];
      if (!user.requestInfo || newUser.infoProvided === user.infoRequested) {
        // match if none of the users have specific requests
        // or if new user's provided info match info requested by waiting user
        waitingList.splice(i, 1);
        return { match: true, matchedUser: user };
      }
    }
  } else {
    // Complex match
    for (let i = 0; i < waitingList.length; i++) {
      let user = waitingList[i];
      if (!user.requestInfo && newUser.infoRequested === user.infoProvided) {
        // Match if new user's requested info match info provided by waiting user
        // in case that the waiting user has no specific requests
        waitingList.splice(i, 1);
        return { match: true, matchedUser: user };
      } else if (user.requestInfo && newUser.infoRequested === user.infoProvided && newUser.infoProvided === user.infoRequested) {
        // Match if new user's requested info match info provided by waiting user
        // but also if the new user's provided info match info requested by waiting user
        waitingList.splice(i, 1);
        return { match: true, matchedUser: user };
      }
    }
  }
  return { match: false };
}


module.exports = {
  waitingList,
  matchUser
}
