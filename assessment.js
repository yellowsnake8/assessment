'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
// 引数が 1 つしかない場合は、引数のまわりのカッコを省略できる。つまり、
// 引数 => 返り値
// と書ける。
// userNameInput.onkeydown = (e) => { //引数の名前はなんでも良い
//     if (e.key === 'Enter') { //onkeydownで取得した要素が引数eに渡され、e.keyでeに入っているキーはが何かを取得できる
//         assessmentButton.onclick(); // それがEnterキーならば、診断するボタンのonclick() 処理を呼び出す
//     }
// }

userNameInput.onkeydown = event => { //eventという引数を渡すとonkeydownで何が押されたか取得できる
    // console.log(event);eventで何が行われたかを表示できる
    if (event.key === 'Enter') { //event.keyで押されたkeyの名前が取得できる。Enterキーが押されたら
        assessmentButton.onclick(); // 診断するボタンのonclick() 処理を呼び出す
    }
}
assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        // 名前が空の時は処理を終了する
        return;
    }

    // TODO 診断結果表示エリアの作成
    resultDivided.innerText = '';
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName); //const userName = userNameInput.value; から取得した名前を関数assessmentに渡して戻り値を受け取る
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // TODO ツイートエリアの作成
    tweetDivided.innerText = '';
    const anchor = document.createElement('a')
    const hrefValue =
        'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('あなたのいいところ') +
        '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    // widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    //userName.length = '山田太郎' = 4 
    //'山田太郎'.charCodeAt(0); = 23665
    //'山田太郎'.charCodeAt(1); = 30000
    //'山田太郎'.charCodeAt(2); = 22826
    //'山田太郎'.charCodeAt(3); = 37070 ここまで 4回ループする
    //'山田太郎'.charCodeAt(4); = NaN
    //sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    //i = 0 の時 0 = 0 + 23665
    //i = 1 の時 23665 = 23665 + 30000
    //i = 2 の時 53665 = 53665 + 22826
    //i = 3 の時 76491 = 76491 + 37070
    //i = 4 終了 sumOfCharCode = 113561

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replaceAll('{userName}', userName);
    return result;
}

// テストコード
console.assert(
    assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。' //NGワードの設定に使える?
);
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません'
);