// phina.js をグローバル領域に展開
phina.globalize();

var ASSETS = {
    image: {
        title: "img/title.jpg",
        bg1: "img/bg1.jpg",
        hito1: "img/hito1.png",
        enemy1: "img/enemy1.png",
        gu: "img/gu.png",
        tyo: "img/tyo.png",
        pa: "img/pa.png",
    },
};

var MESSAGE_SPEED = 4; //1<n 低いほど早い
var FONT_SIZE = 25;
var SCREEN_WIDTH = 800;              // スクリーン幅
var SCREEN_HEIGHT = 600;
var isClosed = 1;   //テキストのフラグ

// 最初のセリフ
const MAINNTEXTS = [
    "少年は激怒した。",
    "必ず、かの邪智暴虐の主人公らを\n除かなければならぬと決意した。",
    "少年には名がない。\nいつの日も皆に都合よく使われてきた。",
    "これは少年の復讐の物語である。",
    "【少年】\n人生つまんねぇ〜〜〜〜〜〜〜〜〜〜\n\nいつも皆にフリーで使われて、辛いぜぇ〜",
    "【少年】\n俺も有名になって、皆から使用料ぶんどりたいぁ〜",
    "【少年】\n・・・・・・・・・・・・\n・・・・・・・・・・！！！！",
    "【少年】\nそうだ！\n\n俺が有名な主人公どもをぶっ潰せばいい！！！",
    "アソパソマソが現れた！！！",
    "【アソパソマソ】\nぼく、アソパソマソ！\n\n元気１００倍！アソパソマソ！！",
    "アソパソマソが勝負を仕掛けてきた！！！",
    "少年はどの手を出す？？\n（上の画像を選択してね）", //11
    "君はぐーだね！",
    "君はチョキだね！",
    "君はパーだね！",
    "相手はぐーだよ！", //15
    "相手はチョキだよ！",
    "相手はパーだよ！",
    "勝ったね！\nやったね！",       //18
    "負けたね！笑",
    "あいこだよ！",
];
//


//============================================
// タイトルシーン
//============================================
phina.define('TitleScene', {
    superClass: 'CanvasScene',

    init: function (options) {
        this.superInit(options);

        // this.backgroundColor = '#444';
        this.bg = Sprite("title").addChildTo(this);
        this.bg.origin.set(0, 0);

        var label1 = Label({
            text: 'いらすとやの野望',
            fill: 'white',
            fontSize: 64,
        }).addChildTo(this);
        label1.x = this.gridX.center();
        label1.y = this.gridY.center() / 3;

        var label2 = Label({
            text: '画面をクリック',
            fill: 'white',
        }).addChildTo(this);
        label2.x = this.gridX.center();
        label2.y = this.gridY.center();
    },
    onclick: function () {
        this.exit();
    }
});

//============================================
// メインシーン
//============================================
phina.define('MainScene', {
    superClass: 'CanvasScene',
    // superClass: 'DisplayScene',
    init: function (options) {
        this.superInit(options);
        // 背景を指定
        // this.bg = Sprite("bg").addChildTo(this);
        // this.bg.origin.set(0, 0); // 左上基準に変更

        // 背景色
        this.backgroundColor = "black";

        // 背景用グループ
        this.backImageGroup = DisplayElement().addChildTo(this);
        // 敵グループ
        this.enemyImageGroup = DisplayElement().addChildTo(this);

        //主人公表示
        var sprite = Sprite('hito1').addChildTo(this).setPosition(this.gridX.center() * 6 / 4, this.gridY.center());

        // テキストエリアの矩形
        this.labelRect = LabelRect().addChildTo(this)
            .setPosition(this.gridX.center(), this.gridY.center(5.5));

        this.labelRect.texts = MAINNTEXTS;
        this.labelRect.textIndex = 0;
        this.labelRect.charIndex = 0;

        // ジャンケン
        this.guPosi = DisplayElement().addChildTo(this);
        this.tyoPosi = DisplayElement().addChildTo(this);
        this.paPosi = DisplayElement().addChildTo(this);

        this.setPhase();

        // //ラベルエリアがクリックされた場合
        // this.labelRect.onclick = function () {
        //     if (isClosed == 0) {
        //         if (this.textAll) {
        //             this.nextText();
        //         } else {
        //             this.showAllText();
        //         }
        //     }
        // }
        // this.labelRect.onpointstart = (e) => {
        //     console.log(e.pointer.getPointingStart());
        //     console.log("wa-");
        // }
    },

    //更新
    // update: function (app) {
    //     this.labelRect.addChar();
    //     if (this.labelRect.textAll) {
    //         this.setPhase();
    //     }

    //     if (this.labelRect.textAll) {
    //         this.labelRect.nextTriangle.show();
    //     } else {
    //         this.labelRect.nextTriangle.hide();
    //     }
    // },
    //更新
    update: function (app) {
        //クリックがあった場合
        this.labelRect.onpointstart = (e) => {
            if (isClosed == 1) { //タッチ有効か？基本ここで進める
                if (this.labelRect.textAll) {//テキスト全部表示済み
                    this.labelRect.nextText();
                    // 次の背景に切替
                    this.setPhase();
                } else {
                    this.labelRect.showAllText();
                }
            }
            if (isClosed == 2) {    //ジャンケンの途中はこっち
                if (this.labelRect.textAll) {
                    switch (this.labelRect.textIndex) {
                        case 12:
                            this.labelRect.textIndex = this.index.x;
                            this.labelRect.clearText();
                            this.labelRect.charIndex = 0;
                            this.labelRect.addChar();
                            break;
                        case 13:
                            this.labelRect.textIndex = this.index.x;
                            this.labelRect.clearText();
                            this.labelRect.charIndex = 0;
                            this.labelRect.addChar();
                            break;
                        case 14:
                            this.labelRect.textIndex = this.index.x;
                            this.labelRect.clearText();
                            this.labelRect.charIndex = 0;
                            this.labelRect.addChar();
                            break;
                    }

                } else {
                    this.labelRect.showAllText();
                }
                isClosed = 3;   //勝敗の途中
            }
            if (isClosed == 3) {    //勝敗の途中
                if (this.labelRect.textAll) {
                    this.labelRect.textIndex = this.index.y;
                    this.labelRect.clearText();
                    this.labelRect.charIndex = 0;
                    this.labelRect.addChar();
                    switch (this.labelRect.textIndex) {
                        case 18://勝ち
                            break;
                        case 19://負け
                            isClosed = 1;
                            this.exit();
                            break;
                        case 20:
                            this.labelRect.textIndex = 11;
                            this.labelRect.clearText();
                            this.labelRect.charIndex = 0;
                            this.labelRect.addChar();
                            isClosed = 0;
                            this.setPhase();
                            break;
                    }
                } else {
                    this.labelRect.showAllText();
                }
            }
        }

        this.labelRect.addChar();

        if (this.labelRect.textAll) {
            this.labelRect.nextTriangle.show();
        } else {
            this.labelRect.nextTriangle.hide();
        }
    },
    // 更新
    // update: function (app) {
    //     //クリックかEnterキーの入力があった場合
    //     if (app.pointer.getPointingStart() || app.keyboard.getKeyDown("enter")) {
    //         // if (this.labelRect.onpointstart) {
    //         if (this.labelRect.textAll) {//テキスト全部表示済み
    //             this.labelRect.nextText();
    //             // 次の背景に切替
    //             this.setPhase();
    //         } else {
    //             this.labelRect.showAllText();
    //         }
    //     } else {
    //         this.labelRect.addChar();
    //     }

    //     if (this.labelRect.textAll) {
    //         this.labelRect.nextTriangle.show();
    //     } else {
    //         this.labelRect.nextTriangle.hide();
    //     }
    // },

    setPhase: function () {
        let self = this;    //labelRectに参照するためにselfに逃避
        switch (this.labelRect.textIndex) {
            case 4:
                this.bg1 = this.setBackImg("bg1");
                this.bg1.alpha = 0;
                this.bg1.tweener.clear().to({ alpha: 1 }, 200).play();
                break;
            //let hito1 = Sprite("hito1").appChldTo(this).setPosition(this.gridX.center(), this.gridY.center());

            case 8:
                this.enemy1 = this.setEnemyImg("enemy1");
                this.enemy1.scaleX -= 0.65;
                this.enemy1.scaleY -= 0.65;
                this.enemy1.alpha = 0;
                this.enemy1.tweener.clear().to({ alpha: 1 }, 200).play();
                break;

            case 10:
                this.gu = this.setGu("gu");
                this.tyo = this.setTyo("tyo");
                this.pa = this.setPa("pa");

                break;
            case 11:
                isClosed = 0; //画面タッチでのテキスト送りを無効に
                //タッチイベントの登録
                this.gu.setInteractive(true); this.tyo.setInteractive(true); this.pa.setInteractive(true);
                // this.gu.onclick = function () {
                //     //ここでthis.labelRect.textsの中身を変更したいができない

                // }
                this.gu.onpointstart = (e) => {
                    this.index = this.janken(1);
                    //this.indexの中には敵の手、勝敗のインデックス
                    this.setPhaseJan(12);
                    this.gu.setInteractive(false); this.tyo.setInteractive(false); this.pa.setInteractive(false);
                }
                this.tyo.onpointstart = (e) => {
                    this.index = this.janken(2);
                    this.setPhaseJan(13);
                    this.gu.setInteractive(false); this.tyo.setInteractive(false); this.pa.setInteractive(false);
                }
                this.pa.onpointstart = (e) => {
                    this.index = this.janken(3);
                    this.setPhaseJan(14);
                    this.gu.setInteractive(false); this.tyo.setInteractive(false); this.pa.setInteractive(false);
                }
                break;
        }
    },
    setPhaseJan: function (zibun) {
        switch (zibun) {
            case 12:
                this.labelRect.textIndex = 12;
                this.labelRect.clearText();
                this.labelRect.charIndex = 0;
                this.labelRect.addChar();
                isClosed = 2;   //ジャンケン中のクリック有効化
                break;
            case 13:
                this.labelRect.textIndex = 13;
                this.labelRect.clearText();
                this.labelRect.charIndex = 0;
                this.labelRect.addChar();
                isClosed = 2;   //ジャンケン中のクリック有効化
                break;
            case 14:
                this.labelRect.textIndex = 14;
                this.labelRect.clearText();
                this.labelRect.charIndex = 0;
                this.labelRect.addChar();
                isClosed = 2;   //ジャンケン中のクリック有効化
                break;
        }
    },

    // 背景画像セット
    setBackImg: function (imgName) {
        let img = Sprite(imgName).addChildTo(this.backImageGroup)
            .setPosition(this.gridX.center(), this.gridY.center());
        return img;
    },
    // 敵用画像セット
    setEnemyImg: function (imgName) {
        let img = Sprite(imgName).addChildTo(this.enemyImageGroup)
            .setPosition(this.gridX.center() * 1 / 2, this.gridY.center());
        return img;
    },
    // ジャンケン画像セット
    setGu: function (imgName) {
        let img = Sprite(imgName).addChildTo(this.guPosi)
            .setPosition(this.gridX.center() - 30, this.gridY.center() / 4);
        img.scaleX -= 0.4;
        img.scaleY -= 0.4;
        return img;
    },
    setTyo: function (imgName) {
        let img = Sprite(imgName).addChildTo(this.guPosi)
            .setPosition(this.gridX.center() + 80, this.gridY.center() / 2 + 40);
        img.scaleX -= 0.4;
        img.scaleY -= 0.4;
        return img;
    },
    setPa: function (imgName) {
        let img = Sprite(imgName).addChildTo(this.guPosi)
            .setPosition(this.gridX.center() - 30, this.gridY.center());
        img.scaleX -= 0.4;
        img.scaleY -= 0.4;
        return img;
    },
    janken: function (x) {      //敵の手がテキストで格納されているインデックス番号と勝敗のインデックス番号を返す。
        let rand = Math.floor(Math.random() * 3 + 1);
        switch (x) {
            case 1:     //グーの場合
                //let rand = Math.floor(Math.random() * 3 + 1);
                switch (rand) {
                    case 1:
                        return { x: 15, y: 20 };
                    case 2:
                        return { x: 16, y: 18 };
                    case 3:
                        return { x: 17, y: 19 };
                }
                break;
            case 2:     //チョキの場合
                //let rand = Math.floor(Math.random() * 3 + 1);
                switch (rand) {
                    case 1:
                        return { x: 15, y: 19 };
                    case 2:
                        return { x: 16, y: 20 };
                    case 3:
                        return { x: 17, y: 18 };
                }
                break;
            case 3:     //パーの場合
                //let rand = Math.floor(Math.random() * 3 + 1);
                switch (rand) {
                    case 1:
                        return { x: 15, y: 18 };
                    case 2:
                        return { x: 16, y: 19 };
                    case 3:
                        return { x: 17, y: 20 };
                }
                break;
        }

    }


    // onclick: function () {
    //     //次のシーンへ移動
    //     this.exit();
    // }
});

//============================================
// ゲームオーバー
//============================================
phina.define('GameOverScene', {
    superClass: 'CanvasScene',

    init: function (options) {
        this.superInit(options);

        // this.backgroundColor = '#444';
        this.bg = Sprite("title").addChildTo(this);
        this.bg.origin.set(0, 0);

        var label1 = Label({
            text: 'GAME OVER',
            fill: 'white',
            fontSize: 72,
        }).addChildTo(this);
        label1.x = this.gridX.center();
        label1.y = this.gridY.center();
    },
    onclick: function () {
        this.exit();
    }
});


// メイン処理
phina.main(function () {
    // アプリケーション生成
    var app = GameApp({
        startLabel: 'title', // メインシーンから開始する
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        assets: ASSETS,
        scenes: [
            {
                className: 'TitleScene',
                label: 'title',
                nextLabel: 'main',
            },

            {
                className: 'MainScene',
                label: 'main',
                nextLabel: 'gameover',
            },
            {
                className: 'GameOverScene',
                label: 'gameover',
                nextLabel: 'title',
            },
        ],
    });
    document.body.appendChild(app.domElement);
    // app.replaceScene(MyManagerScene());
    // アプリケーション実行
    app.run();
});


/***************************************
 * テキスト表示&文字送り
 */
phina.define("LabelRect", {
    superClass: "RectangleShape",
    init: function () {
        this.superInit({
            cornerRadius: 5,
            width: 630,
            height: 280,
            stroke: "white",
            fill: "#eee"
        });
        this.alpha = 0.8;
        this.setInteractive(true);

        // テキスト表示用LabelAreaクラス
        this.labelArea = LabelArea({
            text: "",
            width: 600,
            height: 240,
            fontSize: FONT_SIZE
        }).addChildTo(this);
        this.labelArea.setInteractive(true);

        this.texts = [];
        this.textIndex = 0;
        this.charIndex = 0;

        // 次のテキスト合図の▽
        this.nextTriangle = TriangleShape({
            fill: "black",
            stroke: false,
            radius: FONT_SIZE / 2
        }).addChildTo(this)
            .setPosition(290, 60);
        this.nextTriangle.rotation = 180;
        this.nextTriangle.hide();
    },
    // 更新
    // onclick: function () {

    // },
    // update: function (app) {
    //     //クリックかEnterキーの入力があった場合
    //     //if (app.pointer.getPointingStart() || app.keyboard.getKeyDown("enter")) {
    //     if (this.onpointstart || this.labelArea.onclick) {
    //         if (this.textAll) {//テキスト全部表示済み
    //             this.nextText();
    //             // 次の背景に切替
    //             this.setPhase();
    //         } else {
    //             this.showAllText();
    //         }
    //     } else {
    //         this.addChar();
    //     }

    //     if (this.textAll) {
    //         this.nextTriangle.show();
    //     } else {
    //         this.nextTriangle.hide();
    //     }
    // },
    showAllText: function () {
        let text = this.texts[this.textIndex];
        this.labelArea.text = text;
        this.textAll = true;
        this.charIndex = text.length;
    },

    clearText: function () {
        this.labelArea.text = "";
    },

    nextText: function () {
        this.clearText();
        ++this.textIndex
        this.charIndex = 0;
        this.addChar();
    },
    addChar: function () {
        this.labelArea.text += this.getChar();
    },
    getChar: function () {
        let text = this.texts[this.textIndex];
        if (text.length <= this.charIndex) {
            this.textAll = true;
            return "";
        } else {
            this.textAll = false;
            return text[this.charIndex++];
        }
    }
});

