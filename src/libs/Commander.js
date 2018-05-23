export default (function () {
  var global = {
    playId: '',
    uid: '',
    nickname: '',
    headimgurl: '',
    doll: {},
    roomId: '',
    token: '',
    role: 'USER',
    websocket: null,
    lastMoved: null,
    listeners: {},
    remainTime: 60,
    Directive: {
      CTL_LEFT_START: "left",
      CTL_LEFT_END: "left_end",
      CTL_RIGHT_START: "right",
      CTL_RIGHT_END: "right_end",
      CTL_FORWARD_START: "up",
      CTL_FORWARD_END: "up_end",
      CTL_BACKWARD_START: "down",
      CTL_BACKWARD_END: "down_end",
      CTL_CATCH: "catch",
      CTL_STOP: "stop"
    },
    MachineState: {
      WAIT: 0,
      PLAY: 1,
      CATCH: 2,
      ERROR: 3
    },
    ErrorCode: {
      WebSocketClose: {"code": 1001, "msg": "websocket close"},
      WebSocketError: {"code": 1002, "msg": "websocket error"},
      StateError: {"code": 2001, "msg": "machine state error"},
      UnInited: {"code": 3001, "msg": "init error"},
      ParamError: {"code": 3002, "msg": "params error"}
    },
    ErrorCommand: {
      RoomOffline: {
        code: 404,
        content: "房间离线"
      },
      RoomFault: {
        code: 500,
        content: "房间故障"
      }
    },
    remainTimeSto: null,
    inited: null,
    pingInterval: null,
  }

  var destroy = function () {
    WSManager.close();
    global.listeners = {};
    global.lastMoved = null;
    global.inited = false;
    clearInterval(global.remainTimeSto);
    clearInterval(global.pingInterval);
  }

  var WSManager = {

    init: function (url) {

      var self = this
      // Create WebSocket connection.
      if (global.websocket && global.websocket.readyState === 1) {
        return
      }

      global.websocket = new WebSocket(url)
      // Connection opened
      global.websocket.addEventListener('open', function (event) {
        // global.websocket.send('Hello Server!')
        var message = {
          command: 'AUTH',
          uid: global.uid,
          token: global.token,
          roomId: global.roomId,
          role: 'USER',
          extra: JSON.stringify({
            nickname: global.nickname,
            headimgurl: global.headimgurl,
            dollName: global.doll.name,
            dollType: global.doll.dollType
          })
        };
        WSManager.sendMessage(message);
        console.log(message);
        global.pingInterval = setInterval(() => {
          WSManager.sendMessage({command: 'PING'})
        }, 3000);
      });
      // Listen for messages
      global.websocket.addEventListener('message', function (event) {
        // console.debug('Message from server', event.data)
        var json = JSON.parse(event.data)
        self.onMessage(json)
      })

      global.websocket.addEventListener('close', function (event) {
        if (global.listeners.OnClose) {
          global.listeners.OnClose(global.ErrorCode.WebSocketClose, event)
        }
      })
      global.websocket.addEventListener('error', function (event) {
        if (global.listeners.OnError) {
          global.listeners.OnError(global.ErrorCode.WebSocketError, event)
        }
        console.error('88888888888888 websocket错误' + event)
      })


    },

    sendMessage: function (data) {
      var self = this
      if (!global.websocket) {
        return
      }
      if (global.websocket && global.websocket.readyState === 1) {
        // console.debug('wsSendMessage', data)
        global.websocket.send(JSON.stringify(data))
      } else {
        //断开连接的异常处理
        console.error('wsSendMessage', 'websocket状态异常')
      }
    },

    onMessage: function (data) {
      var self = this
      // console.debug('onMessage', data);
      global.listeners.handleStatusChange(data.command, data.extra)
    },

    close: function () {
      if (global.websocket) {
        global.websocket.close()
        global.websocket = null
      }
    }
  }

  function handleStateChange(data) {
    switch (data.data) {
      case "PLAY":
        clearInterval(global.remainTimeSto);
        // global.remainTime = 60
        global.remainTimeSto = setInterval(function () {
          global.remainTime--
          if (global.remainTime < 0) {
            global.remainTime = 0
          }
          global.listeners.OnTime(global.remainTime)
        }, 1000)
      case "WAIT":
      case "CATCH":
        if (global.listeners.OnState) {
          global.listeners.OnState(global.MachineState[data.data])
        }
        break;
      case "ERROR":
        if (global.listeners.OnState) {
          global.listeners.OnState(global.MachineState[data.data])
        }
        if (global.listeners.OnError) {
          global.listeners.OnError(global.ErrorCode.StateError)
        }
        break;
    }
  }

  function checkInit(callback) {
    if (global.inited) {
      callback();
    } else {
      if (global.listeners.OnError) {
        var error = {
          code: global.ErrorCode.UnInited.code,
          msg: global.ErrorCode.UnInited.msg,
          extra: '尚未初始化'
        }
        global.listeners.OnError(error)
      }
    }
  }

  function init(listeners, userInfo,  roomId, url, doll) {
    destroy();
    global.uid = userInfo.userId;
    global.token = userInfo.token;
    global.role = userInfo.role;
    global.roomId = roomId;
    global.inited = true;
    global.listeners = listeners;
    global.nickname = userInfo.nickname;
    global.headimgurl = userInfo.headimgurl;
    global.doll = doll;
    WSManager.init(url);
  }

  function startGame() {
    checkInit(function () {
      WSManager.sendMessage({command: 'USER_START'})
    })
  }


  function quitGame() {
    checkInit(function () {
      WSManager.sendMessage({command: 'USER_QUIT'});
    })
  }

  function controlClaw(cmd) {
    checkInit(function () {
      WSManager.sendMessage({command: cmd})
    })
  }

  function up() {
    controlClaw("USER_UP")
  }

  function down() {
    controlClaw("USER_DOWN")
  }

  function left() {
    controlClaw("USER_LEFT")
  }

  function right() {
    controlClaw("USER_RIGHT")
  }

  function grab() {
    controlClaw("USER_GRAB")
  }

  function continueGame() {
    controlClaw("USER_CONTINUE")
  }

  function queue() {
    controlClaw("USER_QUEUE");
  }

  function queueStart() {
    controlClaw("USER_QUEUE_START");
  }

  function queueCancel() {
    controlClaw("USER_QUEUE_CANCEL");
  }

  function ping() {
    controlClaw("PING");
  }


  return {
    init: init,
    startGame: startGame,
    quitGame: quitGame,
    destroy: destroy,
    up: up,
    down: down,
    left: left,
    right: right,
    grab: grab,
    continueGame: continueGame,
    queue: queue,
    queueStart: queueStart,
    queueCancel: queueCancel,
    ping: ping,
    Directive: global.Directive,
    ErrorCode: global.ErrorCode,
    MachineState: global.MachineState,
    logOn: true,
    ErrorCommand: global.ErrorCommand
  }
})()
