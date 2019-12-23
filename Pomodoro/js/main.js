var timerStart = null;
var timerStop = null;
var timerClear = null;
var timerSetup = null;
var timerSetupDone = null;
var timerMm = null;
var timerSs = null;
var timerMmInput = null;
var timerSsInput = null;
var timerId = null;
var timerLastSec = null;

function fromMmssStrToSec(mmStr, ssStr) {
    return parseInt(mmStr) * 60 + parseInt(ssStr);
}

function timer(sec, timerMm, timerSs) {
    var new_sec = sec - 1;
    console.log(new_sec);
    var mm = parseInt(new_sec / 60);
    var ss = new_sec - (mm * 60);
    timerMm.textContent = mm < 10 ? "0" + mm : mm;
    timerSs.textContent = ss < 10 ? "0" + ss : ss;
    return new_sec;
}

function timeup(
    timerMm,
    timerMmInput,
    timerSs,
    timerSsInput,
    timerStart,
    timerStop,
    timerClear,
    timerSetup) {
     // 残り時間の画面表示をクリアする。
     timerMm.textContent = timerMmInput.value;
     timerSs.textContent = timerSsInput.value;
     timerStart.style.display = "block";
     timerStop.style.display = "none";
     timerClear.style.display = "block";
     timerSetup.style.display = "block";
     // タイマーの残り時間をクリアする。
     return fromMmssStrToSec(timerMmInput.value, timerSsInput.value);
}

function notification(message) {
    if ("Notification" in window) {
        var permission = Notification.permission;
        if (permission == "denied") {
            return;
        }
        Notification
            .requestPermission()
            .then(function() {
                var notification = new Notification(message);
            })
    }
}

// 画面表示後のイベント処理を定義する。
window.addEventListener("load", function() {

    /* タイマー開始ボタンのイベント処理を定義する。 */
    timerStart = document.getElementsByClassName("timer-button__start")[0];
    timerStart.addEventListener("click", function() {
        timerStart.style.display = "none";
        timerStop.style.display = "block";
        timerClear.style.display = "none";
        timerSetup.style.display = "none";

        // タイマーを開始する。
        timerId = setInterval(
            function(){
                // 残り時間の変数と、画面表示を更新する。
                timerLastSec = timer(
                    timerLastSec,
                    timerMm,
                    timerSs);
                if (timerLastSec == 0) {
                    // 通知を表示する。
                    notification("time up");
                    // 残り時間がなくなったらタイマーを停止する。
                    clearInterval(timerId);
                    timerLastSec = timeup(
                        timerMm,
                        timerMmInput,
                        timerSs,
                        timerSsInput,
                        timerStart,
                        timerStop,
                        timerClear,
                        timerSetup);
                }
            },
            1000);

    });

    /* タイマー停止ボタンのイベント処理を定義する。 */
    timerStop = document.getElementsByClassName("timer-button__stop")[0];
    timerStop.addEventListener("click", function() {
        timerStart.style.display = "block";
        timerStop.style.display = "none";
        timerClear.style.display = "block";
        timerSetup.style.display = "block";

        // タイマーを停止する。
        clearInterval(timerId);
    });

    /* タイマークリアボタンのイベント処理を定義する。 */
    timerClear = document.getElementsByClassName("timer-button__clear")[0];
    timerMm = document.getElementsByClassName("timer-display__mm")[0];
    timerSs = document.getElementsByClassName("timer-display__ss")[0];
    timerMmInput = document.getElementsByClassName("timer-setting__mm-input")[0];
    timerSsInput = document.getElementsByClassName("timer-setting__ss-input")[0];
    timerClear.addEventListener("click", function() {
        timerMm.textContent = timerMmInput.value;
        timerSs.textContent = timerSsInput.value;
        // タイマーの残り時間をクリアする。
        timerLastSec = fromMmssStrToSec(timerMmInput.value, timerSsInput.value);
    });

    /* タイマー設定ボタンのイベント処理を定義する。 */
    timerSetup = document.getElementsByClassName("timer-button__setup")[0];
    timerSetup.addEventListener("click", function() {
        
        timerStart.style.display = "none";
        timerClear.style.display = "none";
        timerSetup.style.display = "none";
        var timerSettingRows = document.getElementsByClassName("timer-setting__row");
        for (var i = 0; i < timerSettingRows.length; i++) {
            timerSettingRows[i].style.display = "block";
        }

    });

    /* タイマー設定完了ボタンのイベント処理を定義する。 */
    timerSetupDone = document.getElementsByClassName("timer-setting__setup-done")[0];
    timerSetupDone.addEventListener("click", function() {
        
        timerStart.style.display = "block";
        timerClear.style.display = "block";
        timerSetup.style.display = "block";
        var timerSettingRows = document.getElementsByClassName("timer-setting__row");
        for (var i = 0; i < timerSettingRows.length; i++) {
            timerSettingRows[i].style.display = "none";
        }

        // タイマーの残り時間を設定する。
        timerLastSec = fromMmssStrToSec(timerMmInput.value, timerSsInput.value);
        timerMm.textContent = timerMmInput.value;
        timerSs.textContent = timerSsInput.value;

    });

    // タイマーの残り時間を初期設定する。
    timerLastSec = fromMmssStrToSec(timerMmInput.value, timerSsInput.value);

});
