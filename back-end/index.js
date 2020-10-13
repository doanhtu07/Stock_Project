/**
 * Table of content of this file:
 * - 1st part: set up passport
 * - 2nd part: important intervals
 * - 3rd part: APIs for Passport
 * - 4th part: verification APIs
 * - 5th part: other APIs
 * - 6th part: socket
 */

try {
  require("./config/config");
} catch (err) {
  console.log("No config found. Using default ENV.");
}

const {
  oneSecond,
  oneDay,
  oneMinute
} = require("./utils/low-dependency/DayTimeUtil");

const {
  deleteExpiredVerification,
  checkAndUpdateAllUsers,
  updateRankingList
} = require("./utils/top-layer/UserUtil");

const {
  checkMarketClosed
} = require("./utils/top-layer/MainBackendIndexHelperUtil");

const { deletePrismaMarketHolidays } = require("./utils/MarketHolidaysUtil");

const {
  updateMarketHolidaysFromFMP
} = require("./utils/FinancialModelingPrepUtil");

/*
  const {
    updateCachedExchangeHistoricalChartWholeList,
    updateCachedExchangeHistoricalChartOneItem,
    resetAllExchangesHistoricalChart
  } = require("./utils/redis-utils/ExchangeHistoricalChart");
*/

/*
  const {
    updateCachedShareQuotesUsingCache,
    updateCachedShareProfilesUsingCache
  } = require("./utils/redis-utils/SharesInfoBank");
*/

const { startSocketIO } = require("./socketIO");

const { PORT: port, NODE_ENV, FRONTEND_HOST, SENDGRID_API_KEY } = process.env;
const express = require("express");
const app = express();
const { pick } = require("lodash");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);

const http = require("http");
const server = http.createServer(app);

const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const { setupPassport } = require("./passport");
const session = require("express-session");

/* cors: for example, if front-end sends request to back-end,
 * then front-end is cors (cross-origin requests),
 * and back-end is a cors receiver.
 * A cors reciever can choose to respond to specific cors,
 * and leave out the rest.
 * However, if the back-end initiate a request to another server,
 * e.g. Facebook server, then the back-end is a cors,
 * and Facebook is a cors receiver.
 * If Facebook respond anything back to back-end, then this
 * response is NOT a cors, and back-end accepts this response
 * without being regulated by this corsOptions.
 */

const whitelist = [FRONTEND_HOST];
const corsOptions = {
  origin: function (origin, callback) {
    if (NODE_ENV === "development") {
      callback(null, true);
    } else {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  session({
    secret: "stock-project",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

setupPassport(passport);

/**
 * globalBackendVariables allow us to change variables inside the object by using
 * functions and passing in object as parameter
 */
var globalBackendVariables = {
  isMarketClosed: false,
  hasUpdatedAllUsersToday: false,
  isPrismaMarketHolidaysInitialized: false,
  hasReplacedAllExchangesHistoricalChart: false,

  updatedAllUsersFlag: false, // value true or false does not mean anything. This is just a flag
  updatedRankingListFlag: false // value true or false does not mean anything. This is just a flag
};

// This function helps initialize prisma market holidays at first run
updateMarketHolidaysFromFMP(globalBackendVariables);

// This function helps initialize exchange NYSE historical chart 5min at first run
// updateCachedExchangeHistoricalChartWholeList("NYSE", "5min");
// updateCachedExchangeHistoricalChartWholeList("NYSE", "full");
globalBackendVariables.hasReplacedAllExchangesHistoricalChart = true;

updateRankingList(globalBackendVariables);

const setupBackendIntervals = () => {
  // Check Market Closed
  setInterval(() => checkMarketClosed(globalBackendVariables), oneSecond);

  setInterval(deleteExpiredVerification, oneDay);

  // Update Market Holidays and Delete Market Holidays in Database that belong to last year (no longer needed)
  setInterval(
    () => updateMarketHolidaysFromFMP(globalBackendVariables),
    oneDay
  );
  setInterval(deletePrismaMarketHolidays, oneDay);

  // setInterval(
  //   () => resetAllExchangesHistoricalChart(globalBackendVariables),
  //   oneSecond
  // );
  // setInterval(() => {
  //   if (
  //     globalBackendVariables.isPrismaMarketHolidaysInitialized &&
  //     !globalBackendVariables.isMarketClosed
  //   ) {
  //     updateCachedExchangeHistoricalChartOneItem("NYSE", "5min").catch((err) =>
  //       console.log(err)
  //     );
  //   }
  // }, 5 * oneMinute);
  // setInterval(() => {
  //   if (
  //     globalBackendVariables.isPrismaMarketHolidaysInitialized &&
  //     !globalBackendVariables.isMarketClosed
  //   ) {
  //     updateCachedExchangeHistoricalChartOneItem("NYSE", "full").catch((err) =>
  //       console.log(err)
  //     );
  //   }
  // }, oneDay);

  /*
    // Update Cached Shares

    setInterval(() => {
      if(
        globalBackendVariables.isPrismaMarketHolidaysInitialized && 
        !globalBackendVariables.isMarketClosed
      ) {
        updateCachedShareQuotesUsingCache()
        .catch(err => console.log(err));
      }
    }, 2 * oneSecond);

    setInterval(() => {
      if(
        globalBackendVariables.isPrismaMarketHolidaysInitialized && 
        !globalBackendVariables.isMarketClosed
      ) {
        updateCachedShareProfilesUsingCache()
        .catch(err => console.log(err));
      }
    }, oneMinute);
  */

  // Update all users portfolioLastClosure
  setInterval(() => checkAndUpdateAllUsers(globalBackendVariables), oneSecond);

  // All Users Ranking List
  setInterval(() => updateRankingList(globalBackendVariables), 10 * oneMinute);
};

setupBackendIntervals();

// All app routes are written below this comment:

// APIs for Passport are listed below:

app.use("/auth", require("./routes/auth"));

app.use("/user", (req, res) => {
  res.send(req.user);
});

app.get("/logout", (req, res) => {
  req.logout();
  res.send("Successful");
});

// verification APIs are listed below:

// other APIs
app.use("/userData", require("./routes/user"));
app.use("/marketHolidaysData", require("./routes/marketHolidays"));
app.use("/shareData", require("./routes/share"));
app.use("/redis", require("./routes/redis"));
app.use("/verificationSession", require("./routes/verification"));

app.use("/getGlobalBackendVariablesFlags", (_, res) => {
  const flags = ["updatedAllUsersFlag", "updatedRankingListFlag"];
  const flagsResult = pick(globalBackendVariables, flags);
  res.send(flagsResult);
});

// set up socket.io server

// user id <-> hasSetupCache
startSocketIO(server, globalBackendVariables);

// back-end server listen
server.listen(port, () => {
  console.log(`server is listening on port ${port}\n`);
});
