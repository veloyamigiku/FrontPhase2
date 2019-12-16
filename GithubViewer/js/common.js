
export function searchRepository(name, callbackSuccess) {
    // 関数レベルのstrict modeを設定する。
    'use strict';
    
    // 通信オブジェクトを作成する。
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // 通信完了および、レスポンスコードが200(成功)の場合に、リクエスト結果を参照する。
                callbackSuccess(xhr.responseText);
            } else {
                console.log("status:" + xhr.status);
            }
        } else {
            console.log("通信中");
        }
    })
    var url = `https://api.github.com/search/repositories?q=${name} in:name&sort=stars&order=desc`;
    // 通信前の設定を実施する。
    // 第1引数は、HTTPメソッドを指定する。
    // 第2引数は、接続先URLを指定する。
    // 第3引数は、trueの場合は非同期通信、falseの場合は同期通信。
    xhr.open("GET", encodeURI(url), true);
    // 通信を開始する。
    xhr.send(null);
}
