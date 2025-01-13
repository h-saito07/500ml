// jsonファイルを呼び出し、表示する関数
async function jexp(){
    // 見出しを配置するタグを呼び出す
    const heading = document.getElementById('heading');
    // エラーが発生しないか
    try{
        // jsonファイルを読み込み、インスタンス化する
        const response = await fetch('../json/explanation.json');
        json_explanation = await response.json();
        // jsonファイルの文字列を大見出しに配置する
        heading.innerHTML = json_explanation["0"];
    // エラーが発生した場合
    }catch(e){
        // ログにエラーを表示する
        console.error(e);
    }
}

// jexp関数を呼び出す
jexp();