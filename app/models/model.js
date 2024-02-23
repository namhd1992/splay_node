const sql = require("./db.js");

// constructor
const Game = function(game) {
  this.createOn = game.createOn;
  this.id= game.id;
  this.updateOn = game.updateOn;
  this.name = game.name;

  this.keyName = game.keyName;
  this.defaultImage = game.defaultImage;
  this.bigImage = game.bigImage;
  this.fanpageFB = game.fanpageFB;
  this.groupFB = game.groupFB;
  this.publisher = game.publisher;
  this.status = game.status;
  this.description = game.description;
  this.gameType = game.gameType;
  this.webgameUrl = game.webgameUrl;
  this.scoinGameId = game.scoinGameId;
  this.subTitle = game.subTitle;
  this.downloadTurns = game.downloadTurns;
  this.urlDownloadAndroid = game.urlDownloadAndroid;
  this.urlDownloadIos = game.urlDownloadIos;
  this.urlDownloadPC = game.urlDownloadPC;
  this.screenShot = game.screenShot;
  this.pointReview = game.pointReview;
  this.position = game.position;
  this.createBy = game.createBy;
  this.priorityTag = game.priorityTag;
  this.youtubeChannelId = game.youtubeChannelId;
  this.youtubeDefaultSearch = game.youtubeDefaultSearch;
  this.isGameRanking = game.isGameRanking;
  this.tagsList=tagsList
};


Game.findById = (id, result) => {
  sql.query(`SELECT g.*, g_t.name tagsList FROM game AS g
  JOIN tblSplayGame_Tag  ON g.id=tblSplayGame_Tag.gameId AND g.scoinGameId=${id}
  JOIN tblSplayTag AS g_t on tblSplayGame_Tag.tagId=g_t.id `, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      var tagsList=[]
      for (let i = 0; i < res.length; i++) {
        var ts={
          name:res[i].tagsList
        }
        tagsList.push(ts)
      }
      res[0].tagsList=tagsList;
      var obj={
        data:res[0],
        message:'Successful',
        status:'01',
        totalRecords:res[0].length
      }
      result(null, obj);
      return;
    }

    // not found Game with the id
    result({ kind: "not_found" }, null);
  });
};

Game.getAll = (result) => {
  let query = "SELECT * FROM game WHERE status = 'active'";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("Game: ", res);
    var obj={
      data:res,
      message:'Successful',
      status:'01',
      totalRecords:res.length
    }
    result(null, obj);
  });
};

module.exports = Game;
