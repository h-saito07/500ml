class Start{

    // ボタンを押している間、処理を継続的に行う関数
    increase(){
        // ページのどこか(body)を押しているときに発生するイベント
        body.addEventListener('pointerdown', () => {
            // 液体が満杯ではない場合
            if(amountnum < 500){
                // 効果音を流す
                audio_water.currentTime = 0;
                audio_water.play();}
            // 1ﾐﾘ秒ごとに水面の高さの値(amountnum)を増加させる関数
            let intervalId = setInterval(() => {
                // 水面の高さが500(最大値)よりも小さく、成功失敗の判定をしていない場合
                if((amountnum < 500)){
                    // 水面の高さの値を増加させる
                    amountnum++;
                    count.textContent = amountnum + 'ml';}
                // 水面の高さの値が最大値が100に収まるように調整
                let amountpercent = amountnum / 5;
                // 水面の高さを変更する
                body.style.background = `linear-gradient(0deg, #000000 0%, #000000 ${amountpercent}%, #FFFFFF ${amountpercent}%, #FFFFFF 100%)`;
                if(amountnum >= 500){this.appear();}
            }, 15);
            // ページのどこも(body)押されていないときに発生するイベント
            document.addEventListener('pointerup', () => {
                // 継続的に水面の高さの値(amountnum)を増加させる関数(intervalId(setInterval))を停止する
                setTimeout(function(){
                    clearInterval(intervalId);
                    // 効果音を流す
                    audio_water.currentTime = 0;
                    audio_water.pause();                    
                },700);
            })
        })
    }

    appear(){
        // 少し待ち
        setTimeout(() => {
            // 選択項目の表示
            gamestart.textContent = 'ゲームスタート';
            explanation.textContent = 'ゲームの説明';
            // 選択項目の上にポインタが乗った場合
            gamestart_big.addEventListener('mouseover', function(){
                // 効果音を流す
                audio_select.currentTime = 0;
                audio_select.play();
            })
            explanation_big.addEventListener('mouseover', function(){
                // 効果音を流す
                audio_select.currentTime = 0;
                audio_select.play();
            })
        },1100)
    }
}

// 初期値の設定
// bodyの変数
const body = document.getElementById('body');
// 水面の値をカウントする変数
const count = document.getElementById('count');
// 選択項目の変数
const gamestart = document.getElementById('gamestart');
const explanation = document.getElementById('explanation');
// 選択項目に処理を追加するための変数
const gamestart_big = document.getElementById('gamestart_big');
const explanation_big = document.getElementById('explanation_big');
// 水面の高さの変数
let amountnum = 0;
// 効果音の変数
// 注ぐ音
const audio_water = new Audio('./assets/water.mp3');
// 主に選択用
const audio_select = new Audio('./assets/select.mp3');


// クラスのインスタンス化
const start = new Start();
// startクラスのincrease関数を実行
start.increase(); 