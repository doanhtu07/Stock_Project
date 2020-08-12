const { isEqual } = require("lodash");
const {
  isMarketClosedCheck,
  newDate,
  getFullDateUTCString
} = require("./DayTimeUtil");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { setAsync } = require("../redis/redis-client");

const deleteExpiredVerification = () => {
  let date = new Date();
  date = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  prisma.userVerification
    .deleteMany({
      where: {
        expiredAt: date
      }
    })
    .then((res) => {
      console.log("Deleted", res, "email verifications");
    })
    .catch((err) => {
      console.log(err);
    });
};

const createAccountSummaryChartTimestampIfNecessary = (user) => {
  return new Promise((resolve, reject) => {
    prisma.accountSummaryTimestamp
      .findOne({
        where: {
          UTCDateKey_userID: {
            UTCDateKey: getFullDateUTCString(newDate()),
            userID: user.id
          }
        }
      })
      .then((timestamp) => {
        if (!timestamp) {
          return prisma.accountSummaryTimestamp.create({
            data: {
              UTCDateString: newDate(),
              UTCDateKey: getFullDateUTCString(newDate()),
              portfolioValue: user.totalPortfolio,
              user: {
                connect: {
                  id: user.id
                }
              }
            }
          });
        }
      })
      .then(() => {
        console.log("Finished finding and creating timestamp");
        resolve("Finished finding and creating timestamp");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const updateRankingList = () => {
  prisma.user
    .findMany({
      where: {
        hasFinishedSettingUp: true
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        totalPortfolio: true,
        region: true
      },
      orderBy: {
        totalPortfolio: "desc"
      }
    })
    .then((usersArray) => {
      console.log(`Updating ${usersArray.length} user(s): ranking`);

      const updateAllUsersRanking = usersArray.map((user, index) => {
        const updateRankingAndPortfolioLastClosure = prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            ranking: index + 1
          }
        });

        const key = index + 1;
        const value = `${user.firstName}&${user.lastName}&${user.totalPortfolio}&${user.region}`;
        const redisUpdateRankingList = setAsync(
          `RANKING${key.toString()}`,
          value
        );

        return Promise.all([
          updateRankingAndPortfolioLastClosure,
          redisUpdateRankingList
        ]);
      });

      return Promise.all(updateAllUsersRanking);
    })
    .then(() => {
      console.log("Successfully updated ranking for all users");
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateAllUsers = () => {
  // update portfolioLastClosure and ranking for all users

  prisma.user
    .findMany({
      where: {
        hasFinishedSettingUp: true
      },
      select: {
        id: true,
        totalPortfolio: true
      },
      orderBy: {
        totalPortfolio: "desc"
      }
    })
    .then((usersArray) => {
      console.log(
        `Updating ${usersArray.length} user(s): portfolioLastClosure`
      );

      const updateAllUsersPromise = usersArray.map((user, index) => {
        const updateRankingAndPortfolioLastClosure = prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            totalPortfolioLastClosure: user.totalPortfolio
          }
        });
        const accountSummaryPromise = createAccountSummaryChartTimestampIfNecessary(
          user
        );

        return Promise.all([
          updateRankingAndPortfolioLastClosure,
          accountSummaryPromise
        ]);
      });
      return Promise.all(updateAllUsersPromise);
    })
    .then(() => {
      console.log("Successfully updated all users");
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * objVariables: object passed in from back-end/index
 */
const checkAndUpdateAllUsers = (objVariables) => {
  // console.log(objVariables);

  if (!objVariables.isPrismaMarketHolidaysInitialized) {
    console.log("UserUtil, 68");
    return;
  }

  isMarketClosedCheck()
    .then((checkResult) => {
      // check if market is closed and update the status of objVariables
      if (!isEqual(checkResult, objVariables.isMarketClosed)) {
        console.log(checkResult, "UserUtil, 76");
        objVariables.isMarketClosed = checkResult;
      }

      // if market is closed but flag isAlreadyUpdate is still false
      // -> change it to true AND updatePortfolioLastClosure
      if (
        objVariables.isMarketClosed &&
        !objVariables.isAlreadyUpdateAllUsers
      ) {
        objVariables.isAlreadyUpdateAllUsers = true;
        updateAllUsers();
      }

      // if market is opened but flag isAlreadyUpdate not switch to false yet -> change it to false
      if (
        !objVariables.isMarketClosed &&
        objVariables.isAlreadyUpdateAllUsers
      ) {
        objVariables.isAlreadyUpdateAllUsers = false;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  deleteExpiredVerification,
  createAccountSummaryChartTimestampIfNecessary,
  updateAllUsers,
  checkAndUpdateAllUsers,
  updateRankingList
};
