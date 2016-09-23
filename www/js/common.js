//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//page loading

var loading = {
    
    //add loading page when calll
    startLoading:function(){
        $(".app").prepend("<div class='loadingPage'><div class='loadingFrame'><img class='loadingIcon' src='img/loading_large.gif'></img></div></div>");
    },
    
    //remove loading page when call
    endLoading:function(){
        $(".loadingPage").remove();
    }
};


//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//dbmanager
var db;

var dbmanager = {
    initdb:function(){
        db = window.openDatabase("Database", "1.0", "TED", 200000);
    },
    
    createTable:function(){
        db.transaction(createTableTransaction, this.errorExecuteSQL, this.successExecuteSQL);
        
        function createTableTransaction(t){
            t.executeSql('create table if not exists PROFILE(NAME TEXT, IC TEXT, EMAIL TEXT, PHONE TEXT, ADDRESS1 TEXT, ADDRESS2 TEXT, POST_CODE TEXT, CITY TEXT, STATE_DESC TEXT)');
            t.executeSql('create table if not exists FIRSTRUN(RUN TEXT)');
        }
    },
    
    getProfile:function(returnData){
        db.transaction(profileTransaction, this.errorExecuteSQL, this.successExecuteSQL);
        
        function profileTransaction(tx){
            tx.executeSql('SELECT * FROM PROFILE', [], function(tx, rs){
                returnData(rs);
          }, this.errorExecuteSQL);
        }
    },
    
    getNewProfile:function(returnData){
        db.transaction(newprofiletrans, this.errorExecuteSQL, this.successExecuteSQL);
        
        function nnewprofiletrans(t){
            t.executeSql('SELECT * FROM PROFILE', [], function(t, rs){returnData(rs)});
        }
    },
    
    checkFirstRun:function(returnData){
        db.transaction(function(tx){
            tx.executeSql('create table if not exists FIRSTRUN(RUN TEXT)');
            tx.executeSql('SELECT * FROM FIRSTRUN', [], function(tx, rs){
                returnData(rs);
          }, this.errorExecuteSQL);
        });
    },
    
    successExecuteSQL:function(){
        //success to executeSQL
    },
    
    errorExecuteSQL:function(err){
        //fail executeSQL
        alert("fail"+err.message);
    },
};

//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
//inbox page navigate
function goInbox(){
    window.location = "inboxPage.html";
}

function initInboxButton(){
    dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0)
            $(".inboxBtn").show();
    });
}


//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
//inbox check new message

var inboxMessage={
    
    checkNewMessageNumber:function(){
        dbmanager.getProfile(function(returnData){
        if(returnData.rows.length>0)
            var token=returnData.rows.item(0).token;
            var uid=returnData.rows.item(0).uid;
            postNewInboxMessageCount(token, uid, "1");
        });
    },
}



//-----------------------------------------------------------------
//-----------------------------------------------------------------
//-----------------------------------------------------------------
//encode textarea input into html
function encode4HTML(str) {
    return str
        .replace(/\r\n?/g,'\n')
        // normalize newlines - I'm not sure how these
        // are parsed in PC's. In Mac's they're \n's
        .replace(/(^((?!\n)\s)+|((?!\n)\s)+$)/gm,'')
        // trim each line
        .replace(/(?!\n)\s+/g,' ')
        // reduce multiple spaces to 2 (like in "a    b")
        .replace(/^\n+|\n+$/g,'')
        // trim the whole string
        .replace(/[<>&"']/g,function(a) {
        // replace these signs with encoded versions
            switch (a) {
                case '<'    : return '&lt;';
                case '>'    : return '&gt;';
                case '&'    : return '&amp;';
                case '"'    : return '&quot;';
                case '\''   : return '&apos;';
            }
        })
        //.replace(/\n{2,}/g,'</p><br><p>')
        // replace 2 or more consecutive empty lines with these
        .replace(/\n/g,'<br />')
        // replace single newline symbols with the <br /> entity
        .replace(/^(.+?)$/,'<p>$1</p>');
        // wrap all the string into <p> tags
        // if there's at least 1 non-empty character
}


//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//getDataFromUrl

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
