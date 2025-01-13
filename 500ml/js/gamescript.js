class Liquid{

    // ゲームスタートさせる関数
    gamestart(){
        let startinterval = setInterval(function(){
            // 水面の高さが0(最小値)よりも大きく、成功失敗の判定をしていない場合
            if((amountnum > 0) && (judgflog != 0) && (ansnum < 6) && (gameoverflog == 0)){
            // 水面の高さの値を減少させる
            amountnum--;}
            // 水面の高さの値が最大値が100に収まるように調整
            let amountpercent = amountnum / 5;
            // 水面の高さを変更する
            body.style.background = `linear-gradient(0deg, #000000 0%, #000000 ${amountpercent}%, #FFFFFF ${amountpercent}%, #FFFFFF 100%)`;
        },8)
        
        // UIの表示
        setTimeout(() => {rest.textContent = '○ ';rest.style.color = '#FFF'; audio_select.play();},1000)
        setTimeout(() => {rest.textContent = '○ ○ '; audio_select.currentTime = 0;},1200)
        setTimeout(() => {rest.textContent = '○ ○ ○ '; audio_select.currentTime = 0;},1500)
        setTimeout(() => {rest.textContent = '○ ○ ○ ○ '; audio_select.currentTime = 0;},1800)
        setTimeout(() => {rest.textContent = '○ ○ ○ ○ ○ '; audio_select.currentTime = 0;},2100)
        setTimeout(() => {rest.textContent = '○ ○ ○ ○ ○ ○'; audio_select.currentTime = 0;},2400)
        setTimeout(() => {
            audio_good.play();
            goal.style.paddingLeft = '0%';
            goal.style.textAlign = 'center';
            goal.textContent = '500ml';
            goal.style.mixBlendMode = 'difference';},3500)
        // スタートのカウントダウン
        for(let i = 0; i < 4; i++){
            setTimeout(() => {counttext.style.color = '#FFF';
                if(i < 3){
                    // カウントを減らす
                    counttext.textContent = numconver[3 - i];
                    // 効果音を流す
                    audio_countdown.currentTime = 0;
                    audio_countdown.play();
                }else{counttext.textContent = 'go'; audio_go.play();}},5000 + 1000 * i)
        }
        // ゲームを起動する
        setTimeout(() => {
            clearInterval(startinterval);
            this.main();
        },9250)
    }

    // 様々な処理をまとめる関数
    main(){
        start = new Date();
        // 最初の目標の表示する
        goal.textContent = linevalue[random] + 'ml';
        // 水面の高さを設定する関数を呼び出す
        this.increase();
        // カウントダウンする関数を呼び出す
        setInterval(this.countdown,10);
    }

    // ボタンを押している間、処理を継続的に行う関数
    increase(){
        // 10ﾐﾘ秒ごとに水面の高さの値(amountnum)を減少させる関数
        setInterval(function(){
            // 水面の高さが0(最小値)よりも大きく、成功失敗の判定をしていない場合
            if((amountnum > 0) && (judgflog != 0) && (ansnum < 6) && (gameoverflog == 0) && (amountnum <= 500)){
            // 水面の高さの値を減少させる
            amountnum--;}
            // 水面の高さの値が最大値が100に収まるように調整
            let amountpercent = amountnum / 5;
            // 水面の高さを変更する
            body.style.background = `linear-gradient(0deg, #000000 0%, #000000 ${amountpercent}%, #FFFFFF ${amountpercent}%, #FFFFFF 100%)`;
        },12)
        // ページのどこか(body)を押しているときに発生するイベント
        body.addEventListener('pointerdown', () => {
            // 水の音の再生をはじめからにする
            audio_water.currentTime = 0;
            // 水の音を再生する
            audio_water.play();
            // 1ﾐﾘ秒ごとに水面の高さの値(amountnum)を増加させる関数
            let intervalId = setInterval(function(){
                // 水面の高さが500(最大値)よりも小さく、成功失敗の判定をしていない場合
                if((amountnum <= 501) && (judgflog != 0)){
                // 水面の高さの値を増加させる
                amountnum++;
            }}, 1);
            // ページのどこも(body)押されていないときに発生するイベント
            document.addEventListener('pointerup', () => {

                // 継続的に水面の高さの値(amountnum)を増加させる関数(intervalId(setInterval))を停止する
                setTimeout(function(){
                    clearInterval(intervalId);
                    // 効果音を停止する
                    audio_water.currentTime = 0;
                    audio_water.pause();
                },700);
            })
        })
    }

    // カウントダウンと評価用の関数
    countdown(){
        // カウントが始まった時間から今の時間を引き、countに格納する
        let count = new Date() - start;
        // "1～5 = 5～1" "6 = 判断" "7 = 切り替え"
        for(let i = 1; i <= 7; i++){
            // iの値をミリ秒に合わせてcountと比較する
            if ((count >= (i - 1) * 1000) && (count < i * 1000)){
                if((gameoverflog == 1) && (i <= 5)){i = 6;}
                // i = 1～5 の場合に 5～1 のカウントを表示
                if((i <= 5) && (ansnum < 6) && (gameoverflog == 0) && (countdownflog[i-1] === 1)){
                    counttext.textContent = numconver[6 - i];
                    // 水が満杯になってしまったらゲームオーバーとする
                    if(amountnum > 500){gameoverflog = 1;}
                    // カウントの重複を防ぐ
                    countdownflog[i-1] = 0;
                    if(i >= 3){
                        // 効果音を流す
                        audio_countdown.currentTime = 0;
                        audio_countdown.play();}}
                // i = 6 で連続で実行しようとしていない場合
                if((i === 6) && (judgflog === 1) && (ansnum < 6) && (gameoverflog == 0)){
                    // 目標値との差を求める
                    absjudg = Math.abs(linevalue[random] - amountnum);
                    // 評価にMISSを格納する
                    evaluation = "MISS";
                    // 効果音を選択する変数に0(miss用)を格納
                    eval_audio = 0;
                    // 目標値との差が100以下なら
                    if (absjudg <= 100){
                        // okと表示
                        counttext.textContent = 'ok';
                        // 正解数に1を加算する
                        ansnum++;
                        // スコアを計算する
                        score = score + 1500 - absjudg * 15;
                        // 評価にGOODを格納する
                        evaluation = "GOOD";
                        // 効果音を選択する変数に1(good用)を格納
                        eval_audio = 1;
                        // 目標値との差によって評価と効果音を上書きしていく
                        // 評価にGREATを格納する
                        if(absjudg <= 50){score += 100; evaluation = "GREAT"; eval_audio = 2;}
                        // 評価にGREATを格納する
                        if(absjudg <= 30){score += 200;}
                        // 評価にALMOST PERFECTを格納する
                        if(absjudg <= 10){score += 300; evaluation = "ALMOST PERFECT"; eval_audio = 3;}
                        // 評価にPERFECTを格納する
                        if(absjudg == 0){score += 500; evaluation = "PERFECT";}
                        // 正解数を表示する
                        if(ansnum <= 6){rest.textContent = '● '.repeat(ansnum) + '○ '.repeat(6-ansnum);}
                    // そうでない場合
                    }else{
                        // noと表示
                        counttext.textContent = 'no';
                        // 失敗した場合はゲームオーバー
                        gameoverflog = 1;
                    }
                    // 目標値とされていた値を省いて目標の配列を作成
                    linevalue = linevalue.filter((value) => value !== linevalue[random]);
                    // 目標値の配列に値がなくなった場合にリセットする
                    if(linevalue.length === 0){linevalue = [50, 100, 150, 200, 250, 300, 350, 400, 450];}
                    // 評価を表示する
                    goal.textContent = evaluation;
                    // 評価によって違う効果音を流す
                    if(eval_audio == 0){audio_miss.play();}
                    if(eval_audio == 1){audio_good.play();}
                    if(eval_audio == 2){audio_great.play();}
                    if(eval_audio == 3){audio_perfect.play();}
                    // 連続で実行しないための変数
                    judgflog = 0;
                    // カウントダウンを重複させないための関数をリセット
                    countdownflog = [1, 1, 1, 1, 1];
                }
                if (i === 7){
                    // カウントダウンの始まった時間をリセット
                    start = new Date();
                    // 連続で実行しないための関数
                    judgflog = 1;
                    // クリアもしくはゲームオーバーでゲームが終了した場合
                    if(ansnum >= 6 || gameoverflog == 1){
                        // ゲーム用の表記を背景色に対して反転させる
                        gameelement.style.mixBlendMode = 'difference';
                        gameelement.style.color = '#FFF';
                        // ゲーム表示をフェードアウトさせる
                        gameelement.style.opacity = 0;
                        setInterval(function(){
                            // 水面の高さが500(最大値)よりも小さく、成功失敗の判定をしていない場合
                            if(amountnum < 700){
                                // 水面の高さの値を増加させる
                                amountnum++;
                                // ゲームオーバーした場合
                                if((gameoverflog == 1) && (amountnum >= 700)){
                                    // ゲームオーバー表示
                                    scorenum.style.color = '#FFF';
                                    scoretext.textContent = '　';
                                    scorenum.textContent = 'GAMEOVER';
                                    // 効果音を流す
                                    audio_gameover.play();
                                // クリアした場合
                                }else if((ansnum >= 6) && (amountnum >= 700)){
                                    // スコア表示
                                    scoretext.style.color = '#FFF';
                                    scorenum.style.color = '#FFF';
                                    scoretext.textContent = 'score';
                                    scorenum.textContent = score;
                                    // スコアによって流す効果音を変える
                                    if(score >= 10000){audio_perfect.play();
                                    }else if(score >= 8000){audio_great.play();
                                    }else if(score >= 6000){audio_good.play();
                                    }else{audio_select.play();}
                                }
                            }
                        // 水面の高さによって水位を上げる速さを変える
                        }, 0.05 * amountnum);
                    }else{
                        // 次の目標値をランダムで決める
                        random = Math.floor(Math.random() * linevalue.length);
                        // 次の目標値を表示
                        goal.textContent = linevalue[random] + 'ml';
                    }

                }
            }
        }
    }
}

// 初期値の設定
const body = document.getElementById('body');
// カウントダウンを表示するタグを呼び出し
const counttext = document.getElementById('countdown');
// 目標値を表示するタグを呼び出し
const goal = document.getElementById('goal');
// 残りの数を表示するタグを呼び出し
const rest = document.getElementById('rest');
// ゲーム表示に関するタグを呼び出し
const gameelement = document.getElementById('gameelement');
// scoreという文字列と表示するタグを呼び出し
const scoretext = document.getElementById('scoretext');
// スコアを表示するタグを呼び出し
const scorenum = document.getElementById('scorenum');
// 水面の高さの変数
let amountnum = 500;
// 目標値との差を求める変数
let absjudg = 0;
// 正解数を持つ変数
let ansnum = 0;
// スコアを格納する変数
let score = 0;
// 連続での処理を防ぐ変数
let judgflog = 1;
// ゲームを重複してスタートさせないための変数
let startflog = 1;
// ゲームオーバーの変数
let gameoverflog = 0;
// 評価の効果音の種類を決める変数
let eval_audio = null;
// カウントダウンを重複させないための変数
let countdownflog = [1, 1, 1, 1, 1];
// 目標の値の入った配列
let linevalue = [50, 100, 150, 200, 250, 300, 350, 400, 450];
// 半角数字を全角に変換するための辞書
const numconver = {1:'１', 2:'２', 3:'３', 4:'４', 5:'５'};
// カウントダウンの始まった時間をstartに格納
let start = null;
// 評価を格納する変数
let evaluation = null;
// 最初の目標をランダムで決める
let random = Math.floor(Math.random() * 9);
// 効果音の変数
// 注ぐ音
const audio_water = new Audio('../assets/water.mp3');
// 主にカウントダウン用
const audio_countdown = new Audio('../assets/countdown.mp3');
// 主にmiss用
const audio_miss = new Audio('../assets/miss.mp3');
// 主にgood用
const audio_good = new Audio('../assets/good.mp3');
// 主にgerat用
const audio_great = new Audio('../assets/great.mp3');
// 主にperfect用
const audio_perfect = new Audio('../assets/perfect.mp3');
// 主に選択用
const audio_select = new Audio('../assets/select.mp3');
// 主にスタート用
const audio_go = new Audio('../assets/go.mp3');
// ゲームオーバー用
const audio_gameover = new Audio('../assets/gameover.mp3');
// 背景色を真っ黒にする
body.style.background = `linear-gradient(0deg, #000000 0%, #000000 100%, #FFFFFF 100%, #FFFFFF 100%)`;

// クラスのインスタンス化
const liquid = new Liquid();

// クリックしたら実行される
body.addEventListener('click', function() {
    // liquidクラスのgamestart関数を実行
    if(startflog == 1){liquid.gamestart(); startflog = 0;}
})