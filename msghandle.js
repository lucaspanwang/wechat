const formatMsg = require('./fmtwxmsg');

function help(){
    //字符串形式返回帮助信息
    //还可以是以读取文件的形式来返回
    return '你好，这是一个测试号，目前会原样返回用户输入的信息暂不支持视频类型';
}

/*

@param{object}wxmsg 解析xml消息的对象
@param{object}retmsg 要返回的数据对象

*/
function userMsg(wxmsg,retmsg){
    //关键字自动回复
    if(wxmsg.MsgType=='text'){
        switch(wxmsg.Content){
            case '帮助':
            case 'help':

            case '?':
                retmsg.msg = help();
                retmsg.msgtype = 'text';
                return formatMsg(retmsg);
            case 'about':
                retmsg.msgtype= 'text';
                retmsg.msg = '我是这个测试号的开发者';
                return formatMsg(retmsg);
            default:
                retmsg.msgtype = 'text';
                retmsg.msg = wxmsg.Content;
                return formatMsg(retmsg);
        }
    }
        
    switch (wxmsg.MsgType){
        case 'image':
        case 'voice':
            retmsg.msgtype = wxmsg.MsgType;
            retmsg.msg = wxmsg.MediaID;
            return formatMsg(retmsg);
        default:
            return formatMsg(retmsg);
    }
}

exports.help = help;
exports.userMsg = userMsg;

//后续还会加入事件消息支持
exports.msgDispatch = function(wxmsg,retmsg){
    return userMsg(wxmsg,retmsg);
}
